import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Package } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_CONFIG } from '../data/products';
import { useTheme } from '../context/ThemeContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const { isLight } = useTheme();
  const [includeGiftBox, setIncludeGiftBox] = useState(true);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const giftBoxFee = includeGiftBox && items.length > 0 ? 0 : 0; // Complimentary luxury packaging
  const freeShippingThreshold = 120;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping + giftBoxFee;

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden backdrop-blur-md ${
      isLight ? 'bg-stone-900/60' : 'bg-neutral-950/80'
    }`}>
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md border-l flex flex-col justify-between shadow-2xl transition-colors duration-300 ${
          isLight 
            ? 'bg-white border-stone-300 text-stone-900 shadow-stone-700/30' 
            : 'bg-neutral-900 border-amber-500/30 text-neutral-100'
        }`}>
          
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'bg-[#F9F7F2] border-stone-200' : 'bg-neutral-950 border-neutral-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border ${
                isLight ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg">
                  YOUR BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
                </h2>
                <p className={`text-[10px] font-mono font-semibold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                  DROP 01 • LUXURY STREETWEAR COLLECTION
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full border cursor-pointer transition-colors ${
                isLight ? 'text-stone-500 hover:text-stone-900 border-stone-300 hover:border-amber-600' : 'text-neutral-400 hover:text-white border-neutral-800 hover:border-amber-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          {items.length > 0 && (
            <div className={`px-6 py-3 border-b text-xs font-mono ${
              isLight ? 'bg-amber-50/60 border-stone-200 text-stone-700' : 'bg-neutral-950/80 border-neutral-800'
            }`}>
              {subtotal >= freeShippingThreshold ? (
                <div className={`font-semibold flex items-center gap-2 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>COMPLIMENTARY EXPRESS SHIPPING UNLOCKED!</span>
                </div>
              ) : (
                <div className={isLight ? 'text-stone-600' : 'text-neutral-400'}>
                  Add <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>{BRAND_CONFIG.currency}{freeShippingThreshold - subtotal}</span> more for Complimentary Express Shipping
                </div>
              )}
            </div>
          )}

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <ShoppingBag className={`w-16 h-16 mb-4 ${isLight ? 'text-stone-300' : 'text-neutral-700'}`} />
                <p className={`font-serif text-lg mb-2 ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>Your bag is empty</p>
                <p className={`text-xs font-mono mb-6 ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>Explore Drop 1 Tees & claim your piece</p>
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-widest cursor-pointer ${
                    isLight 
                      ? 'bg-amber-500 hover:bg-amber-600 text-stone-950' 
                      : 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                  }`}
                >
                  EXPLORE DROP 01
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex gap-4 relative transition-colors ${
                    isLight ? 'bg-[#FAF8F5] border-stone-200 shadow-sm' : 'bg-neutral-950 border-neutral-800'
                  }`}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.selectedColor.frontImage || item.product.frontImage}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className={`w-20 h-24 object-cover object-center rounded-lg border shrink-0 ${
                      isLight ? 'bg-white border-stone-200' : 'bg-neutral-900 border-neutral-800'
                    }`}
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className={`font-serif font-bold text-sm ${isLight ? 'text-stone-900' : 'text-neutral-100'}`}>
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className={`p-1 cursor-pointer transition-colors ${isLight ? 'text-stone-400 hover:text-red-600' : 'text-neutral-500 hover:text-red-400'}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className={`text-[11px] font-mono space-y-0.5 mt-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                        <div>COLOR: <span className={isLight ? 'text-stone-900 font-medium' : 'text-neutral-200'}>{item.selectedColor.name}</span></div>
                        <div>SIZE: <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>{item.selectedSize}</span></div>
                        {item.placementOption && (
                          <div className={isLight ? 'text-amber-800 font-medium' : 'text-amber-400/80'}>{item.placementOption}</div>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className={`flex items-center gap-2 border rounded-lg p-1 ${
                        isLight ? 'bg-white border-stone-300' : 'bg-neutral-900 border-neutral-800'
                      }`}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className={`p-1 cursor-pointer ${isLight ? 'hover:text-amber-800 text-stone-700' : 'hover:text-amber-400 text-neutral-300'}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs px-2 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className={`p-1 cursor-pointer ${isLight ? 'hover:text-amber-800 text-stone-700' : 'hover:text-amber-400 text-neutral-300'}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className={`font-mono font-bold text-sm ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                        {BRAND_CONFIG.currency}{item.product.price * item.quantity}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className={`p-6 border-t space-y-4 ${
              isLight ? 'bg-[#F9F7F2] border-stone-200' : 'bg-neutral-950 border-neutral-800'
            }`}>
              
              {/* Luxury Packaging Option */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                isLight ? 'bg-white border-stone-300' : 'bg-neutral-900 border-amber-500/20'
              }`}>
                <div className="flex items-center gap-2">
                  <Package className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                  <span className={`font-mono font-medium ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>1313 Collector's Packaging Box</span>
                </div>
                <span className={`font-bold font-mono ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>FREE</span>
              </div>

              {/* Subtotal */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className={`flex justify-between ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                  <span>SUBTOTAL</span>
                  <span>{BRAND_CONFIG.currency}{subtotal}</span>
                </div>
                <div className={`flex justify-between ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                  <span>EXPRESS SHIPPING</span>
                  <span>{shipping === 0 ? 'FREE' : `${BRAND_CONFIG.currency}${shipping}`}</span>
                </div>
                <div className={`flex justify-between text-sm font-bold pt-2 border-t ${
                  isLight ? 'border-stone-300 text-stone-900' : 'border-neutral-800 text-neutral-100'
                }`}>
                  <span>ESTIMATED TOTAL</span>
                  <span className={isLight ? 'text-amber-800 font-extrabold' : 'text-amber-400'}>{BRAND_CONFIG.currency}{total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className={`w-full py-4 rounded-xl font-bold text-xs font-mono uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-amber-500/20 font-extrabold'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/20'
                }`}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
