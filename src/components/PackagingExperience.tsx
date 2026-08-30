import React from 'react';
import { Package, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { packagingBoxImg } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export const PackagingExperience: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <section id="packaging" className={`py-24 border-t transition-colors duration-300 ${
      isLight 
        ? 'bg-[#F4F0E8] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-900 text-neutral-100 border-amber-900/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Unboxing Photo */}
          <div className={`relative rounded-3xl overflow-hidden border p-2 shadow-2xl group transition-colors duration-300 ${
            isLight 
              ? 'border-amber-900/20 bg-white shadow-stone-300/40' 
              : 'border-amber-500/30 bg-neutral-950 shadow-2xl'
          }`}>
            <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isLight ? 'bg-stone-100' : 'bg-neutral-900'}`}>
              <img
                src={packagingBoxImg}
                alt="1313 Luxury Packaging Experience"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-amber-500/30 text-xs font-mono text-amber-300 flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider">COMPLETE UNBOXING EXPERIENCE</span>
                <span className="text-neutral-400">INCLUDED WITH ALL DROP 01 ORDERS</span>
              </div>
            </div>
          </div>

          {/* Right: Unboxing Details */}
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase mb-4 font-bold ${
              isLight 
                ? 'bg-amber-100 border border-amber-400 text-amber-900' 
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}>
              <Package className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
              <span>THE UNBOXING RITUAL</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
              Unbox Your <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>Divine Piece.</span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 ${isLight ? 'text-stone-700 font-normal' : 'text-neutral-300 font-light'}`}>
              We believe a garment rooted in divine grace deserves an unboxing experience that feels like receiving a sacred artifact. Every Drop 1 Tee arrives in custom luxury packaging.
            </p>

            {/* Checklist */}
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors duration-300 ${
                isLight ? 'bg-white border-stone-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`p-2 rounded-lg shrink-0 ${isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/10 text-amber-400'}`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-serif font-bold text-sm ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                    Frosted Translucent Matte Zip-Lock Bag
                  </h4>
                  <p className={`text-xs font-sans mt-0.5 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    High-density frosted translucent pouch featuring metallic bronze gold foil "1313 FASHION • IT'S YOURS, OWN IT." print.
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors duration-300 ${
                isLight ? 'bg-white border-stone-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`p-2 rounded-lg shrink-0 ${isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/10 text-amber-400'}`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-serif font-bold text-sm ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                    Dust-Proof Sealed Reusable Protection
                  </h4>
                  <p className={`text-xs font-sans mt-0.5 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    Airtight zip closure ensuring your fresh garment arrives in pristine studio condition.
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors duration-300 ${
                isLight ? 'bg-white border-stone-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <div className={`p-2 rounded-lg shrink-0 ${isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/10 text-amber-400'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-serif font-bold text-sm ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                    Metallic Bronze Authenticity Hangtag
                  </h4>
                  <p className={`text-xs font-sans mt-0.5 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    Custom 1313 Fashion tag with braided cord string certifying authentic Drop 01 craftsmanship.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
