import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Truck, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Banknote,
  MessageCircle,
  Instagram,
  ExternalLink,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  Wallet,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderDetails, StoreConfig } from '../types';
import { BRAND_CONFIG, officialLogoImg } from '../data/products';
import { useTheme } from '../context/ThemeContext';
import { 
  getWhatsAppOrderUrl, 
  getWhatsAppLeadOrderUrl,
  getInstagramDmUrl, 
  playOrderNotificationSound 
} from '../utils/paymentAndContact';
import { saveNewOrder } from '../utils/firestoreStore';
import { payWithRazorpay, notifyCodOrder } from '../utils/razorpay';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
  config: StoreConfig;
  onOrderCompleted: (order: OrderDetails) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh', 'Jammu & Kashmir', 'Ladakh'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart,
  config,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const { isLight } = useTheme();

  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment' | 'processing' | 'confirmation'>('address');
  
  // Customer Address & Contact State
  const [formData, setFormData] = useState({
    name: 'Aashish Tahelyani',
    phone: '9876543210',
    email: 'aashish@1313fashion.com',
    address: '1313 Unseen Grace Boulevard, Flat 402',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod' | 'whatsapp'>('online');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Dynamic Pending Order ID for UPI payment reference
  const [pendingOrderId] = useState(() => `1313-ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [orderSummary, setOrderSummary] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  // Free delivery across India for orders above ₹500
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 70;
  const total = subtotal + shipping;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
      alert('Please fill in all mandatory shipping address details.');
      return;
    }
    setCheckoutStep('payment');
  };

  const buildOrder = (paymentStatus: 'PENDING' | 'PAID', paymentMethodLabel: string): OrderDetails => ({
    orderNumber: pendingOrderId,
    items: [...items],
    subtotal,
    shipping,
    total,
    customerName: formData.name,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    postalCode: formData.postalCode,
    country: formData.country,
    paymentMethod: paymentMethodLabel,
    paymentStatus,
    orderStatus: 'NEW',
    timestamp: Date.now(),
    date: new Date().toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  });

  const finishOrder = (finalOrder: OrderDetails) => {
    setOrderSummary(finalOrder);
    setCheckoutStep('confirmation');
    onClearCart();
    onOrderCompleted(finalOrder);
    playOrderNotificationSound();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#b45309', '#171717', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  const handleExecutePayment = async () => {
    setPaymentError(null);

    if (paymentMethod === 'cod') {
      setCheckoutStep('processing');
      const order = buildOrder('PENDING', 'CASH ON DELIVERY (COD)');
      try {
        await saveNewOrder(order);
        notifyCodOrder(order); // fire-and-forget, doesn't block checkout
        finishOrder(order);
      } catch (err) {
        console.error('Failed to save COD order:', err);
        setPaymentError('Could not place your order — please check your connection and try again.');
        setCheckoutStep('payment');
      }
      return;
    }

    if (paymentMethod === 'whatsapp') {
      setCheckoutStep('processing');
      const order = buildOrder('PENDING', 'WHATSAPP ORDER');
      try {
        await saveNewOrder(order);
        notifyCodOrder(order); // fire-and-forget email backup, same generic notifier
      } catch (err) {
        console.error('Failed to save WhatsApp lead order:', err);
        // Don't block the WhatsApp handoff over a logging failure — the
        // conversation itself is the real record for this payment method.
      }
      const waUrl = getWhatsAppLeadOrderUrl(config.whatsappNumber, order);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      finishOrder(order);
      return;
    }

    // Online payment via Razorpay (covers UPI — GPay/PhonePe/Paytm/BHIM —
    // plus cards and netbanking, all inside Razorpay's own secure widget).
    setCheckoutStep('processing');
    const order = buildOrder('PENDING', 'ONLINE (RAZORPAY)');
    try {
      // Save the order as PENDING first so it exists even if the customer
      // closes the payment window without completing it.
      await saveNewOrder(order);

      const verification = await payWithRazorpay(
        order,
        { name: formData.name, email: formData.email, phone: formData.phone },
        config.upiMerchantName || BRAND_CONFIG.name
      );

      finishOrder({
        ...order,
        paymentStatus: 'PAID',
        transactionId: verification.transactionId,
      });
    } catch (err) {
      console.error('Payment failed:', err);
      setPaymentError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setCheckoutStep('payment');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md overflow-y-auto ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/90'
    }`}>
      
      <div className={`relative w-full max-w-2xl my-6 border rounded-3xl p-5 sm:p-8 shadow-2xl transition-colors duration-300 ${
        isLight 
          ? 'bg-white border-stone-300 text-stone-900 shadow-stone-700/20' 
          : 'bg-neutral-900 border-amber-500/40 text-neutral-100'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border cursor-pointer transition-colors ${
            isLight 
              ? 'bg-stone-100 text-stone-500 hover:text-stone-900 border-stone-300 hover:border-amber-600' 
              : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800 hover:border-amber-400'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Progress Stepper */}
        {checkoutStep !== 'confirmation' && checkoutStep !== 'processing' && (
          <div className={`mb-6 border-b pb-4 ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src={officialLogoImg} 
                  alt="1313 Logo" 
                  className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-stone-300 shadow-sm"
                />
                <span className={`font-serif tracking-widest text-sm font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                  1313 FASHION CHECKOUT
                </span>
              </div>
              <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                isLight ? 'bg-amber-100 border border-amber-300 text-amber-900' : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                256-BIT SSL SECURE
              </span>
            </div>

            {/* Steps Indicator */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                checkoutStep === 'address' 
                  ? (isLight ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-bold' : 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold')
                  : (isLight ? 'bg-[#FAF8F5] border-stone-200 text-stone-500' : 'bg-neutral-950 border-neutral-800 text-neutral-400')
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border font-bold ${
                  isLight ? 'bg-amber-500 text-stone-950 border-amber-600' : 'bg-neutral-900 border-amber-500/40 text-amber-300'
                }`}>1</span>
                <span>SHIPPING ADDRESS</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                checkoutStep === 'payment' 
                  ? (isLight ? 'bg-amber-100/70 border-amber-400 text-amber-950 font-bold' : 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold')
                  : (isLight ? 'bg-[#FAF8F5] border-stone-200 text-stone-500' : 'bg-neutral-950 border-neutral-800 text-neutral-400')
              }`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border font-bold ${
                  isLight ? 'bg-amber-500 text-stone-950 border-amber-600' : 'bg-neutral-900 border-amber-500/40 text-amber-300'
                }`}>2</span>
                <span>ONLINE PAYMENT</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: SHIPPING ADDRESS & CONTACT */}
        {checkoutStep === 'address' && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-extrabold">
                Delivery Address & Contact Details
              </h2>
              <p className={`text-xs mt-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                Enter your shipping destination for express air dispatch across India.
              </p>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aashish Tahelyani"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-sans ${
                      isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                    MOBILE PHONE NUMBER (FOR DISPATCH SMS & WHATSAPP) *
                  </label>
                  <div className="flex">
                    <span className={`px-3 py-3 rounded-l-xl border-y border-l text-xs font-mono font-bold flex items-center ${
                      isLight ? 'bg-stone-100 border-stone-300 text-stone-700' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                    }`}>
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-r-xl border text-sm focus:outline-none font-mono ${
                        isLight 
                          ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                  EMAIL ADDRESS (FOR DIGITAL INVOICE) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-sans ${
                    isLight 
                      ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                  STREET ADDRESS / FLAT / BUILDING *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat / House No., Street, Landmark, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-sans ${
                    isLight 
                      ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                    CITY *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-sans ${
                      isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                    STATE *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-sans cursor-pointer ${
                      isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                    }`}
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-mono uppercase mb-1 font-bold ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                    PIN CODE *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="400050"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none font-mono ${
                      isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 focus:border-amber-600' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                    }`}
                  />
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
                isLight ? 'bg-amber-50/60 border-amber-300/80 text-stone-800' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
              }`}>
                <div className="flex justify-between">
                  <span>Cart Items ({items.reduce((s, i) => s + i.quantity, 0)} pcs):</span>
                  <span>{BRAND_CONFIG.currency}{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping (Pan-India):</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-bold' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className={`pt-2 border-t flex justify-between font-bold text-sm ${
                  isLight ? 'border-amber-300 text-amber-950' : 'border-neutral-800 text-amber-300'
                }`}>
                  <span>FINAL TOTAL:</span>
                  <span>{BRAND_CONFIG.currency}{total}</span>
                </div>
              </div>

              {/* Submit Address Action */}
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20 font-extrabold'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                <span>PROCEED TO PAYMENT OPTIONS ({BRAND_CONFIG.currency}{total})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </div>
        )}

        {/* STEP 2: ONLINE PAYMENT GATEWAY OPTIONS */}
        {checkoutStep === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCheckoutStep('address')}
                className={`flex items-center gap-1.5 text-xs hover:underline font-mono cursor-pointer font-bold ${
                  isLight ? 'text-amber-800' : 'text-amber-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Address</span>
              </button>
              <span className={`text-xs font-mono ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                Payable: <strong className={`text-sm ${isLight ? 'text-amber-900 font-extrabold' : 'text-amber-400'}`}>{BRAND_CONFIG.currency}{total}</strong>
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-extrabold mb-1">
              Select Payment Method
            </h2>
            <p className={`text-xs font-light mb-6 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              Secure online payment via Razorpay (UPI, Cards, Netbanking, Wallets) or Cash on Delivery.
            </p>

            {paymentError && (
              <div className={`mb-4 p-3 rounded-xl border flex items-start gap-2 text-xs font-mono ${
                isLight ? 'bg-red-50 border-red-300 text-red-800' : 'bg-red-950/40 border-red-800/50 text-red-300'
              }`}>
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6 font-mono text-xs">

              <button
                type="button"
                onClick={() => setPaymentMethod('online')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? (isLight 
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm' 
                        : 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10')
                    : (isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-600 hover:text-stone-900' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200')
                }`}
              >
                <Wallet className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>PAY ONLINE</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? (isLight 
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm' 
                        : 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10')
                    : (isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-600 hover:text-stone-900' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200')
                }`}
              >
                <Banknote className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>COD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp'
                    ? (isLight 
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm' 
                        : 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10')
                    : (isLight 
                        ? 'bg-[#FAF8F5] border-stone-300 text-stone-600 hover:text-stone-900' 
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200')
                }`}
              >
                <MessageCircle className={`w-5 h-5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>WHATSAPP</span>
              </button>

            </div>

            {/* TAB CONTENT: ONLINE PAYMENT VIA RAZORPAY */}
            {paymentMethod === 'online' && (
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-[#FAF8F5] border-stone-300' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Pay securely via Razorpay</span>
                </div>
                <p className={`text-xs ${isLight ? 'text-stone-700' : 'text-neutral-300 font-light'}`}>
                  Clicking below opens Razorpay's secure payment window where you can pay by
                  <strong> UPI</strong> (Google Pay, PhonePe, Paytm, BHIM, or any UPI app), <strong>Card</strong>, or <strong>Netbanking</strong>.
                  Your payment is verified automatically — no need to type any reference number.
                </p>
                <div className={`p-3 rounded-xl border flex items-center justify-between text-[11px] ${
                  isLight ? 'bg-white border-stone-300 text-stone-700' : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                }`}>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Need help paying? WhatsApp us at +{config.whatsappNumber}</span>
                  </span>
                  <a
                    href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(`Hi 1313 Fashion! I am at checkout for order #${pendingOrderId} (₹${total}) and need payment assistance.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline cursor-pointer"
                  >
                    Chat Now
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CASH ON DELIVERY */}
            {paymentMethod === 'cod' && (
              <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                isLight ? 'bg-[#FAF8F5] border-stone-300 text-stone-800' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                  <Banknote className="w-5 h-5" />
                  <span>Doorstep Cash Payment Available</span>
                </div>
                <p className={isLight ? 'text-stone-700' : 'text-neutral-300 font-light'}>
                  Pay cash directly to our courier executive when your 1313 Fashion luxury package arrives at <strong className={isLight ? 'text-amber-900 font-bold' : 'text-amber-300'}>{formData.city}, {formData.state} ({formData.postalCode})</strong>.
                </p>
                <p className={`text-[11px] font-mono pt-2 border-t ${
                  isLight ? 'border-stone-200 text-stone-500' : 'border-neutral-900 text-amber-400/80'
                }`}>
                  Note: Please keep exact change of {BRAND_CONFIG.currency}{total} ready at the time of delivery.
                </p>
              </div>
            )}

            {/* TAB CONTENT: ORDER VIA WHATSAPP */}
            {paymentMethod === 'whatsapp' && (
              <div className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2 ${
                isLight ? 'bg-[#FAF8F5] border-stone-300 text-stone-800' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`flex items-center gap-2 font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                  <MessageCircle className="w-5 h-5" />
                  <span>Order via WhatsApp</span>
                </div>
                <p className={isLight ? 'text-stone-700' : 'text-neutral-300 font-light'}>
                  Clicking below opens WhatsApp with your order details (items, total, address) already typed out for you — you'll just need to hit <strong>Send</strong>. We'll take it from there and confirm payment details with you directly on chat.
                </p>
                <p className={`text-[11px] font-mono pt-2 border-t ${
                  isLight ? 'border-stone-200 text-stone-500' : 'border-neutral-900 text-amber-400/80'
                }`}>
                  Note: WhatsApp itself requires you to tap Send once it opens — we can't do that part for you automatically.
                </p>
              </div>
            )}

            {/* Submit Payment Action */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleExecutePayment}
                className={`w-full py-4 rounded-xl font-bold text-xs font-mono uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20 font-extrabold'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                {paymentMethod === 'whatsapp' ? (
                  <MessageCircle className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                <span>
                  {paymentMethod === 'online'
                    ? `PROCEED TO PAY (${BRAND_CONFIG.currency}${total})`
                    : paymentMethod === 'whatsapp'
                    ? 'CONTINUE ON WHATSAPP'
                    : `CONFIRM & PLACE ORDER (${BRAND_CONFIG.currency}${total})`}
                </span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: PROCESSING STATE */}
        {checkoutStep === 'processing' && (
          <div className="text-center py-16 space-y-4">
            <Loader2 className={`w-12 h-12 animate-spin mx-auto ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <h3 className="font-serif text-xl font-bold">
              Processing Your Order & Payment...
            </h3>
            <p className={`text-xs font-mono ${isLight ? 'text-stone-600' : 'text-amber-400/80'}`}>
              Transmitting 256-bit encrypted confirmation to 1313 Fashion order desk.
            </p>
          </div>
        )}

        {/* STEP 4: ORDER CONFIRMED RECEIPT & WHATSAPP / INSTAGRAM DISPATCH */}
        {checkoutStep === 'confirmation' && orderSummary && (
          <div className="text-center py-2">
            
            <div className={`w-14 h-14 rounded-full border flex items-center justify-center mx-auto mb-3 ${
              isLight ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-amber-500/20 border-amber-500 text-amber-400'
            }`}>
              <CheckCircle className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mb-1">
              Order Confirmed & Payment Received!
            </h2>
            
            <p className={`text-xs font-mono uppercase tracking-widest mb-4 font-bold ${
              isLight ? 'text-amber-900' : 'text-amber-400'
            }`}>
              ORDER ID: #{orderSummary.orderNumber}
            </p>

            <p className={`text-xs max-w-md mx-auto mb-6 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
              Thank you, <strong className={isLight ? 'text-amber-900 font-bold' : 'text-amber-300'}>{orderSummary.customerName}</strong>! Your Drop 01 streetwear piece is confirmed and undergoing final hand inspection for express dispatch.
            </p>

            {/* Direct Instant WhatsApp Order Dispatch & Receipt Button */}
            <div className="mb-6">
              <a
                href={getWhatsAppOrderUrl(config.whatsappNumber, orderSummary)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Send Order & Receipt to WhatsApp (+91 {config.whatsappNumber})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-[10px] font-mono opacity-70 block mt-1.5">
                Click above to send your order invoice directly to the brand for instant dispatch confirmation.
              </span>
            </div>

            {/* Comprehensive Order Summary Receipt */}
            <div className={`p-5 rounded-2xl border text-left font-mono text-xs space-y-3 mb-6 ${
              isLight ? 'bg-[#FAF8F5] border-stone-300 text-stone-800' : 'bg-neutral-950 border-amber-500/30 text-neutral-300'
            }`}>
              
              <div className={`flex items-center justify-between border-b pb-2 ${
                isLight ? 'text-amber-900 border-stone-200 font-bold' : 'text-amber-400 border-neutral-800'
              }`}>
                <span className="flex items-center gap-1.5 font-bold">
                  <Truck className="w-4 h-4" />
                  <span>EXPRESS AIR DISPATCH</span>
                </span>
                <span>EST: 2-3 BUSINESS DAYS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className={`block text-[10px] font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>DELIVERY ADDRESS:</span>
                  <p className={`font-sans font-medium text-xs ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
                    {orderSummary.customerName}<br />
                    {orderSummary.address}<br />
                    {orderSummary.city}, {orderSummary.state} - {orderSummary.postalCode}<br />
                    Mobile: +91 {orderSummary.phone}
                  </p>
                </div>

                <div>
                  <span className={`block text-[10px] font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>PAYMENT & STATUS:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isLight ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {orderSummary.paymentMethod}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      isLight ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-green-500/20 text-green-400'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {orderSummary.paymentStatus}
                    </span>
                  </div>
                  {orderSummary.utrNumber && (
                    <span className={`text-[10px] block mt-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                      UPI UTR Ref: {orderSummary.utrNumber}
                    </span>
                  )}
                  {orderSummary.transactionId && (
                    <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                      Ref TXN ID: {orderSummary.transactionId}
                    </span>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className={`pt-3 border-t space-y-1.5 ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
                <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>ORDERED ITEMS:</span>
                {orderSummary.items.map((item) => (
                  <div key={item.id} className={`flex items-center justify-between text-xs font-sans ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
                    <span>
                      {item.product.title} ({item.selectedSize} / {item.selectedColor.name}) x {item.quantity}
                    </span>
                    <span className={`font-mono font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                      {BRAND_CONFIG.currency}{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`pt-3 border-t flex justify-between items-center text-sm font-bold ${
                isLight ? 'border-stone-200 text-stone-900' : 'border-neutral-800'
              }`}>
                <span>TOTAL AMOUNT PAID:</span>
                <span className={`font-mono text-base ${isLight ? 'text-amber-900 font-extrabold' : 'text-amber-400'}`}>{BRAND_CONFIG.currency}{orderSummary.total}</span>
              </div>

            </div>

            {/* Return / Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getInstagramDmUrl(config.instagramHandle)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-5 py-3 rounded-xl border font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isLight 
                    ? 'bg-pink-50 border-pink-300 hover:bg-pink-100 text-pink-950' 
                    : 'bg-pink-950/40 border-pink-700/40 hover:bg-pink-900/50 text-pink-200'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>DM @{config.instagramHandle}</span>
              </a>

              <button
                onClick={() => window.print()}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl border font-mono text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isLight 
                    ? 'bg-white border-stone-300 hover:border-amber-600 text-stone-800 shadow-sm' 
                    : 'bg-neutral-900 border-neutral-800 hover:border-amber-400 text-neutral-200 hover:text-amber-300'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-widest cursor-pointer shadow-lg ${
                  isLight
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20 font-extrabold'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                CONTINUE SHOPPING
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
