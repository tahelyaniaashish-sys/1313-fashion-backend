// Netlify Function: verify-razorpay-payment
// Called after Razorpay Checkout reports success on the frontend.
// CRITICAL: never trust a "payment succeeded" message from the browser
// alone (that was the old bug). This recomputes Razorpay's signature
// server-side with the secret key — only if it matches do we mark the
// order PAID.

const crypto = require('crypto');
const admin = require('firebase-admin');
const { sendOrderNotificationEmail } = require('./utils/sendEmail.cjs');
const { CORS_HEADERS, handlePreflight } = require('./utils/cors.cjs');

function getFirebaseAdmin() {
  if (admin.apps.length) return admin;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 is not set');
  const serviceAccount = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  return admin;
}

// Firestore rejects any field whose value is `undefined`. Optional product
// fields (placementOption, colorway images, etc.) are sometimes undefined
// rather than omitted, so sanitize before every write.
function sanitizeForFirestore(value) {
  return JSON.parse(JSON.stringify(value));
}

exports.handler = async (event) => {
  const preflight = handlePreflight(event);
  if (preflight) return preflight;

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order, // full OrderDetails object built by the frontend, paymentStatus still PENDING
    } = JSON.parse(event.body || '{}');

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order?.orderNumber) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    // Recompute the expected signature ourselves — this is the actual security check.
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.warn('Signature mismatch for order', order.orderNumber);
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ verified: false, error: 'Signature mismatch' }) };
    }

    // Signature is valid — genuinely paid. Update Firestore with admin
    // privileges (bypasses the "auth required to update" rule, which is
    // fine here because we — the server — already verified the payment).
    const fbAdmin = getFirebaseAdmin();
    const db = fbAdmin.firestore();
    const orderRef = db.collection('orders').doc(order.orderNumber);
    await orderRef.set(
      sanitizeForFirestore({
        ...order,
        paymentStatus: 'PAID',
        transactionId: razorpay_payment_id,
      }),
      { merge: true }
    );

    await sendOrderNotificationEmail({ ...order, paymentStatus: 'PAID', transactionId: razorpay_payment_id });

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified: true, transactionId: razorpay_payment_id }),
    };
  } catch (err) {
    console.error('verify-razorpay-payment error:', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Verification failed' }) };
  }
};
