import React from 'react';
import { BRAND_CONFIG, officialLogoImg } from '../data/products';
import { Instagram, MessageCircle, Mail, ShieldCheck, BellRing } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { StoreConfig } from '../types';
import { getWhatsAppInquiryUrl, getInstagramDmUrl } from '../utils/paymentAndContact';

interface FooterProps {
  onNavigateSection: (id: string) => void;
  onOpenWisdom: () => void;
  config?: StoreConfig;
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateSection, 
  onOpenWisdom,
  config,
  onOpenOrders 
}) => {
  const { isLight } = useTheme();

  const whatsappUrl = config ? getWhatsAppInquiryUrl(config.whatsappNumber, 'general') : '#';
  const instagramUrl = config ? getInstagramDmUrl(config.instagramHandle) : '#';
  const emailUrl = config ? `mailto:${config.supportEmail}` : '#';

  return (
    <footer className={`py-16 border-t font-sans transition-colors duration-300 ${
      isLight 
        ? 'bg-[#EEE8DC] text-stone-700 border-stone-300' 
        : 'bg-neutral-950 text-neutral-400 border-amber-900/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b ${isLight ? 'border-stone-300' : 'border-neutral-900'}`}>
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={officialLogoImg}
                alt="1313 Fashion Logo"
                className="w-10 h-10 object-contain rounded-lg border border-amber-500/50 p-0.5 bg-white shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className={`font-serif tracking-[0.2em] text-lg font-bold ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                1313 FASHION
              </span>
            </div>

            <p className={`font-serif text-xl italic font-light ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
              "{BRAND_CONFIG.tagline}"
            </p>

            <p className={`text-xs max-w-sm leading-relaxed ${isLight ? 'text-stone-600 font-normal' : 'text-neutral-400 font-light'}`}>
              Derived from 'Tera' ( तेरा ), 1313 is a reminder that everything you are given in this life is driven by an unseen force—a divine grace. Luxury Streetwear Apparel.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs uppercase tracking-widest font-mono">
            <h4 className={`font-bold mb-4 ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>EXPLORE</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className={`transition-colors cursor-pointer ${isLight ? 'hover:text-stone-950 text-stone-700' : 'hover:text-neutral-100 text-neutral-400'}`}
                >
                  Drop 01 Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('custom-orders')}
                  className={`transition-colors cursor-pointer font-bold ${isLight ? 'text-amber-800 hover:text-amber-950' : 'text-amber-400 hover:text-amber-300'}`}
                >
                  Custom & Bulk Printing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('ethos')}
                  className={`transition-colors cursor-pointer ${isLight ? 'hover:text-stone-950 text-stone-700' : 'hover:text-neutral-100 text-neutral-400'}`}
                >
                  The Story of 'Tera'
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('fabric')}
                  className={`transition-colors cursor-pointer ${isLight ? 'hover:text-stone-950 text-stone-700' : 'hover:text-neutral-100 text-neutral-400'}`}
                >
                  Craftsmanship & Fabric
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('packaging')}
                  className={`transition-colors cursor-pointer ${isLight ? 'hover:text-stone-950 text-stone-700' : 'hover:text-neutral-100 text-neutral-400'}`}
                >
                  Unboxing Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWisdom}
                  className={`transition-colors cursor-pointer font-medium ${isLight ? 'text-amber-800 hover:text-amber-950' : 'text-amber-400 hover:text-amber-300'}`}
                >
                  Seek Reflection
                </button>
              </li>
              {onOpenOrders && (
                <li>
                  <button
                    onClick={onOpenOrders}
                    className={`transition-colors cursor-pointer font-bold flex items-center gap-1.5 ${isLight ? 'text-amber-900 hover:text-stone-950' : 'text-amber-400 hover:text-amber-300'}`}
                  >
                    <BellRing className="w-3 h-3" />
                    <span>Store Orders & Admin</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="space-y-4 text-xs font-mono">
            <h4 className={`font-bold mb-3 uppercase tracking-wider ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
              REACH US (INSTAGRAM & WHATSAPP)
            </h4>

            {/* Direct WhatsApp Numbers */}
            <div className="space-y-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                WhatsApp Support & Orders:
              </span>
              
              <a
                href={`https://wa.me/919327098245?text=${encodeURIComponent('Hi 1313 Fashion! 👋 I am contacting you regarding products / custom apparel.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer group ${
                  isLight 
                    ? 'bg-emerald-50/80 border-emerald-300 hover:bg-emerald-100 text-emerald-950 shadow-sm' 
                    : 'bg-emerald-950/40 border-emerald-700/50 hover:bg-emerald-900/50 text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[11px]">+91 93270 98245</div>
                    <div className={`text-[9px] ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Primary WhatsApp</div>
                  </div>
                </div>
                <span className={`text-[10px] uppercase font-bold underline ${isLight ? 'text-emerald-800' : 'text-emerald-300'}`}>
                  Chat Now →
                </span>
              </a>

              <a
                href={`https://wa.me/919265331152?text=${encodeURIComponent('Hi 1313 Fashion! 👋 I am reaching out regarding an inquiry / custom order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer group ${
                  isLight 
                    ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-100 text-emerald-950 shadow-sm' 
                    : 'bg-neutral-900 border-neutral-800 hover:border-emerald-700/50 text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600/80 flex items-center justify-center text-white">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[11px]">+91 92653 31152</div>
                    <div className={`text-[9px] ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>Alternate Support</div>
                  </div>
                </div>
                <span className={`text-[10px] uppercase font-bold ${isLight ? 'text-emerald-800' : 'text-emerald-400'}`}>
                  Chat →
                </span>
              </a>
            </div>

            {/* Direct Instagram Profile Link */}
            <div className="pt-1 space-y-1.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                Official Instagram:
              </span>
              <a
                href="https://www.instagram.com/itz.1313_?igsh=MXkxOHpiaDAwMWg2aA=="
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer group ${
                  isLight 
                    ? 'bg-pink-50/80 border-pink-300 hover:bg-pink-100 text-pink-950 shadow-sm' 
                    : 'bg-pink-950/30 border-pink-700/40 hover:bg-pink-900/40 text-pink-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-bold text-[11px]">@itz.1313_</div>
                    <div className={`text-[9px] ${isLight ? 'text-pink-700' : 'text-pink-400'}`}>DM for Drop Info & Fits</div>
                  </div>
                </div>
                <span className={`text-[10px] uppercase font-bold underline ${isLight ? 'text-pink-800' : 'text-pink-300'}`}>
                  Follow & DM →
                </span>
              </a>
            </div>

            {/* Verified Payment / UPI Desk Note */}
            <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed transition-colors mt-2 ${
              isLight ? 'bg-white border-stone-300 text-stone-700 shadow-sm' : 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
            }`}>
              <div className={`flex items-center gap-1.5 font-bold mb-0.5 ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>OFFICIAL STORE UPI</span>
              </div>
              <span className="font-mono text-[10px]">{config?.upiId || 'tahelyaniaashish14@okaxis'}</span>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-4 ${
          isLight ? 'text-stone-500 font-medium' : 'text-neutral-500'
        }`}>
          <div>
            © {new Date().getFullYear()} 1313 FASHION. ALL RIGHTS RESERVED.
          </div>

          <div className={`flex items-center gap-3 font-serif font-bold ${isLight ? 'text-amber-900' : 'text-amber-400/80'}`}>
            <span className="text-sm">तेरा</span>
            <span>•</span>
            <span>IT'S YOURS, OWN IT !</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
