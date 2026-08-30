import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Key } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

export const VIPClubSection: React.FC = () => {
  const { isLight } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passCreated, setPassCreated] = useState(false);
  const [passNumber, setPassNumber] = useState('');

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const num = `1313-VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    setPassNumber(num);
    setPassCreated(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#d97706', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section id="vip" className={`py-24 border-t relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-[#FAF8F5] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-950 text-neutral-100 border-amber-900/20'
    }`}>
      
      {/* Glow */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none ${
        isLight ? 'bg-amber-400/15' : 'bg-amber-500/10'
      }`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase mb-4 font-bold ${
          isLight 
            ? 'bg-amber-100 border border-amber-400 text-amber-900' 
            : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
        }`}>
          <Key className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
          <span>DROP 02 SECRET ACCESS</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold mb-4">
          Claim Your <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>1313 VIP Pass</span>
        </h2>

        <p className={`text-sm sm:text-base max-w-xl mx-auto mb-12 ${isLight ? 'text-stone-600 font-normal' : 'text-neutral-400 font-light'}`}>
          Join our inner circle for priority access to Drop 02, private showroom previews, and unlisted heavy drop allocations.
        </p>

        {!passCreated ? (
          <form onSubmit={handleCreatePass} className="max-w-md mx-auto space-y-4">
            <div>
              <input
                type="text"
                placeholder="YOUR NAME (OPTIONAL)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl border text-sm font-serif text-center focus:outline-none transition-colors ${
                  isLight 
                    ? 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600 shadow-sm' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400'
                }`}
              />
            </div>

            <div>
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL FOR DROP 2 ACCESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-xl border text-sm font-sans text-center focus:outline-none transition-colors ${
                  isLight 
                    ? 'bg-white border-stone-300 text-stone-900 placeholder:text-stone-400 focus:border-amber-600 shadow-sm' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-amber-400'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-bold text-xs font-mono uppercase tracking-[0.25em] transition-all shadow-xl cursor-pointer hover:brightness-105 ${
                isLight
                  ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 shadow-amber-600/20'
                  : 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-neutral-950 shadow-amber-600/20'
              }`}
            >
              GENERATE VIP MEMBER PASS
            </button>
          </form>
        ) : (
          <div className={`max-w-md mx-auto p-8 rounded-3xl border-2 shadow-2xl relative text-left transition-colors duration-300 ${
            isLight 
              ? 'bg-white border-amber-500 shadow-stone-400/40 text-stone-900' 
              : 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-amber-500/60 shadow-2xl text-neutral-100'
          }`}>
            
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest mb-6">
              <span className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>1313 VIP MEMBER</span>
              </span>
              <span className={isLight ? 'text-stone-500 font-bold' : 'text-neutral-500'}>TERA ( तेरा )</span>
            </div>

            <div className="mb-6">
              <div className={`text-[10px] font-mono uppercase font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>MEMBER NAME</div>
              <div className="font-serif text-2xl font-bold tracking-wide">
                {name ? name.toUpperCase() : 'VIP COLLECTOR'}
              </div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t text-xs font-mono ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
              <div>
                <div className={`text-[9px] font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>PASS NUMBER</div>
                <div className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>{passNumber}</div>
              </div>

              <div className="text-right">
                <div className={`text-[9px] font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>STATUS</div>
                <div className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>PRIORITY DROP 02</div>
              </div>
            </div>

            <p className={`text-[10px] text-center font-mono mt-6 pt-3 border-t ${
              isLight ? 'border-stone-200 text-stone-600' : 'border-neutral-800/80 text-neutral-400'
            }`}>
              Pass linked to {email}. Check inbox for secret Drop 02 invite.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
