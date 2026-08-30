import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckCircle, 
  Truck, 
  Clock, 
  MessageCircle, 
  Phone, 
  Mail, 
  Settings, 
  Save, 
  RefreshCw, 
  Trash2, 
  QrCode, 
  ExternalLink,
  ShieldCheck,
  PackageCheck,
  AlertCircle,
  LogOut
} from 'lucide-react';
import { OrderDetails, StoreConfig } from '../types';
import { useTheme } from '../context/ThemeContext';
import { BRAND_CONFIG, officialLogoImg } from '../data/products';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
  config: StoreConfig;
  onUpdateStatus: (orderNumber: string, status: 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED', paymentStatus?: 'PAID' | 'PENDING') => void;
  onSaveConfig: (config: StoreConfig) => void;
  onClearOrders?: () => void;
  onLogout?: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  config,
  onUpdateStatus,
  onSaveConfig,
  onClearOrders,
  onLogout,
}) => {
  if (!isOpen) return null;

  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED'>('ALL');
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreConfig>({ ...config });
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  const filteredOrders = selectedFilter === 'ALL' 
    ? orders 
    : orders.filter((o) => o.orderStatus === selectedFilter);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(settingsForm);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  const handleWhatsAppCustomer = (order: OrderDetails) => {
    const cleanPhone = order.phone.replace(/[^0-9]/g, '');
    const message = `Hello ${order.customerName}! 👋

This is *1313 FASHION*. We have received and verified your order *#${order.orderNumber}* for ₹${order.total}.

📦 *Items:* ${order.items.map(i => `${i.product.title} (${i.selectedSize}/${i.selectedColor.name}) x ${i.quantity}`).join(', ')}
📍 *Address:* ${order.address}, ${order.city}, ${order.state} - ${order.postalCode}
🛡️ *Status:* ${order.orderStatus} (${order.paymentStatus})

Your package is being hand-finished in our signature frosted matte black luxury sleeve with tamper-evident seal. Express tracking will be shared shortly! ✨`;

    window.open(`https://wa.me/${cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'PAID' ? o.total : 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'NEW').length;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md overflow-y-auto ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/90'
    }`}>
      
      <div className={`relative w-full max-w-4xl my-6 border rounded-3xl p-5 sm:p-8 shadow-2xl transition-colors duration-300 ${
        isLight 
          ? 'bg-white border-stone-300 text-stone-900 shadow-stone-700/20' 
          : 'bg-neutral-900 border-amber-500/40 text-neutral-100'
      }`}>
        
        {/* Close & Logout Buttons */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onLogout && (
            <button
              onClick={onLogout}
              title="Log out of admin panel"
              className={`p-2.5 rounded-full border cursor-pointer transition-colors flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase ${
                isLight 
                  ? 'bg-stone-100 text-stone-500 hover:text-red-700 border-stone-300 hover:border-red-400' 
                  : 'bg-neutral-950 text-neutral-400 hover:text-red-400 border-neutral-800 hover:border-red-500/50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          )}
          <button
            onClick={onClose}
            className={`p-2.5 rounded-full border cursor-pointer transition-colors ${
              isLight 
                ? 'bg-stone-100 text-stone-500 hover:text-stone-900 border-stone-300 hover:border-amber-600' 
                : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800 hover:border-amber-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Top Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b mb-6 ${
          isLight ? 'border-stone-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-3">
            <img 
              src={officialLogoImg} 
              alt="1313 Logo" 
              className="w-10 h-10 object-contain rounded-lg bg-white p-0.5 border border-stone-300 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  Store Management & Orders
                </h3>
                {pendingOrdersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-stone-950 animate-pulse">
                    {pendingOrdersCount} NEW
                  </span>
                )}
              </div>
              <p className={`text-xs font-mono ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                Active UPI: <strong className={isLight ? 'text-amber-800' : 'text-amber-300'}>{config.upiId}</strong> • WhatsApp: +{config.whatsappNumber}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
                activeTab === 'orders'
                  ? (isLight ? 'bg-amber-100 border-amber-600 text-amber-950 shadow-sm' : 'bg-amber-500/20 border-amber-500 text-amber-300')
                  : (isLight ? 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100' : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200')
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Live Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
                activeTab === 'settings'
                  ? (isLight ? 'bg-amber-100 border-amber-600 text-amber-950 shadow-sm' : 'bg-amber-500/20 border-amber-500 text-amber-300')
                  : (isLight ? 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100' : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200')
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Payment & Contact Settings</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE ORDERS LIST */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-950 border-neutral-800'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>TOTAL ORDERS</span>
                <span className={`text-xl font-bold ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>{orders.length}</span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-950/30 border-emerald-800/40'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>TOTAL REVENUE</span>
                <span className={`text-xl font-bold ${isLight ? 'text-emerald-900' : 'text-emerald-300'}`}>₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-950/30 border-amber-800/40'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>NEEDS DISPATCH</span>
                <span className={`text-xl font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>{orders.filter(o => o.orderStatus !== 'DELIVERED').length}</span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-purple-50 border-purple-200' : 'bg-purple-950/30 border-purple-800/40'}`}>
                <span className={`text-[10px] block font-bold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>CONTACT CHANNELS</span>
                <span className={`text-xs font-bold block mt-1 ${isLight ? 'text-purple-900' : 'text-purple-300'}`}>WhatsApp & IG Active</span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                {(['ALL', 'NEW', 'ACCEPTED', 'DISPATCHED', 'DELIVERED'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-lg border cursor-pointer transition-colors ${
                      selectedFilter === filter
                        ? (isLight ? 'bg-stone-900 text-white border-stone-900 font-bold' : 'bg-amber-500 text-stone-950 border-amber-400 font-bold')
                        : (isLight ? 'bg-white text-stone-600 border-stone-300 hover:border-stone-400' : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700')
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {orders.length > 0 && onClearOrders && (
                <button
                  onClick={onClearOrders}
                  className={`text-[11px] font-mono flex items-center gap-1 text-red-500 hover:underline cursor-pointer`}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Order History</span>
                </button>
              )}
            </div>

            {/* Orders Feed */}
            {filteredOrders.length === 0 ? (
              <div className={`text-center py-14 rounded-2xl border border-dashed ${
                isLight ? 'border-stone-300 bg-stone-50/50' : 'border-neutral-800 bg-neutral-950/40'
              }`}>
                <ShoppingBag className={`w-10 h-10 mx-auto mb-2 opacity-40 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`} />
                <h4 className="text-sm font-serif font-bold">No orders found</h4>
                <p className={`text-xs mt-1 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                  When customers place orders online or via UPI, they will appear here instantly with full receipt details.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {filteredOrders.map((order) => (
                  <div
                    key={order.orderNumber}
                    className={`p-5 rounded-2xl border transition-all ${
                      isLight 
                        ? 'bg-[#FAF8F5] border-stone-300/90 shadow-sm' 
                        : 'bg-neutral-950 border-neutral-800/90 hover:border-amber-500/40'
                    }`}
                  >
                    {/* Order Item Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200 dark:border-neutral-800 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                            #{order.orderNumber}
                          </span>
                          <span className="text-[10px] font-mono opacity-60">
                            {order.date}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold mt-0.5">
                          {order.customerName}
                        </h4>
                      </div>

                      {/* Status Badges & Controls */}
                      <div className="flex items-center gap-2">
                        {/* Payment Badge */}
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border flex items-center gap-1 ${
                          order.paymentStatus === 'PAID'
                            ? (isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60')
                            : (isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-950/60 text-amber-300 border-amber-700/60')
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {order.paymentMethod} • {order.paymentStatus}
                        </span>

                        {/* Order Fulfillment Status Select */}
                        <select
                          value={order.orderStatus}
                          onChange={(e) => onUpdateStatus(
                            order.orderNumber, 
                            e.target.value as 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED',
                            order.paymentStatus
                          )}
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none ${
                            order.orderStatus === 'NEW' 
                              ? (isLight ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-blue-950 text-blue-300 border-blue-700')
                              : order.orderStatus === 'ACCEPTED'
                              ? (isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-950 text-amber-300 border-amber-700')
                              : order.orderStatus === 'DISPATCHED'
                              ? (isLight ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-purple-950 text-purple-300 border-purple-700')
                              : (isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-950 text-emerald-300 border-emerald-700')
                          }`}
                        >
                          <option value="NEW">Status: NEW</option>
                          <option value="ACCEPTED">Status: ACCEPTED</option>
                          <option value="DISPATCHED">Status: DISPATCHED</option>
                          <option value="DELIVERED">Status: DELIVERED</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      
                      {/* Customer Contact & Address */}
                      <div className="space-y-1">
                        <span className={`text-[10px] font-bold block uppercase ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                          CUSTOMER & DELIVERY:
                        </span>
                        <p className="font-sans font-medium text-xs leading-tight">
                          {order.address}<br />
                          {order.city}, {order.state} - {order.postalCode}
                        </p>
                        <div className="pt-1 flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold font-mono">
                            +91 {order.phone}
                          </span>
                          <span className="text-[10px] opacity-70">
                            {order.email}
                          </span>
                        </div>
                      </div>

                      {/* Ordered Products */}
                      <div className="space-y-1">
                        <span className={`text-[10px] font-bold block uppercase ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                          ORDERED APPAREL:
                        </span>
                        <div className="space-y-1 font-sans text-xs">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span>
                                {item.product.title} ({item.selectedSize} / {item.selectedColor.name}) x{item.quantity}
                              </span>
                              <span className="font-mono font-bold">
                                ₹{item.product.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Verification & Actions */}
                      <div className="space-y-2 flex flex-col justify-between">
                        <div>
                          <span className={`text-[10px] font-bold block uppercase ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                            FINANCIAL SUMMARY:
                          </span>
                          <div className="flex items-center justify-between font-bold text-sm">
                            <span>TOTAL PAID:</span>
                            <span className={isLight ? 'text-amber-900' : 'text-amber-400'}>
                              ₹{order.total}
                            </span>
                          </div>
                          {order.utrNumber && (
                            <p className={`text-[10px] font-mono mt-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                              UTR / Ref: <strong className={isLight ? 'text-amber-800' : 'text-amber-300'}>{order.utrNumber}</strong>
                            </p>
                          )}
                          {order.transactionId && (
                            <p className="text-[10px] font-mono opacity-70">
                              Txn ID: {order.transactionId}
                            </p>
                          )}
                        </div>

                        {/* Instant Communication Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleWhatsAppCustomer(order)}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Customer</span>
                          </button>
                          
                          <a
                            href={`tel:+91${order.phone}`}
                            className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                              isLight ? 'bg-white border-stone-300 text-stone-700 hover:text-stone-950' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                            }`}
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: STORE PAYMENT & CONTACT CONFIGURATION */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                <div className="text-xs leading-relaxed">
                  <strong>Real-Time Payment Gateway & Contact Integration:</strong> All customer checkout payments will directly route to your specified UPI ID and dynamic QR code. Customer orders and support messages will reach your direct WhatsApp number and Instagram inbox.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* UPI ID */}
              <div>
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Your Real UPI ID (VPA) *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.upiId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, upiId: e.target.value })}
                  placeholder="e.g. tahelyaniaashish14@okaxis or 9876543210@paytm"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
                <span className="text-[10px] font-mono opacity-70 block mt-1">
                  Used to generate live payment QR codes & 1-tap UPI app launches.
                </span>
              </div>

              {/* UPI Merchant Name */}
              <div>
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Merchant Display Name *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.upiMerchantName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, upiMerchantName: e.target.value })}
                  placeholder="e.g. 1313 FASHION"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
                <span className="text-[10px] font-mono opacity-70 block mt-1">
                  Shown in customer's GPay / PhonePe / Paytm payment screen.
                </span>
              </div>

              {/* WhatsApp Phone Number Primary */}
              <div>
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Primary Store WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  placeholder="e.g. 919327098245"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
                <span className="text-[10px] font-mono opacity-70 block mt-1">
                  Primary WhatsApp (+91 93270 98245) for customer orders & notifications.
                </span>
              </div>

              {/* WhatsApp Phone Number Alternate */}
              <div>
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Alternate WhatsApp Number (Optional)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumberAlt || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumberAlt: e.target.value })}
                  placeholder="e.g. 919265331152"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
                <span className="text-[10px] font-mono opacity-70 block mt-1">
                  Secondary WhatsApp line (+91 92653 31152) shown on concierge & footer.
                </span>
              </div>

              {/* Instagram Handle & Profile Link */}
              <div className="sm:col-span-2">
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Instagram Profile Link or Handle *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.instagramUrl || settingsForm.instagramHandle}
                  onChange={(e) => setSettingsForm({ 
                    ...settingsForm, 
                    instagramUrl: e.target.value,
                    instagramHandle: e.target.value.includes('/') ? (e.target.value.split('instagram.com/')[1]?.split('?')[0] || 'itz.1313_') : e.target.value
                  })}
                  placeholder="e.g. https://www.instagram.com/itz.1313_?igsh=MXkxOHpiaDAwMWg2aA== or itz.1313_"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
                <span className="text-[10px] font-mono opacity-70 block mt-1">
                  Direct Instagram profile link (https://www.instagram.com/itz.1313_?igsh=MXkxOHpiaDAwMWg2aA==)
                </span>
              </div>

              {/* Support Email */}
              <div className="sm:col-span-2">
                <label className={`block text-xs font-mono uppercase font-bold mb-1.5 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  Support & Orders Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={settingsForm.supportEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                  placeholder="e.g. tahelyaniaashish14@gmail.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isLight 
                      ? 'bg-stone-50 border-stone-300 text-stone-900 focus:border-amber-600' 
                      : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-400'
                  }`}
                />
              </div>

            </div>

            {/* Save Action & Feedback */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-neutral-800">
              {savedSettingsSuccess ? (
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  Settings saved successfully & applied in live store!
                </span>
              ) : (
                <span className="text-[10px] font-mono opacity-60">
                  Settings are instantly saved and persist across browser reloads.
                </span>
              )}

              <button
                type="submit"
                className={`px-8 py-3 rounded-xl font-mono text-xs uppercase font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-all ${
                  isLight 
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20' 
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>Save Store Settings</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
