import React, { useState } from 'react';
import { Eye, ShoppingBag, RefreshCw, Check, Layers } from 'lucide-react';
import { Product, Colorway } from '../types';
import { PRODUCTS, BRAND_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

interface ProductCatalogProps {
  onSelectProduct: (product: Product, initialColor?: Colorway) => void;
  onQuickAdd: (product: Product, color: Colorway, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onQuickAdd,
}) => {
  const { isLight } = useTheme();

  // Track selected color per product ID
  const [selectedColors, setSelectedColors] = useState<{ [key: string]: Colorway }>({
    'legacy-tee': PRODUCTS[0].colorways[0],
    'look-again-tee': PRODUCTS[1].colorways[0],
    'unseen-force-tee': PRODUCTS[2].colorways[0],
  });

  // Track front vs back view toggle per product ID
  const [viewModes, setViewModes] = useState<{ [key: string]: 'front' | 'back' }>({
    'legacy-tee': 'front',
    'look-again-tee': 'back',
    'unseen-force-tee': 'back',
  });

  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleColorChange = (productId: string, color: Colorway) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleToggleView = (productId: string) => {
    setViewModes((prev) => ({
      ...prev,
      [productId]: prev[productId] === 'front' ? 'back' : 'front',
    }));
  };

  const handleQuickAddClick = (product: Product) => {
    const color = selectedColors[product.id] || product.colorways[0];
    onQuickAdd(product, color, 'L'); // Default to L (Oversized)
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <section id="catalog" className={`py-24 border-t transition-colors duration-300 ${
      isLight 
        ? 'bg-[#F4F0E8] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-900 text-neutral-100 border-amber-900/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-3 font-semibold ${
              isLight 
                ? 'bg-amber-100 border border-amber-400 text-amber-900' 
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              <span>COLLECTION DROP 01</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight">
              The Signature <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>Streetwear Tees</span>
            </h2>
            <p className={`text-sm sm:text-base font-normal mt-2 max-w-xl ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              Signature Oversized Dropped Shoulder Streetwear Tees • Premium Hand-Finished Details
            </p>
          </div>

          <div className={`flex items-center gap-4 text-xs font-mono px-4 py-2.5 rounded-xl border shadow-sm ${
            isLight 
              ? 'bg-white text-stone-700 border-stone-300' 
              : 'bg-neutral-950 text-neutral-400 border-neutral-800'
          }`}>
            <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>DROP 01</span>
            <span>•</span>
            <span>LIMITED INVENTORY</span>
            <span>•</span>
            <span className={isLight ? 'text-emerald-700 font-bold' : 'text-emerald-400'}>AVAILABLE NOW</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const currentColor = selectedColors[product.id] || product.colorways[0];
            const currentView = viewModes[product.id] || 'back';
            const isFront = currentView === 'front';

            return (
              <div
                key={product.id}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl ${
                  isLight 
                    ? 'bg-white border-stone-300/80 hover:border-amber-600/60 text-stone-900 shadow-stone-300/30' 
                    : 'bg-neutral-950 border-neutral-800 hover:border-amber-500/40 text-neutral-100 shadow-xl'
                }`}
              >
                {/* Image Container with View Switcher */}
                <div className={`relative aspect-[3/4] overflow-hidden ${isLight ? 'bg-stone-100' : 'bg-neutral-900'}`}>
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md shadow-sm font-bold ${
                      isLight 
                        ? 'bg-white/95 border border-amber-600/40 text-amber-900' 
                        : 'bg-neutral-950/80 border border-amber-500/40 text-amber-300'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Drop Badge Tag */}
                  <div className={`absolute top-4 right-4 z-20 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wider shadow-sm ${
                    isLight ? 'bg-amber-600 text-white' : 'bg-amber-500/90 text-neutral-950'
                  }`}>
                    DROP 01
                  </div>

                  {/* Main Product Image */}
                  <img
                    src={isFront ? (currentColor.frontImage || product.frontImage) : (currentColor.backImage || product.backImage)}
                    alt={`${product.title} ${currentColor.name} ${currentView}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer filter contrast-105"
                    onClick={() => onSelectProduct(product, currentColor)}
                  />

                  {/* Front/Back View Toggle Button Overlay */}
                  <button
                    onClick={() => handleToggleView(product.id)}
                    className={`absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-md font-bold ${
                      isLight 
                        ? 'bg-white/95 border border-stone-300 hover:border-amber-600 text-stone-900' 
                        : 'bg-neutral-950/90 border border-neutral-700 hover:border-amber-400 text-neutral-200'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                    <span>VIEW: {isFront ? 'FRONT' : 'BACK PRINT'}</span>
                  </button>
                </div>

                {/* Product Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Colorway Pill Selector */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-[11px] font-mono uppercase mr-1 ${isLight ? 'text-stone-500 font-bold' : 'text-neutral-500'}`}>
                        COLOR:
                      </span>
                      {product.colorways.map((cw) => (
                        <button
                          key={cw.name}
                          onClick={() => handleColorChange(product.id, cw)}
                          title={cw.name}
                          className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                            currentColor.name === cw.name
                              ? (isLight 
                                  ? 'border-amber-600 scale-125 ring-2 ring-amber-400/50 shadow-md' 
                                  : 'border-amber-400 scale-125 shadow-md shadow-amber-500/20')
                              : (isLight ? 'border-stone-300 opacity-70 hover:opacity-100' : 'border-neutral-700 opacity-60 hover:opacity-100')
                          }`}
                          style={{ backgroundColor: cw.hex }}
                        />
                      ))}
                      <span className={`text-xs font-semibold ml-1 ${isLight ? 'text-stone-800' : 'text-neutral-300'}`}>
                        {currentColor.name}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 
                      onClick={() => onSelectProduct(product, currentColor)}
                      className={`font-serif text-2xl font-bold transition-colors cursor-pointer mb-1 ${
                        isLight ? 'text-stone-950 group-hover:text-amber-800' : 'text-neutral-100 group-hover:text-amber-300'
                      }`}
                    >
                      {product.title}
                    </h3>
                    
                    <p className={`text-xs font-mono mb-3 ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-400'}`}>
                      {product.subtitle}
                    </p>

                    {/* Ethos Quote */}
                    <div className={`p-3 rounded-xl border mb-3 text-xs font-serif italic flex items-center justify-between ${
                      isLight 
                        ? 'bg-[#FAF7F0] border-amber-900/10 text-amber-900 font-medium' 
                        : 'bg-neutral-900/80 border-neutral-800 text-amber-200/90'
                    }`}>
                      <span>"{product.ethosQuote}"</span>
                      <span className={`text-[10px] font-mono font-bold not-italic px-2 py-0.5 rounded border ${
                        isLight 
                          ? 'text-amber-900 bg-amber-100 border-amber-300' 
                          : 'text-amber-500/80 bg-amber-500/10 border-amber-500/20'
                      }`}>
                        {product.fabric.split(' ')[0]} {product.fabric.split(' ')[1]}
                      </span>
                    </div>

                    {/* Complete Tee Meaning Description */}
                    <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-stone-700 font-normal' : 'text-neutral-300 font-light'}`}>
                      {product.meaning}
                    </p>

                    {/* Front & Back Print Summary Pills */}
                    <div className={`p-3 rounded-xl border mb-6 space-y-1.5 text-[11px] ${
                      isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-900 border-neutral-800/80'
                    }`}>
                      <div className="flex items-start gap-1.5">
                        <span className={`font-mono font-bold shrink-0 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>FRONT:</span>
                        <span className={`font-light line-clamp-1 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>{product.frontDetailsText}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className={`font-mono font-bold shrink-0 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>BACK:</span>
                        <span className={`font-light line-clamp-1 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>{product.backDetailsText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className={`pt-4 border-t ${isLight ? 'border-stone-200' : 'border-neutral-800/80'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-mono uppercase font-bold ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>PRICE</span>
                        <span className={`font-mono text-xl font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
                          {BRAND_CONFIG.currency}{product.price}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-medium ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                        Size S – XXL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onSelectProduct(product, currentColor)}
                        className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isLight 
                            ? 'bg-stone-100 border-stone-300 hover:border-amber-600 text-stone-900 hover:bg-stone-200' 
                            : 'bg-neutral-900 border-neutral-700 hover:border-amber-500/50 text-neutral-200'
                        }`}
                      >
                        <Eye className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                        <span>CONFIGURE</span>
                      </button>

                      <button
                        onClick={() => handleQuickAddClick(product)}
                        className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          addedProductId === product.id
                            ? 'bg-emerald-600 text-white'
                            : (isLight 
                                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 hover:brightness-105 shadow-md shadow-amber-600/20' 
                                : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20')
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>ADDED!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>ADD TO BAG</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
