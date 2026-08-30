import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { REFLECTIONS } from '../data/products';
import { WisdomReflection } from '../types';
import { useTheme } from '../context/ThemeContext';

interface UnseenWisdomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnseenWisdomModal: React.FC<UnseenWisdomModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { isLight } = useTheme();

  const [currentReflection, setCurrentReflection] = useState<WisdomReflection>(REFLECTIONS[0]);
  const [userName, setUserName] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleDrawNew = () => {
    const nextIdx = (currentReflection.id % REFLECTIONS.length);
    setCurrentReflection(REFLECTIONS[nextIdx]);
  };

  const handleCopyText = () => {
    const textToCopy = `"${currentReflection.quote}" — 1313 FASHION (Tera • तेरा)\nIt's yours, own it!`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/90'
    }`}>
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-2xl border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-colors duration-300 ${
        isLight 
          ? 'bg-white border-stone-300 text-stone-900 shadow-stone-700/20' 
          : 'bg-neutral-900 border-amber-500/40 text-neutral-100 shadow-2xl'
      }`}>
        
        {/* Background Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isLight ? 'bg-amber-400/15' : 'bg-amber-500/10'
        }`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full border transition-all cursor-pointer ${
            isLight 
              ? 'bg-stone-100 text-stone-600 hover:text-stone-950 border-stone-300 hover:border-amber-600' 
              : 'bg-neutral-950 text-neutral-400 hover:text-white border-neutral-800 hover:border-amber-400'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase mb-3 font-bold ${
            isLight 
              ? 'bg-amber-100 border border-amber-400 text-amber-900' 
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 animate-pulse ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>SEEK REFLECTION</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold">
            The Unseen Force Studio
          </h2>
          
          <p className={`text-xs font-sans mt-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
            Receive a philosophical reflection aligned with Tera ( तेरा ) and divine grace.
          </p>
        </div>

        {/* Customizer Name Input */}
        <div className="mb-6">
          <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
            isLight ? 'text-stone-700' : 'text-amber-400'
          }`}>
            ENTER YOUR NAME / INTENTION (OPTIONAL):
          </label>
          <input
            type="text"
            placeholder="e.g., Aashish / Growth / Peace"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border text-sm font-serif tracking-wide focus:outline-none transition-colors ${
              isLight 
                ? 'bg-[#FAF8F5] border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600' 
                : 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400'
            }`}
          />
        </div>

        {/* Reflection Card Display */}
        <div className={`p-8 rounded-2xl border shadow-xl relative mb-6 text-center transition-colors duration-300 ${
          isLight 
            ? 'bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-amber-300/80 shadow-amber-900/5' 
            : 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border-amber-500/40 shadow-2xl'
        }`}>
          
          <div className={`flex items-center justify-between text-[10px] font-mono uppercase tracking-widest mb-6 font-bold ${
            isLight ? 'text-amber-900' : 'text-amber-400'
          }`}>
            <span>1313 DIVINE REFLECTION</span>
            <span>THEME: {currentReflection.theme}</span>
          </div>

          <blockquote className={`font-serif text-xl sm:text-2xl italic leading-snug mb-6 ${
            isLight ? 'text-stone-900 font-semibold' : 'text-neutral-100'
          }`}>
            "{currentReflection.quote}"
          </blockquote>

          <p className={`text-xs font-sans leading-relaxed max-w-md mx-auto mb-6 ${
            isLight ? 'text-stone-700 font-normal' : 'text-neutral-300 font-light'
          }`}>
            {currentReflection.meaning}
          </p>

          {userName && (
            <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-serif font-bold uppercase tracking-widest mb-4 ${
              isLight 
                ? 'bg-amber-100 border-amber-400 text-amber-900' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              DEDICATED TO: {userName.toUpperCase()}
            </div>
          )}

          <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono font-medium ${
            isLight ? 'border-stone-200 text-stone-600' : 'border-neutral-800 text-neutral-500'
          }`}>
            <span>TERA ( तेरा ) • IT'S YOURS, OWN IT</span>
            <span className={`font-serif font-bold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>1313 FASHION</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDrawNew}
            className={`py-3.5 rounded-xl border text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLight 
                ? 'bg-white border-stone-300 hover:border-amber-600 text-stone-800 hover:bg-stone-50' 
                : 'bg-neutral-950 border-neutral-700 hover:border-amber-400 text-neutral-200'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>DRAW NEXT</span>
          </button>

          <button
            onClick={handleCopyText}
            className={`py-3.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isLight
                ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20 font-extrabold'
                : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY REFLECTION</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
