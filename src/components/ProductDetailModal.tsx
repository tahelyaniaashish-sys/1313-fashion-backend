import React, { useState } from 'react';
import { X, ShoppingBag, RefreshCw, Sparkles, Ruler } from 'lucide-react';
import { Product, Colorway } from '../types';
import { BRAND_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

interface ProductDetailModalProps {
  product: Product | null;
  initialColor?: Colorway;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColor: Colorway,
    selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    placementOption?: string,
    taglineStyle?: number
  ) => void;
  onBuyNow?: (
    product: Product,
    selectedColor: Colorway,
    selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    placementOption?: string,
    taglineStyle?: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialColor,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const { isLight } = useTheme();

  const [selectedColor, setSelectedColor] = useState<Colorway>(
    initialColor || product.colorways[0]
  );
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('L');
  const [viewAngle, setViewAngle] = useState<'front' | 'back'>('back');
  const [placementOption, setPlacementOption] = useState<string>('Option A (Left Chest)');
  const [taglineStyle, setTaglineStyle] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'story' | 'fit'>('specs');

  // Fit Calculator State
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightKg, setWeightKg] = useState<number>(75);

  const calculateRecommendedSize = (): 'S' | 'M' | 'L' | 'XL' | 'XXL' => {
    if (heightCm < 170 && weightKg < 65) return 'S';
    if (heightCm < 175 && weightKg < 73) return 'M';
    if (heightCm < 183 && weightKg < 85) return 'L';
    if (heightCm < 190 && weightKg < 98) return 'XL';
    return 'XXL';
  };

  const recommendedSize = calculateRecommendedSize();

  const handleAdd = () => {
    onAddToCart(
      product,
      selectedColor,
      selectedSize,
      product.hasPlacementOptions ? placementOption : undefined,
      product.hasTaglineStyles ? taglineStyle : undefined
    );
  };

  const handleBuyNowClick = () => {
    if (onBuyNow) {
      onBuyNow(
        product,
        selectedColor,
        selectedSize,
        product.hasPlacementOptions ? placementOption : undefined,
        product.hasTaglineStyles ? taglineStyle : undefined
      );
    } else {
      handleAdd();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 backdrop-blur-md overflow-y-auto ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/85'
    }`}>
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-5xl my-8 border rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row transition-colors duration-300 ${
        isLight 
          ? 'bg-white border-stone-300 text-stone-900 shadow-stone-800/20' 
          : 'bg-neutral-900 border-amber-500/30 text-neutral-100 shadow-2xl'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-30 p-2.5 rounded-full border transition-all cursor-pointer ${
            isLight 
              ? 'bg-stone-100 text-stone-600 hover:text-stone-950 border-stone-300 hover:border-amber-600' 
              : 'bg-neutral-950/80 text-neutral-400 hover:text-white border-neutral-700 hover:border-amber-400'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visualizer */}
        <div className={`lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative border-b lg:border-b-0 lg:border-r ${
          isLight 
            ? 'bg-[#F9F7F2] border-stone-200' 
            : 'bg-neutral-950 border-neutral-800'
        }`}>
          
          {/* Top Controls */}
          <div className="flex items-center justify-between mb-4 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              isLight 
                ? 'bg-amber-100 border border-amber-400 text-amber-900' 
                : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
            }`}>
              DROP 01 STREETWEAR
            </span>

            <button
              onClick={() => setViewAngle(viewAngle === 'front' ? 'back' : 'front')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                isLight 
                  ? 'bg-white border-stone-300 hover:border-amber-600 text-stone-800 shadow-sm' 
                  : 'bg-neutral-900 border-neutral-700 hover:border-amber-400 text-neutral-200'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
              <span>TOGGLE: {viewAngle.toUpperCase()}</span>
            </button>
          </div>

          {/* Product Image */}
          <div className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden border my-4 shadow-inner ${
            isLight ? 'bg-stone-100 border-stone-200' : 'bg-neutral-900 border-neutral-800'
          }`}>
            <img
              src={product.frontImage}
              alt={`${product.title} ${viewAngle}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            
            {/* View Angle Banner */}
            <div className={`absolute bottom-4 left-4 right-4 px-4 py-2 rounded-xl backdrop-blur-md border text-xs font-mono flex items-center justify-between ${
              isLight 
                ? 'bg-white/90 border-stone-300 text-stone-800 shadow-sm' 
                : 'bg-neutral-950/85 border-neutral-800 text-neutral-300'
            }`}>
              <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>VIEWING: {viewAngle.toUpperCase()}</span>
              <span className="truncate max-w-[200px]">{viewAngle === 'front' ? product.frontDetailsText : product.backDetailsText}</span>
            </div>
          </div>

          {/* Color Switcher */}
          <div className="flex items-center justify-between pt-2">
            <span className={`text-xs font-mono font-bold ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              SELECT COLORWAY:
            </span>
            <div className="flex items-center gap-2">
              {product.colorways.map((cw) => (
                <button
                  key={cw.name}
                  onClick={() => setSelectedColor(cw)}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer flex items-center gap-2 font-medium ${
                    selectedColor.name === cw.name
                      ? (isLight 
                          ? 'border-amber-600 bg-amber-100 text-amber-900 font-bold shadow-sm' 
                          : 'border-amber-400 bg-amber-500/10 text-amber-300')
                      : (isLight 
                          ? 'border-stone-300 text-stone-600 hover:text-stone-900 bg-white' 
                          : 'border-neutral-800 text-neutral-400 hover:text-neutral-200')
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-stone-400/50"
                    style={{ backgroundColor: cw.hex }}
                  />
                  <span>{cw.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Configuration & Specs */}
        <div className={`lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between ${
          isLight ? 'bg-white' : 'bg-neutral-900'
        }`}>
          
          <div>
            {/* Header */}
            <div className="mb-4">
              <div className={`flex items-center gap-2 text-xs font-mono mb-1 font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                <span>{BRAND_CONFIG.origin}</span>
                <span>•</span>
                <span>{product.badge || 'DROP 01'}</span>
              </div>
              <h2 className="font-serif text-3xl font-extrabold">
                {product.title}
              </h2>
              <p className={`font-mono text-2xl font-bold mt-1 ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                {BRAND_CONFIG.currency}{product.price}
              </p>
            </div>

            {/* Ethos Quote Pill */}
            <div className={`p-3.5 rounded-xl border text-xs font-serif italic mb-6 leading-relaxed ${
              isLight 
                ? 'bg-amber-50/80 border-amber-200 text-amber-950' 
                : 'bg-neutral-950 border-amber-500/20 text-amber-200'
            }`}>
              "{product.ethosQuote}"
            </div>

            {/* Special Option: Front Logo Placement for Unseen Force Tee */}
            {product.hasPlacementOptions && (
              <div className={`mb-6 p-4 rounded-xl border ${
                isLight ? 'bg-[#FAF8F5] border-stone-200' : 'bg-neutral-950 border-neutral-800'
              }`}>
                <span className={`text-xs font-mono uppercase tracking-widest block mb-2 font-bold ${
                  isLight ? 'text-amber-900' : 'text-amber-400'
                }`}>
                  CHEST LOGO PLACEMENT OPTION:
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Option A (Left Chest)', 'Option B (Center)', 'Option C (Upper Minimal)'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPlacementOption(opt)}
                      className={`p-2 rounded-lg border font-mono text-[11px] text-center transition-all cursor-pointer font-medium ${
                        placementOption === opt
                          ? (isLight 
                              ? 'border-amber-600 bg-amber-100 text-amber-950 font-bold' 
                              : 'border-amber-400 bg-amber-500/10 text-amber-300')
                          : (isLight 
                              ? 'border-stone-300 bg-white text-stone-600 hover:text-stone-900' 
                              : 'border-neutral-800 text-neutral-400 hover:text-neutral-200')
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Picker */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-stone-700' : 'text-neutral-300'
                }`}>
                  SELECT OVERSIZED SIZE:
                </span>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`text-[11px] font-mono hover:underline flex items-center gap-1 cursor-pointer font-bold ${
                    isLight ? 'text-amber-800' : 'text-amber-400'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>FIT CALCULATOR</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-xl border font-mono font-bold text-sm transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedSize === sz
                        ? (isLight
                            ? 'border-amber-600 bg-amber-500 text-stone-950 shadow-md font-extrabold'
                            : 'border-amber-400 bg-amber-500 text-neutral-950 shadow-lg')
                        : (isLight
                            ? 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-amber-500 hover:bg-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700')
                    }`}
                  >
                    <span>{sz}</span>
                    {recommendedSize === sz && (
                      <span className="text-[9px] uppercase tracking-tighter opacity-90 font-sans font-bold">FIT</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Tabs: Specs / Story / Fit Calculator */}
            <div className="mb-6">
              <div className={`flex border-b text-xs font-mono uppercase mb-4 ${
                isLight ? 'border-stone-200' : 'border-neutral-800'
              }`}>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-2 px-4 border-b-2 transition-all cursor-pointer font-bold ${
                    activeTab === 'specs'
                      ? (isLight ? 'border-amber-700 text-amber-900' : 'border-amber-400 text-amber-300')
                      : (isLight ? 'border-transparent text-stone-500 hover:text-stone-900' : 'border-transparent text-neutral-400 hover:text-neutral-200')
                  }`}
                >
                  FABRIC SPECS
                </button>
                <button
                  onClick={() => setActiveTab('story')}
                  className={`py-2 px-4 border-b-2 transition-all cursor-pointer font-bold ${
                    activeTab === 'story'
                      ? (isLight ? 'border-amber-700 text-amber-900' : 'border-amber-400 text-amber-300')
                      : (isLight ? 'border-transparent text-stone-500 hover:text-stone-900' : 'border-transparent text-neutral-400 hover:text-neutral-200')
                  }`}
                >
                  PRODUCT STORY
                </button>
                <button
                  onClick={() => setActiveTab('fit')}
                  className={`py-2 px-4 border-b-2 transition-all cursor-pointer font-bold ${
                    activeTab === 'fit'
                      ? (isLight ? 'border-amber-700 text-amber-900' : 'border-amber-400 text-amber-300')
                      : (isLight ? 'border-transparent text-stone-500 hover:text-stone-900' : 'border-transparent text-neutral-400 hover:text-neutral-200')
                  }`}
                >
                  FIT CALCULATOR
                </button>
              </div>

              {activeTab === 'specs' && (
                <div className={`space-y-2 text-xs font-sans ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-stone-200' : 'border-neutral-800/60'}`}>
                    <span className={`font-mono ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-500'}`}>WEIGHT:</span>
                    <span className="font-semibold">Signature Structured Cotton</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-stone-200' : 'border-neutral-800/60'}`}>
                    <span className={`font-mono ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-500'}`}>COMPOSITION:</span>
                    <span className="font-semibold">{product.fabric}</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-stone-200' : 'border-neutral-800/60'}`}>
                    <span className={`font-mono ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-500'}`}>CUT:</span>
                    <span className="font-semibold">{product.silhouette}</span>
                  </div>
                  <div className={`flex justify-between py-1.5 border-b ${isLight ? 'border-stone-200' : 'border-neutral-800/60'}`}>
                    <span className={`font-mono ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-500'}`}>PRINT TECH:</span>
                    <span className={`font-semibold ${isLight ? 'text-amber-800 font-bold' : 'text-amber-300'}`}>{product.printDetails.front}</span>
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className={`space-y-2 text-xs font-sans leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {product.story.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              )}

              {activeTab === 'fit' && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isLight ? 'bg-[#FAF8F5] border-stone-200 text-stone-800' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                }`}>
                  <div className={`text-xs font-mono font-bold ${isLight ? 'text-stone-800' : 'text-neutral-300'}`}>
                    INTERACTIVE STREETWEAR FIT CALCULATOR:
                  </div>

                  {/* Height Slider */}
                  <div>
                    <div className={`flex justify-between text-xs font-mono mb-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                      <span>HEIGHT: {heightCm} cm</span>
                      <span>{(heightCm / 30.48).toFixed(1)} ft</span>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="205"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Weight Slider */}
                  <div>
                    <div className={`flex justify-between text-xs font-mono mb-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                      <span>WEIGHT: {weightKg} kg</span>
                      <span>{Math.round(weightKg * 2.205)} lbs</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="120"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                    isLight 
                      ? 'bg-amber-100/70 border-amber-300 text-amber-950' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}>
                    <span className="font-semibold">RECOMMENDED SIZE:</span>
                    <span className="font-bold font-mono text-lg">{recommendedSize} (Oversized Fit)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`pt-4 border-t space-y-2 ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl border font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isLight 
                    ? 'bg-stone-100 border-amber-600 text-stone-900 hover:bg-stone-200' 
                    : 'bg-neutral-900 border-amber-500/50 hover:border-amber-400 text-amber-300'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </button>

              <button
                onClick={handleBuyNowClick}
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>BUY NOW ({BRAND_CONFIG.currency}{product.price})</span>
              </button>
            </div>
            <p className={`text-[10px] text-center font-mono mt-1 uppercase ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
              Free Express Air Shipping & Reusable Frosted Zipper Bag Included
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
