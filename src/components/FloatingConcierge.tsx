import React, { useState } from 'react';
import { 
  MessageCircle, 
  Instagram, 
  PhoneCall, 
  X, 
  HelpCircle, 
  Sparkles, 
  ExternalLink,
  ShoppingBag,
  BellRing
} from 'lucide-react';
import { StoreConfig } from '../types';
import { getWhatsAppInquiryUrl, getInstagramDmUrl } from '../utils/paymentAndContact';
import { useTheme } from '../context/ThemeContext';

interface FloatingConciergeProps {
  config: StoreConfig;
  onOpenOrders?: () => void;
  orderCount?: number;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({
  config,
  onOpenOrders,
  orderCount = 0,
}) => {
  const { isLight } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappInquiryUrl = getWhatsAppInquiryUrl(config.whatsappNumber, 'general');
  const instagramUrl = getInstagramDmUrl(config.instagramHandle);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Concierge Menu */}
      {isOpen && (
        <div className={`mb-3 w-80 p-5 rounded-3xl border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300 ${
          isLight 
            ? 'bg-white/95 border-stone-300 text-stone-900 shadow-stone-800/20' 
            : 'bg-neutral-900/95 border-amber-500/40 text-neutral-100 shadow-amber-950/80'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-neutral-800 mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-xl ${
                isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold tracking-wide">1313 Concierge & Support</h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online & Active for Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                isLight ? 'text-stone-400 hover:text-stone-700' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
            Have questions about orders, payments, sizing, or custom bulk printing? Connect directly with us:
          </p>

          {/* Action Channels */}
          <div className="space-y-2.5">
            {/* WhatsApp Primary Direct */}
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi 1313 Fashion! 👋 I am contacting you for assistance with products or orders.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                isLight 
                  ? 'bg-emerald-50/80 hover:bg-emerald-100/80 border-emerald-300 text-emerald-950' 
                  : 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-600/40 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block">WhatsApp (+91 93270 98245)</span>
                  <span className="text-[10px] opacity-80 font-mono">Instant Support & Orders</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* WhatsApp Alt Direct */}
            {config.whatsappNumberAlt && (
              <a
                href={`https://wa.me/${config.whatsappNumberAlt.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi 1313 Fashion! 👋 I am contacting you from the store.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer group ${
                  isLight 
                    ? 'bg-emerald-50/50 hover:bg-emerald-100/60 border-emerald-200 text-emerald-950' 
                    : 'bg-neutral-900 hover:border-emerald-700/50 text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/90 text-white flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">+91 92653 31152</span>
                    <span className="text-[9px] opacity-75 font-mono">Alternate Line</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {/* Instagram Profile & DM */}
            <a
              href={config.instagramUrl || getInstagramDmUrl(config.instagramHandle)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                isLight 
                  ? 'bg-pink-50/80 hover:bg-pink-100/80 border-pink-300 text-pink-950' 
                  : 'bg-pink-950/40 hover:bg-pink-900/50 border-pink-600/40 text-pink-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block">Instagram (@itz.1313_)</span>
                  <span className="text-[10px] opacity-80 font-mono">Follow & Direct Message</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Store Orders & Admin Notifications Trigger */}
            {onOpenOrders && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenOrders();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isLight 
                    ? 'bg-amber-50/80 hover:bg-amber-100/80 border-amber-300 text-amber-950' 
                    : 'bg-amber-950/40 hover:bg-amber-900/50 border-amber-600/40 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ${
                    isLight ? 'bg-amber-500 text-stone-950' : 'bg-amber-500 text-neutral-950'
                  }`}>
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">Store Orders & Admin</span>
                    <span className="text-[10px] opacity-80 font-mono">{orderCount} Placed Orders</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 font-bold border border-amber-500/30">
                  MANAGE
                </span>
              </button>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-mono opacity-70">
            <span>UPI: {config.upiId}</span>
            <span>240 GSM DROPS</span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with Active Notification Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Concierge Support"
        className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl border flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group ${
          isOpen
            ? (isLight ? 'bg-stone-900 text-white border-stone-700' : 'bg-amber-500 text-neutral-950 border-amber-400')
            : (isLight 
                ? 'bg-white text-amber-900 border-amber-400 shadow-stone-600/30' 
                : 'bg-neutral-900 text-amber-400 border-amber-500/50 shadow-amber-950/80')
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-6 h-6 text-emerald-500 animate-bounce" />
            <span className="hidden md:inline font-mono font-bold text-xs pr-1">
              Contact & Orders
            </span>
          </div>
        )}

        {/* Pulse indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-neutral-950" />
          </span>
        )}
      </button>
    </div>
  );
};
