// Netlify Function: notify-cod-order
// For Cash-on-Delivery orders there's no payment to verify — the order was
// already written to Firestore by the browser (allowed under the public
// "create" rule). This just sends you the notification email.

const { sendOrderNotificationEmail } = require('./utils/sendEmail.cjs');
const { CORS_HEADERS, handlePreflight } = require('./utils/cors.cjs');

exports.handler = async (event) => {
  const preflight = handlePreflight(event);
  if (preflight) return preflight;

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { order } = JSON.parse(event.body || '{}');
    if (!order?.orderNumber) {
      return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Missing order' }) };
    }

    await sendOrderNotificationEmail(order);

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ notified: true }) };
  } catch (err) {
    console.error('notify-cod-order error:', err);
    // Don't fail the checkout over a notification hiccup — the order is
    // already safely saved in Firestore either way.
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ notified: false }) };
  }
};
