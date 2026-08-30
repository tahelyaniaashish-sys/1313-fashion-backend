import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Volume2, VolumeX, Menu, X, Sun, Moon, BellRing } from 'lucide-react';
import { BRAND_CONFIG, officialLogoImg } from '../data/products';
import { toggleAmbientSoundscape } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';
import { StoreConfig } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenWisdom: () => void;
  onNavigateSection: (id: string) => void;
  onOpenOrders?: () => void;
  orderCount?: number;
  config?: StoreConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenWisdom,
  onNavigateSection,
  onOpenOrders,
  orderCount = 0,
  config,
}) => {
  const { isLight, toggleTheme } = useTheme();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const newState = toggleAmbientSoundscape();
    setIsPlayingAudio(newState);
  };

  const navItems = [
    { label: 'Drop 1 Tees', id: 'catalog' },
    { label: 'Custom & Bulk Printing', id: 'custom-orders' },
    { label: 'The Ethos (तेरा)', id: 'ethos' },
    { label: 'Craftsmanship', id: 'fabric' },
    { label: 'Unboxing', id: 'packaging' },
    { label: 'VIP Pass', id: 'vip' },
  ];

  return (
    <nav className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      isLight 
        ? 'bg-[#FAF8F5]/90 border-stone-300/70 text-stone-900 shadow-sm shadow-stone-200/50' 
        : 'bg-neutral-950/90 border-amber-900/20 text-neutral-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo (Top Left Corner) */}
          <div 
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <div className={`h-10 sm:h-12 w-auto flex items-center justify-center rounded-xl border p-1 transition-all shadow-md backdrop-blur-sm ${
              isLight 
                ? 'bg-white border-amber-600/40 group-hover:border-amber-600 shadow-amber-900/10' 
                : 'bg-neutral-900/90 border-amber-500/40 group-hover:border-amber-400 shadow-amber-950/60'
            }`}>
              <img 
                src={officialLogoImg} 
                alt="1313 Fashion Official Logo" 
                className="h-full w-auto object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className={`font-serif tracking-[0.25em] text-base sm:text-lg font-extrabold transition-colors ${
                  isLight ? 'text-stone-950 group-hover:text-amber-700' : 'text-neutral-100 group-hover:text-amber-300'
                }`}>
                  1313 FASHION
                </span>
              </div>
              <span className={`text-[10px] font-mono tracking-widest hidden sm:flex items-center gap-1.5 uppercase font-medium ${
                isLight ? 'text-amber-700' : 'text-amber-400/90'
              }`}>
                <span className="font-serif">तेरा</span>
                <span className={isLight ? 'text-amber-500' : 'text-amber-500/60'}>•</span>
                <span>IT'S YOURS, OWN IT !</span>
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-widest ${
            isLight ? 'text-stone-700' : 'text-neutral-400'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigateSection(item.id)}
                className={`py-1 relative group cursor-pointer transition-colors ${
                  isLight ? 'hover:text-amber-700' : 'hover:text-amber-300'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 ${
                  isLight ? 'bg-amber-600 group-hover:w-full' : 'bg-amber-400 group-hover:w-full'
                }`} />
              </button>
            ))}
          </div>

          {/* Actions: Admin Orders, Theme Toggle, Audio Toggle, Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Store Orders & Admin Notifications Button */}
            {onOpenOrders && (
              <button
                onClick={onOpenOrders}
                title="View Store Orders & Notifications"
                className={`relative p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-amber-100/70 border-amber-300 text-amber-900 hover:bg-amber-200/80 shadow-sm'
                    : 'bg-neutral-900 border-neutral-800 text-amber-300 hover:border-amber-500/50'
                }`}
              >
                <BellRing className="w-4 h-4" />
                <span className="hidden xl:inline text-[10px] font-mono font-bold tracking-wider">ORDERS</span>
                {orderCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                    {orderCount}
                  </span>
                )}
              </button>
            )}

            {/* Theme Toggle (Warm Light / Obsidian Dark) */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to Obsidian Dark Theme" : "Switch to Warm Light Theme"}
              className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-amber-100/70 border-amber-300 text-amber-900 hover:bg-amber-200/80 shadow-sm'
                  : 'bg-neutral-900 border-neutral-800 text-amber-300 hover:border-amber-500/50'
              }`}
            >
              {isLight ? (
                <>
                  <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                  <span className="hidden xl:inline text-[10px] font-mono font-bold tracking-wider text-amber-900">WARM LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-400" />
                  <span className="hidden xl:inline text-[10px] font-mono tracking-wider text-neutral-300">OBSIDIAN</span>
                </>
              )}
            </button>

            {/* Ambient Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isPlayingAudio ? "Mute 432Hz Soundscape" : "Play 432Hz Ambient Soundscape"}
              className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 cursor-pointer ${
                isPlayingAudio
                  ? (isLight 
                      ? 'bg-amber-500/20 text-amber-900 border-amber-500/60 shadow-sm'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10')
                  : (isLight
                      ? 'bg-white text-stone-600 border-stone-300 hover:text-stone-900 hover:border-amber-400'
                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200')
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className={`w-4 h-4 animate-pulse ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                  <span className="hidden lg:inline text-[10px] font-mono tracking-wider font-bold">432Hz ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden lg:inline text-[10px] font-mono tracking-wider">432Hz ATMOSPHERE</span>
                </>
              )}
            </button>

            {/* Unseen Wisdom Button */}
            <button
              onClick={onOpenWisdom}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs tracking-wider transition-all cursor-pointer group shadow-sm font-medium ${
                isLight
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-stone-950 border-amber-600/30 hover:shadow-md font-bold'
                  : 'bg-gradient-to-r from-amber-900/40 via-amber-950/60 to-neutral-900 border-amber-500/30 hover:border-amber-400 text-amber-300'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 group-hover:rotate-12 transition-transform ${isLight ? 'text-stone-950' : 'text-amber-400'}`} />
              <span>Seek Reflection</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? 'bg-white border-stone-300 hover:border-amber-500 text-stone-900 hover:text-amber-700 shadow-sm'
                  : 'bg-neutral-900 border-neutral-800 hover:border-amber-500/40 text-neutral-200 hover:text-amber-300'
              }`}
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center animate-bounce shadow-md shadow-amber-500/30">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isLight ? 'text-stone-700 hover:text-stone-950' : 'text-neutral-400 hover:text-neutral-100'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-2 pb-6 space-y-3 ${
          isLight ? 'bg-[#FAF8F5] border-stone-300' : 'bg-neutral-950 border-amber-900/20'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigateSection(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 text-sm uppercase tracking-widest font-semibold border-b ${
                isLight ? 'text-stone-800 hover:text-amber-700 border-stone-200' : 'text-neutral-300 hover:text-amber-300 border-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenWisdom();
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border text-xs uppercase tracking-widest font-bold ${
                isLight 
                  ? 'bg-amber-500 text-stone-950 border-amber-600'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Seek Divine Reflection</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
