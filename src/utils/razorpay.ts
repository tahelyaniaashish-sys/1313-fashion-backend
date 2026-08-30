import { OrderDetails } from '../types';

// Backend functions live on Netlify (see /netlify/functions).
// Falls back to a relative path only if VITE_API_BASE_URL isn't set.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://1313fashion.netlify.app/.netlify/functions';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

interface VerifyResponse {
  verified: boolean;
  transactionId?: string;
  error?: string;
}

async function createRazorpayOrder(amount: number, orderNumber: string): Promise<RazorpayOrderResponse> {
  const res = await fetch(`${API_BASE}/create-razorpay-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, orderNumber }),
  });
  if (!res.ok) {
    throw new Error('Could not start payment. Please try again.');
  }
  return res.json();
}

async function verifyRazorpayPayment(
  razorpayResponse: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string },
  order: OrderDetails
): Promise<VerifyResponse> {
  const res = await fetch(`${API_BASE}/verify-razorpay-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...razorpayResponse, order }),
  });
  return res.json();
}

export async function notifyCodOrder(order: OrderDetails): Promise<void> {
  try {
    await fetch(`${API_BASE}/notify-cod-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order }),
    });
  } catch {
    // Non-critical — order is already saved either way.
  }
}

/**
 * Opens Razorpay Checkout for the given (still-PENDING) order, and resolves
 * once the server has verified the payment signature. Rejects on failure
 * or if the customer closes/cancels the checkout modal.
 */
export function payWithRazorpay(
  order: OrderDetails,
  customer: { name: string; email: string; phone: string },
  merchantName: string
): Promise<VerifyResponse> {
  return new Promise(async (resolve, reject) => {
    if (typeof window.Razorpay === 'undefined') {
      reject(new Error('Payment gateway failed to load. Please refresh and try again.'));
      return;
    }

    let razorpayOrder: RazorpayOrderResponse;
    try {
      razorpayOrder = await createRazorpayOrder(order.total, order.orderNumber);
    } catch (err) {
      reject(err);
      return;
    }

    const rzp = new window.Razorpay({
      key: razorpayOrder.keyId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.razorpayOrderId,
      name: merchantName,
      description: `Order #${order.orderNumber}`,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: '#f59e0b' },
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        try {
          const verification = await verifyRazorpayPayment(response, order);
          if (verification.verified) {
            resolve(verification);
          } else {
            reject(new Error('Payment could not be verified. If money was deducted, contact support with your order ID.'));
          }
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment was cancelled.'));
        },
      },
    });

    rzp.on('payment.failed', (resp: any) => {
      reject(new Error(resp?.error?.description || 'Payment failed. Please try again.'));
    });

    rzp.open();
  });
}
