import React from 'react';
import { ArrowDown, Sparkles, Shield, Compass } from 'lucide-react';
import { BRAND_CONFIG, heroBg } from '../data/products';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  onExploreDrop: () => void;
  onExploreEthos: () => void;
  onOpenWisdom: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreDrop,
  onExploreEthos,
  onOpenWisdom,
}) => {
  const { isLight } = useTheme();

  return (
    <div id="hero" className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isLight 
        ? 'bg-[#FAF8F5] text-stone-900' 
        : 'bg-neutral-950 text-neutral-100'
    }`}>
      
      {/* Background Image with Warm Vignette & Atmospheric Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="1313 Ethereal Background"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center scale-105 filter transition-all duration-500 ${
            isLight 
              ? 'opacity-20 contrast-125 brightness-105' 
              : 'opacity-35 contrast-125 brightness-90'
          }`}
        />
        <div className={`absolute inset-0 transition-all duration-300 ${
          isLight
            ? 'bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent'
            : 'bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent'
        }`} />
        <div className={`absolute inset-0 transition-all duration-300 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#FAF8F5]/90'
            : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-neutral-950/90'
        }`} />
      </div>

      {/* Floating Devanagari Light Aura Motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none opacity-20 blur-sm">
        <span className={`text-[180px] sm:text-[280px] font-serif tracking-tighter transition-colors ${
          isLight ? 'text-amber-600/40' : 'text-amber-200'
        }`}>
          तेरा
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Live Drop Status Pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-md transition-all ${
          isLight
            ? 'bg-white/95 border border-amber-600/40 text-amber-900 shadow-amber-900/10 font-bold'
            : 'bg-neutral-900/90 border border-amber-500/40 text-amber-300 shadow-amber-950/50'
        }`}>
          <span className={`w-2 h-2 rounded-full animate-ping ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
          <span>DROP 01 LIVE • LUXURY STREETWEAR COLLECTION</span>
        </div>

        {/* Devanagari Callout */}
        <div className={`mb-3 font-serif text-2xl sm:text-3xl tracking-widest flex items-center justify-center gap-3 font-semibold ${
          isLight ? 'text-amber-800' : 'text-amber-400/90'
        }`}>
          <span className={`w-8 h-[1.5px] ${isLight ? 'bg-amber-600/50' : 'bg-amber-500/40'}`} />
          <span>Derived from 'Tera' ( तेरा )</span>
          <span className={`w-8 h-[1.5px] ${isLight ? 'bg-amber-600/50' : 'bg-amber-500/40'}`} />
        </div>

        {/* Main Title & Tagline */}
        <h1 className={`font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.15em] uppercase mb-4 leading-tight drop-shadow-sm ${
          isLight 
            ? 'text-transparent bg-clip-text bg-gradient-to-b from-stone-950 via-stone-900 to-amber-900'
            : 'text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 via-amber-100 to-amber-400/80'
        }`}>
          1313 FASHION
        </h1>

        <p className={`font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] uppercase font-medium mb-8 italic ${
          isLight ? 'text-amber-700 drop-shadow-sm' : 'text-amber-300/90'
        }`}>
          "{BRAND_CONFIG.tagline}"
        </p>

        {/* Ethos Description */}
        <p className={`max-w-2xl text-sm sm:text-base font-normal leading-relaxed mb-10 tracking-wide text-balance ${
          isLight ? 'text-stone-700' : 'text-neutral-300 font-light'
        }`}>
          A reminder that everything you are given in this life is driven by an unseen force—a divine grace. 
          Minimalist luxury streetwear launching with Drop 01 Tees & expanding into full fashion wear.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreDrop}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-bold text-xs uppercase tracking-[0.25em] hover:brightness-105 transition-all shadow-xl shadow-amber-600/25 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>EXPLORE DROP 01</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={onExploreEthos}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl border text-xs font-bold uppercase tracking-[0.2em] transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer ${
              isLight
                ? 'bg-white/90 border-stone-300 hover:border-amber-600 text-stone-900 hover:bg-stone-50 shadow-sm'
                : 'bg-neutral-900/80 border-neutral-700 hover:border-amber-500/50 text-neutral-200 hover:bg-neutral-800/80'
            }`}
          >
            <Compass className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>THE MEANING OF 1313</span>
          </button>
        </div>

        {/* Subtle Feature Badges */}
        <div className={`mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t w-full max-w-3xl text-xs tracking-wider uppercase font-mono font-medium ${
          isLight ? 'border-stone-300/80 text-stone-600' : 'border-neutral-800/80 text-neutral-400'
        }`}>
          <div className="flex items-center justify-center gap-2">
            <Shield className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400/80'}`} />
            <span>Signature Oversized Fit</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400/80'}`} />
            <span>3D Metallic Gold Emblem</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`} />
            <span>Limited Drop Edition</span>
          </div>
        </div>

      </div>
    </div>
  );
};
