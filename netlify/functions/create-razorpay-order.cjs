// Netlify Function: create-razorpay-order
// Called from the frontend right before opening Razorpay Checkout.
// Creates an order on Razorpay's servers using the secret key (never exposed
// to the browser) so the amount charged is authoritative and can't be
// tampered with by editing frontend JS.

const Razorpay = require('razorpay');
const { CORS_HEADERS, handlePreflight } = require('./utils/cors.cjs');

exports.handler = async (event) => {
  const preflight = handlePreflight(event);
  if (preflight) return preflight;

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { amount, orderNumber } = JSON.parse(event.body || '{}');

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid amount' }) };
    }
    if (!orderNumber || typeof orderNumber !== 'string') {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid orderNumber' }) };
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Razorpay expects the amount in the smallest currency unit (paise for INR).
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: orderNumber,
      notes: { orderNumber },
    });

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID, // public key, safe to send to client
      }),
    };
  } catch (err) {
    console.error('create-razorpay-order error:', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Could not create payment order' }) };
  }
};
