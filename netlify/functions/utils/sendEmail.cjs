// Shared helper — not a Netlify function itself (lives in a subfolder so it
// isn't auto-registered as an endpoint).

async function sendOrderNotificationEmail(order) {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API;
  const toEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@resend.dev';

  if (!apiKey || !toEmail) {
    console.error('Resend not configured — skipping notification email');
    return;
  }

  const itemsHtml = (order.items || [])
    .map(
      (item) =>
        `<li>${item.title || item.product?.title || 'Item'} x ${item.quantity} — Rs. ${item.lineTotal ?? ''}</li>`
    )
    .join('');

  const html = `
    <h2>New order: #${order.orderNumber}</h2>
    <p><strong>Payment:</strong> ${order.paymentMethod} — ${order.paymentStatus}</p>
    <p><strong>Total:</strong> Rs. ${order.total}</p>
    <h3>Customer</h3>
    <p>
      ${order.customerName}<br/>
      ${order.phone} · ${order.email || ''}<br/>
      ${order.address}, ${order.city}, ${order.state} - ${order.postalCode}
    </p>
    <h3>Items</h3>
    <ul>${itemsHtml}</ul>
    <p style="color:#888;font-size:12px;">Open your admin panel (#admin-1313) to manage this order.</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `New order #${order.orderNumber} — Rs. ${order.total} (${order.paymentStatus})`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Resend send failed:', res.status, text);
  }
}

module.exports = { sendOrderNotificationEmail };
