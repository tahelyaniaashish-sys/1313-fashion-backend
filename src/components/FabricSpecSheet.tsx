import React from 'react';
import { Shield, Sparkles, Cpu, Layers, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const FabricSpecSheet: React.FC = () => {
  const { isLight } = useTheme();

  const specs = [
    {
      title: "Signature Combed Cotton",
      desc: "Thick, structured ring-spun cotton that holds a clean boxy drape without clinging.",
      icon: Layers,
    },
    {
      title: "Dropped Shoulder Cut",
      desc: "Custom streetwear proportions with relaxed armholes and a loose lower body drape.",
      icon: Cpu,
    },
    {
      title: "3D Metallic Bronze Threading",
      desc: "High-density raised metallic embroidery and archival screenprints resistant to cracking.",
      icon: Sparkles,
    },
    {
      title: "Pre-Shrunk Bio-Washed",
      desc: "Zero post-wash shrinkage. Pre-treated with bio-enzymes for extreme softness against skin.",
      icon: Shield,
    },
  ];

  return (
    <section id="fabric" className={`py-24 border-t transition-colors duration-300 ${
      isLight 
        ? 'bg-[#FAF8F5] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-950 text-neutral-100 border-amber-900/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase mb-3 font-bold ${
            isLight 
              ? 'bg-amber-100 border border-amber-400 text-amber-900' 
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}>
            <span>CRAFTSMANSHIP & SPECIFICATIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold mb-4">
            Built Heavy. Built <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>Divine.</span>
          </h2>
          <p className={`text-sm sm:text-base ${isLight ? 'text-stone-600 font-normal' : 'text-neutral-400 font-light'}`}>
            Every 1313 Tee is engineered from the yarn up to deliver an authentic high-end streetwear silhouette.
          </p>
        </div>

        {/* 4 Technical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                  isLight 
                    ? 'bg-white border-stone-200 hover:border-amber-500' 
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border ${
                    isLight 
                      ? 'bg-amber-100 border-amber-400 text-amber-900' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-serif text-lg font-bold mb-2 ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-sans ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-3 border-t flex items-center gap-2 text-[10px] font-mono font-bold ${
                  isLight ? 'border-stone-200 text-amber-800' : 'border-neutral-800/80 text-amber-400/80'
                }`}>
                  <CheckCircle className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                  <span>1313 CERTIFIED SPEC</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
