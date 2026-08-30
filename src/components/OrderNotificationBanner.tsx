import React from 'react';
import { BellRing, CheckCircle, ExternalLink, X, MessageCircle } from 'lucide-react';
import { OrderDetails } from '../types';
import { useTheme } from '../context/ThemeContext';

interface OrderNotificationBannerProps {
  order: OrderDetails | null;
  onDismiss: () => void;
  onViewOrder: () => void;
}

export const OrderNotificationBanner: React.FC<OrderNotificationBannerProps> = ({
  order,
  onDismiss,
  onViewOrder,
}) => {
  if (!order) return null;

  const { isLight } = useTheme();

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-6 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start justify-between gap-3 ${
        isLight 
          ? 'bg-amber-50/95 border-amber-400 text-stone-900 shadow-amber-900/15' 
          : 'bg-neutral-900/95 border-amber-500/60 text-neutral-100 shadow-amber-950/80'
      }`}>
        
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30 shrink-0">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                NEW ORDER ACCEPTED
              </span>
              <span className="text-[10px] font-mono opacity-60">Just Now</span>
            </div>

            <h4 className="text-xs font-bold font-sans">
              #{order.orderNumber} • ₹{order.total}
            </h4>

            <p className="text-[11px] opacity-80 line-clamp-1">
              Customer: <strong className="font-semibold">{order.customerName}</strong> ({order.city})
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onViewOrder}
                className="px-3 py-1 rounded-lg bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950 font-mono text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
