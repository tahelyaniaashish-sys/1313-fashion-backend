import { OrderDetails } from '../types';

// NOTE: Store config and order persistence now live in Firestore.
// See src/utils/firestoreStore.ts for getStoreConfig/saveStoreConfig/
// saveNewOrder/updateOrderStatus — those are backend-protected and require
// admin authentication to read, unlike the localStorage versions this file
// used to contain.

// Generate UPI deep link (for Mobile One-Click Launch)
export function getUpiDeepLink(upiId: string, merchantName: string, amount: number, orderId: string): string {
  const cleanId = upiId.trim();
  const cleanName = encodeURIComponent(merchantName.trim() || '1313 FASHION');
  const cleanOrderId = encodeURIComponent(orderId);
  return `upi://pay?pa=${cleanId}&pn=${cleanName}&am=${amount.toFixed(2)}&cu=INR&tn=${cleanOrderId}`;
}

// Generate Dynamic QR Code image URL
export function getUpiQrCodeUrl(upiId: string, merchantName: string, amount: number, orderId: string): string {
  const upiUrl = getUpiDeepLink(upiId, merchantName, amount, orderId);
  return `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(upiUrl)}&margin=10`;
}

// Generate WhatsApp order confirmation & payment proof message
export function createWhatsAppOrderMessage(order: OrderDetails): string {
  const itemsList = order.items
    .map(
      (item) =>
        `• *${item.product.title}* (${item.selectedSize} / ${item.selectedColor.name})${
          item.placementOption ? ` [${item.placementOption}]` : ''
        } x ${item.quantity} = ₹${item.product.price * item.quantity}`
    )
    .join('\n');

  return `🛍️ *NEW ORDER CONFIRMATION - 1313 FASHION*

🆔 *Order ID:* #${order.orderNumber}
📅 *Date:* ${order.date}
👤 *Customer:* ${order.customerName}
📞 *Phone:* +91 ${order.phone}
📧 *Email:* ${order.email}
📍 *Shipping Address:*
${order.address}
${order.city}, ${order.state} - ${order.postalCode}
India

📦 *Ordered Items:*
${itemsList}

💰 *Subtotal:* ₹${order.subtotal}
🚚 *Shipping:* ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
💳 *Total Amount:* ₹${order.total}
⚡ *Payment Method:* ${order.paymentMethod}
🛡️ *Payment Status:* ${order.paymentStatus}
${order.utrNumber ? `🔢 *UPI Ref / UTR No:* ${order.utrNumber}\n` : ''}${
    order.transactionId ? `🧾 *Txn ID:* ${order.transactionId}\n` : ''
  }
Please confirm my order and share the express courier tracking link! ✨`;
}

// Generate WhatsApp URL with order details
export function getWhatsAppOrderUrl(whatsappNumber: string, order: OrderDetails): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = createWhatsAppOrderMessage(order);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generate the "I WANT TO BUY THIS" lead message used by the WhatsApp
// checkout option — sent BEFORE any payment happens, so the store owner
// takes over the order manually from here.
export function createWhatsAppLeadMessage(order: OrderDetails): string {
  const itemsList = order.items
    .map(
      (item) =>
        `• *${item.product.title}* (${item.selectedSize} / ${item.selectedColor.name})${
          item.placementOption ? ` [${item.placementOption}]` : ''
        } x ${item.quantity} = ₹${item.product.price * item.quantity}`
    )
    .join('\n');

  return `Hi 1313 Fashion! 👋 I WANT TO BUY THIS 🛍️

🆔 *Ref ID:* #${order.orderNumber}
📦 *Item(s):*
${itemsList}

💰 *Total:* ₹${order.total} (shipping: ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`})

👤 *Name:* ${order.customerName}
📞 *Phone:* +91 ${order.phone}
📍 *Address:* ${order.address}, ${order.city}, ${order.state} - ${order.postalCode}

Please help me complete this order — waiting to hear back!`;
}

export function getWhatsAppLeadOrderUrl(whatsappNumber: string, order: OrderDetails): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = createWhatsAppLeadMessage(order);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generate WhatsApp inquiry URL (General / Product query / Custom Bulk Order)
export function getWhatsAppInquiryUrl(
  whatsappNumber: string,
  topic: string,
  productTitle?: string
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  let message = `Hi 1313 Fashion! 👋 I am visiting your store and would like some information.`;

  if (topic === 'product' && productTitle) {
    message = `Hi 1313 Fashion! 👋 I am looking at *${productTitle}* on your website and have a question regarding sizing/availability.`;
  } else if (topic === 'custom') {
    message = `Hi 1313 Fashion! 👋 I am interested in *Custom & Bulk Apparel Printing* for my company / college / squad. Could you please share catalog details and a quote?`;
  } else if (topic === 'order_status') {
    message = `Hi 1313 Fashion! 👋 I would like to check the status of my order.`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// Generate Instagram DM Link
export function getInstagramDmUrl(instagramHandleOrUrl: string): string {
  if (instagramHandleOrUrl.startsWith('http://') || instagramHandleOrUrl.startsWith('https://')) {
    return instagramHandleOrUrl;
  }
  const cleanHandle = instagramHandleOrUrl.replace('@', '').trim();
  return `https://www.instagram.com/${cleanHandle}`;
}

// Play notification sound using Web Audio API
export function playOrderNotificationSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;
    
    // First chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Second chime (higher harmonic)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.15); // A5
    gain2.gain.setValueAtTime(0.35, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.6);
  } catch {
    // AudioContext blocked by browser policy
  }
}
