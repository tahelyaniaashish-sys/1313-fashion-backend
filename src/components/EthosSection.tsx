import React, { useState } from 'react';
import { Sparkles, Feather, ShieldCheck, Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface EthosSectionProps {
  onOpenWisdom: () => void;
}

export const EthosSection: React.FC<EthosSectionProps> = ({ onOpenWisdom }) => {
  const { isLight } = useTheme();
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "1. Tera ( तेरा ) — 'Yours'",
      sub: "Divine Grace & Origin",
      icon: Feather,
      quote: "In ancient spiritual lore, repeating 'Tera' (13) is an act of total surrender: recognizing that all strength, vision, and life come from divine grace.",
      body: "When you wear 1313, you carry the consciousness that your talents and blessings are gifts. You do not boast; you walk with grounded reverence."
    },
    {
      title: "2. The Unseen Force",
      sub: "Energy Driven Beyond Sight",
      icon: Sparkles,
      quote: "What holds you together in your darkest moments isn't visible to the world. It is the unseen energy that sustains every heartbeat.",
      body: "Our artwork, from the golden submerged fish to the radiant celestial hands, mirrors this unseen force. You are far more than what they see."
    },
    {
      title: "3. 'It's Yours, Own It !'",
      sub: "Unapologetic Purpose",
      icon: ShieldCheck,
      quote: "Your path was assigned specifically to you. Stand tall, wear your purpose, and own every single step.",
      body: "Drop 01 is designed with a structured streetwear drape that gives presence to your posture. It isn't just clothing—it is armor for your purpose."
    }
  ];

  return (
    <section id="ethos" className={`py-24 border-t relative overflow-hidden transition-colors duration-300 ${
      isLight 
        ? 'bg-[#F7F3EB] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-950 text-neutral-100 border-amber-900/20'
    }`}>
      
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none ${
        isLight ? 'bg-amber-400/10' : 'bg-amber-500/5'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs tracking-widest uppercase mb-4 font-bold ${
            isLight 
              ? 'bg-amber-100 border border-amber-400 text-amber-900' 
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>THE SPIRITUAL ETHOS</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6">
            The Story Behind <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>1313</span>
          </h2>
          
          <p className={`text-base sm:text-lg leading-relaxed ${isLight ? 'text-stone-700 font-normal' : 'text-neutral-300 font-light'}`}>
            Derived from 'Tera' ( तेरा ), 1313 is a reminder that everything you are given in this life is driven by an unseen force—a divine grace.
          </p>
        </div>

        {/* Feature Quote Card */}
        <div className={`mb-16 p-8 sm:p-12 rounded-2xl border shadow-xl relative transition-colors duration-300 ${
          isLight 
            ? 'bg-white border-amber-900/20 shadow-amber-900/5' 
            : 'bg-gradient-to-b from-neutral-900/90 to-neutral-950 border-amber-500/30 shadow-2xl'
        }`}>
          <Quote className={`w-12 h-12 absolute top-6 right-6 ${isLight ? 'text-amber-600/15' : 'text-amber-500/20'}`} />
          <div className="max-w-3xl">
            <span className={`text-xs font-mono uppercase tracking-widest block mb-2 font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
              BRAND PHILOSOPHY
            </span>
            <blockquote className={`font-serif text-xl sm:text-3xl italic leading-snug mb-6 ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
              "Everything you are given in this life is driven by an unseen force—a divine grace. IT'S YOURS, OWN IT !"
            </blockquote>
            <div className={`flex items-center gap-4 text-xs font-mono ${isLight ? 'text-stone-600 font-medium' : 'text-neutral-400'}`}>
              <span className={`font-bold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>1313 FASHION</span>
              <span>•</span>
              <span>Luxury Streetwear Apparel</span>
              <span>•</span>
              <span className={`font-serif font-bold ${isLight ? 'text-amber-800' : 'text-amber-400/90'}`}>तेरा</span>
            </div>
          </div>
        </div>

        {/* Interactive 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activePillar === index;
            return (
              <div
                key={index}
                onClick={() => setActivePillar(index)}
                className={`p-6 sm:p-8 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isActive
                    ? (isLight 
                        ? 'bg-white border-amber-600 ring-2 ring-amber-400/50 shadow-xl' 
                        : 'bg-neutral-900 border-amber-500/60 shadow-xl shadow-amber-950/40')
                    : (isLight 
                        ? 'bg-white/80 border-stone-200 hover:border-amber-400 hover:bg-white shadow-sm' 
                        : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/70')
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 border ${
                    isLight 
                      ? 'bg-amber-100 border-amber-400 text-amber-900' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className={`font-serif text-xl font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                    {pillar.title}
                  </h3>
                  
                  <span className={`text-xs font-mono tracking-wider block mb-4 uppercase font-semibold ${isLight ? 'text-amber-800' : 'text-amber-400/80'}`}>
                    {pillar.sub}
                  </span>

                  <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-stone-700 font-normal' : 'text-neutral-300'}`}>
                    {pillar.body}
                  </p>
                </div>

                <div className={`pt-4 border-t text-xs italic font-serif ${isLight ? 'border-stone-200 text-stone-600' : 'border-neutral-800 text-neutral-400'}`}>
                  "{pillar.quote}"
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Reflection Callout CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenWisdom}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-md cursor-pointer group ${
              isLight 
                ? 'bg-white border-2 border-amber-600 hover:bg-amber-50 text-amber-900 hover:border-amber-700' 
                : 'bg-gradient-to-r from-neutral-900 via-amber-950/80 to-neutral-900 border border-amber-500/40 hover:border-amber-400 text-amber-300'
            }`}
          >
            <Sparkles className={`w-4 h-4 group-hover:rotate-12 transition-transform ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>Draw a 1313 Reflection Card</span>
          </button>
        </div>

      </div>
    </section>
  );
};
