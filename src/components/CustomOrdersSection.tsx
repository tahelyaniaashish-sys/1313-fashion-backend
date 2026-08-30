import React, { useState } from 'react';
import { 
  Printer, 
  Building2, 
  GraduationCap, 
  Dumbbell, 
  Music, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Sliders, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import { 
  officialLogoImg,
  corpApparelImg,
  collegeFestImg,
  gymActivewearImg,
  danceAcademyImg,
  coachingUniformImg,
  customBrandImg
} from '../data/products';
import { useTheme } from '../context/ThemeContext';

export const CustomOrdersSection: React.FC = () => {
  const { isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('Corporate');
  const [quantity, setQuantity] = useState<number>(50);
  const [printType, setPrintType] = useState<string>('Screen Printing / Puff');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    organization: '',
    requirements: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { 
      id: 'Corporate', 
      label: 'Corporate & Companies', 
      icon: Building2, 
      desc: 'Executive embroidery, premium collar team polos, tech summit apparel & corporate welcome kits',
      image: corpApparelImg,
      examples: 'Executive Polos, Tech Summit Heavyweight Tees, Annual Event Kits, Staff Uniforms',
      badge: 'B2B & CORPORATE'
    },
    { 
      id: 'Colleges', 
      label: 'Colleges & Universities', 
      icon: GraduationCap, 
      desc: 'Annual cultural & tech fest merchandise, department hoodies, batch apparel & council streetwear',
      image: collegeFestImg,
      examples: 'Annual Fest Tees, Department Oversized Hoodies, Council Batch Apparel, Sports Jerseys',
      badge: 'CAMPUS & FESTS'
    },
    { 
      id: 'Gyms', 
      label: 'Gyms & Fitness Clubs', 
      icon: Dumbbell, 
      desc: 'Heavyweight oversized pump covers, trainer dry-fit tees & premium fitness merchandise',
      image: gymActivewearImg,
      examples: 'Oversized Pump Covers, Trainer Dry-Fit Polos, Athletic Streetwear, Gym Merchandise',
      badge: 'FITNESS & GYMS'
    },
    { 
      id: 'Dance', 
      label: 'Dance & Art Academies', 
      icon: Music, 
      desc: 'Dynamic stage performance tees, crew oversized streetwear & studio training merchandise',
      image: danceAcademyImg,
      examples: 'Dance Crew Oversized Tees, Stage Performance Tops, Studio Hoodies & Merch',
      badge: 'DANCE & ACADEMIES'
    },
    { 
      id: 'Tuition', 
      label: 'Tuition & Coaching Institutes', 
      icon: BookOpen, 
      desc: 'Smart student uniform tees, faculty collar polos & foundation batch identity apparel',
      image: coachingUniformImg,
      examples: 'Smart Uniform Polos, Foundation Batch Tees, Faculty T-Shirts, Institute Merchandise',
      badge: 'INSTITUTE UNIFORMS'
    },
    { 
      id: 'Custom', 
      label: 'Custom Individual & Brands', 
      icon: Sparkles, 
      desc: 'Bespoke metallic gold foil stamping, 3D puff printing, embroidery & private label apparel drops',
      image: customBrandImg,
      examples: 'Private Label Streetwear Drops, Metallic Foil Tees, 3D Puff Print Hoodies, Bespoke Merch',
      badge: 'BESPOKE & LABELS'
    },
  ];

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];

  const printOptions = [
    'Screen Printing / Puff Print',
    '3D Metallic Gold & Bronze Foil',
    'High-Density Embroidery',
    'Full Color HD Graphic DTF'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setSubmitted(true);
  };

  // Rough estimate calculator in INR (₹)
  const unitPriceEstimate = quantity >= 500 ? 280 : quantity >= 200 ? 320 : quantity >= 50 ? 380 : 450;
  const estimatedTotal = unitPriceEstimate * quantity;

  return (
    <section id="custom-orders" className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
      isLight 
        ? 'bg-[#FAF8F5] text-stone-900 border-stone-300/80' 
        : 'bg-neutral-950 text-neutral-100 border-amber-900/30'
    }`}>
      
      {/* Background Subtle Watermarks */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        isLight
          ? 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent opacity-70'
          : 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950 to-neutral-950'
      }`} />
      <div className={`absolute -right-20 top-1/2 -translate-y-1/2 text-[200px] font-serif select-none pointer-events-none font-bold ${
        isLight ? 'text-amber-600/5' : 'text-amber-500/5'
      }`}>
        तेरा
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-4 font-bold ${
            isLight
              ? 'bg-amber-100 border border-amber-400 text-amber-900'
              : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
          }`}>
            <Printer className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>Open for Customization & Bulk Printing</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-4">
            Custom & Corporate <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>Apparel Printing</span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-stone-600 font-normal' : 'text-neutral-400'}`}>
            From colleges, dance academies, and fitness clubs to corporate merch, coaching institutes, and private clothing labels—we deliver premium customized apparel and precision printing tailored to your squad or brand.
          </p>
        </div>

        {/* Target Sectors Grid with High-Contrast Photo Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group flex flex-col justify-between h-48 shadow-md ${
                  isSelected
                    ? (isLight 
                        ? 'border-amber-600 ring-2 ring-amber-500/60 shadow-xl shadow-amber-900/15 scale-[1.02]' 
                        : 'border-amber-400 ring-2 ring-amber-400/60 shadow-2xl shadow-amber-500/20 scale-[1.02]')
                    : (isLight 
                        ? 'border-stone-300/90 hover:border-amber-600/70 hover:scale-[1.01] bg-white' 
                        : 'border-neutral-800 hover:border-amber-500/50 hover:scale-[1.01]')
                }`}
              >
                {/* Background Photo with High-Contrast Bright Illumination */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={cat.image} 
                    alt={cat.label} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-95 filter brightness-105 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
                </div>

                <div className="relative z-10 p-3 flex justify-between items-start">
                  <div className={`p-2 rounded-xl transition-all ${
                    isSelected 
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-400/40 font-bold' 
                      : 'bg-neutral-950/90 text-amber-300 group-hover:bg-amber-500/20 border border-neutral-700/60 backdrop-blur-md'
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-950/90 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full shadow-sm backdrop-blur-md">
                    {cat.badge}
                  </span>
                </div>

                <div className="relative z-10 p-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-100 mb-0.5 line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {cat.label}
                  </h4>
                  <p className="text-[10px] text-neutral-300 line-clamp-2 leading-tight font-light">
                    {cat.desc}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Sector Visual Portfolio Showcase Banner */}
        <div className={`mb-16 p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-xl backdrop-blur-xl transition-colors duration-300 ${
          isLight 
            ? 'bg-white border-amber-900/20 shadow-amber-900/5' 
            : 'bg-neutral-900/95 border-amber-500/40 shadow-2xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sector High-Res Showcase Image with Bright Pop Frame */}
            <div className={`lg:col-span-5 relative rounded-2xl overflow-hidden border-2 aspect-[4/3] group shadow-2xl ${
              isLight 
                ? 'border-amber-600/50 shadow-stone-400/40 bg-stone-100' 
                : 'border-amber-500/40 shadow-amber-950/80 bg-neutral-950'
            }`}>
              <img 
                src={activeCategoryObj.image} 
                alt={`${activeCategoryObj.label} Sample Portfolio`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/20" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neutral-950/90 border border-amber-500/50 backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
                  PRODUCTION SAMPLE SHOWCASE
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-neutral-950/95 border border-amber-500/30 backdrop-blur-md flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                    REAL PRODUCTION FINISH
                  </span>
                  <span className="text-xs font-bold text-neutral-100">{activeCategoryObj.label}</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold border border-amber-500/40">
                  {activeCategoryObj.badge}
                </span>
              </div>
            </div>

            {/* Sector Showcase Text & Capabilities */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest font-bold ${
                isLight 
                  ? 'bg-amber-100 border border-amber-400 text-amber-900' 
                  : 'bg-amber-500/10 border border-amber-500/40 text-amber-300'
              }`}>
                <Tag className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                <span>Custom Apparel Portfolio</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                Tailored Apparel Solutions for <span className={isLight ? 'text-amber-700' : 'text-amber-400'}>{activeCategoryObj.label}</span>
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-stone-700 font-normal' : 'text-neutral-300 font-light'}`}>
                {activeCategoryObj.desc}. Customized with precision screen printing, high-density embroidery, or premium metallic foil tailored to your organization's exact logo and branding specifications.
              </p>

              <div className={`p-4 rounded-2xl border space-y-2 shadow-inner ${
                isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-950 border-neutral-800/90'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono uppercase font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    POPULAR CUSTOM PRODUCT TYPES:
                  </span>
                  <span className={`text-[10px] font-mono font-medium ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>PREMIUM HEAVYWEIGHT 240 GSM</span>
                </div>
                <p className={`text-xs font-semibold leading-relaxed ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
                  {activeCategoryObj.examples}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2 text-[11px] font-mono">
                <div className={`p-3 rounded-xl border text-center transition-colors ${
                  isLight ? 'bg-white border-stone-200 hover:border-amber-500' : 'bg-neutral-950 border-neutral-800 hover:border-amber-500/40'
                }`}>
                  <span className={`font-bold text-xs sm:text-sm block ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>10+ PCS</span>
                  <span className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>MIN ORDER QTY</span>
                </div>
                <div className={`p-3 rounded-xl border text-center transition-colors ${
                  isLight ? 'bg-white border-stone-200 hover:border-amber-500' : 'bg-neutral-950 border-neutral-800 hover:border-amber-500/40'
                }`}>
                  <span className={`font-bold text-xs sm:text-sm block ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>240 GSM</span>
                  <span className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>PREMIUM COTTON</span>
                </div>
                <div className={`p-3 rounded-xl border text-center transition-colors ${
                  isLight ? 'bg-white border-stone-200 hover:border-amber-500' : 'bg-neutral-950 border-neutral-800 hover:border-amber-500/40'
                }`}>
                  <span className={`font-bold text-xs sm:text-sm block ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>3D & FOIL</span>
                  <span className={`text-[10px] ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>PRINT & EMBROIDERY</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Customization Details & Interactive Quote Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Feature Column: Printing Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-md transition-colors duration-300 ${
              isLight ? 'bg-white border-stone-300/80 shadow-stone-200/50' : 'bg-neutral-900/80 border-amber-900/30'
            }`}>
              
              <div className="flex items-center gap-3">
                <img 
                  src={officialLogoImg} 
                  alt="1313 Fashion Logo" 
                  className={`w-12 h-12 object-contain rounded-lg border p-0.5 ${
                    isLight ? 'border-amber-600/40 bg-white shadow-sm' : 'border-amber-500/30 bg-neutral-950'
                  }`} 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-serif font-bold">
                    Why Print With Us?
                  </h3>
                  <p className={`text-xs font-mono font-semibold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    Precision Custom Apparel & Bulk Manufacturing
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { title: 'Custom Fabric & Cuts', desc: 'Choose between premium relaxed streetwear cuts, athletic poly-blends, or customized silhouettes.' },
                  { title: 'Flexible Placement Options', desc: 'Chest left/center, oversized back graphics, sleeve cuffs, hem tags, and custom neck labels.' },
                  { title: 'Advanced Print Technologies', desc: 'High-density screen print, 3D raised puff, metallic bronze/gold foil, and intricate embroidery.' },
                  { title: 'Low MOQ & Fast Turnaround', desc: 'Small batch runs starting at 10 pcs for squads or high-capacity bulk production up to 5,000+ pcs.' },
                  { title: 'Full Design Assistance', desc: 'Our in-house design team helps refine your institute or corporate logo for flawless apparel printing.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-left">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-stone-900' : 'text-neutral-200'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs leading-relaxed mt-0.5 ${isLight ? 'text-stone-600 font-normal' : 'text-neutral-400'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`pt-4 border-t flex items-center justify-between text-xs ${isLight ? 'border-stone-200 text-stone-600' : 'border-neutral-800 text-neutral-400'}`}>
                <span className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                  Quality Assurance Guarantee
                </span>
                <span className="font-mono text-[10px] uppercase">
                  Fast Pan-India & Global Delivery
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Inquiry / Quote Request Builder */}
          <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 relative shadow-lg transition-colors duration-300 ${
            isLight ? 'bg-white border-amber-900/20 shadow-stone-300/40' : 'bg-neutral-900 border-amber-500/30'
          }`}>
            
            <div className={`flex items-center justify-between mb-6 pb-4 border-b ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
              <div>
                <h3 className="text-xl font-serif font-bold flex items-center gap-2">
                  <span>Custom Order Quote Builder</span>
                  <span className={`text-xs font-sans px-2.5 py-0.5 rounded font-bold ${
                    isLight ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-500/20 text-amber-300 font-normal'
                  }`}>
                    {selectedCategory} Sector
                  </span>
                </h3>
                <p className={`text-xs mt-1 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                  Configure your batch requirements for an instant estimate & direct inquiry.
                </p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Print Style Selection */}
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                    Select Preferred Print / Finish Technique
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {printOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setPrintType(opt)}
                        className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                          printType === opt
                            ? (isLight 
                                ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm' 
                                : 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold')
                            : (isLight 
                                ? 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400' 
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700')
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isLight ? 'text-stone-800' : 'text-neutral-300'}`}>
                      <Sliders className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                      Estimated Quantity: <span className={`font-bold font-mono text-sm ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>{quantity} Pieces</span>
                    </label>
                    <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-amber-800' : 'text-amber-400/80'}`}>
                      ~ ₹{unitPriceEstimate} / pc approx.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className={`flex justify-between text-[10px] font-mono mt-1 ${isLight ? 'text-stone-500 font-medium' : 'text-neutral-400'}`}>
                    <span>10 pcs (Squad/Gym)</span>
                    <span>100 pcs (College Fest)</span>
                    <span>500+ pcs (Corporate)</span>
                  </div>
                </div>

                {/* Estimate Banner */}
                <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${
                  isLight 
                    ? 'bg-amber-50/80 border-amber-300' 
                    : 'bg-gradient-to-r from-amber-950/40 via-neutral-950 to-amber-950/20 border-amber-500/30'
                }`}>
                  <div>
                    <div className={`text-[11px] uppercase tracking-widest font-bold ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                      Estimated Project Budget
                    </div>
                    <div className={`text-xl font-bold font-mono ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
                      ₹{estimatedTotal.toLocaleString()} <span className={`text-xs font-sans font-normal ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>({quantity} pcs)</span>
                    </div>
                  </div>
                  <div className={`text-[10px] text-right font-mono font-medium ${isLight ? 'text-amber-900' : 'text-amber-400/80'}`}>
                    Includes Quality Fabric,<br />Printing & Quality Assurance
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aashish Tahelyani"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-amber-600 ${
                        isLight 
                          ? 'bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-400' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                      Email or WhatsApp Contact *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. contact@domain.com or +91..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-amber-600 ${
                        isLight 
                          ? 'bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-400' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                      Institution / Gym / Organization Name
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Rhythm Dance Academy / Titan Gym"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-amber-600 ${
                        isLight 
                          ? 'bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-400' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${isLight ? 'text-stone-700' : 'text-neutral-400'}`}>
                      Custom Notes / Special Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="e.g. Need front logo + back tagline in gold foil"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:border-amber-600 ${
                        isLight 
                          ? 'bg-stone-50 border-stone-300 text-stone-900 placeholder:text-stone-400' 
                          : 'bg-neutral-950 border-neutral-800 text-neutral-100 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit Action & WhatsApp Instant Route */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:brightness-105 text-stone-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Bulk Customization Inquiry</span>
                  </button>

                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    <a
                      href={`https://wa.me/919327098245?text=${encodeURIComponent(`Hi 1313 Fashion! 👋 I am interested in Custom Apparel Printing for ${selectedCategory} (Approx ${quantity} pcs). Requirement: ${printType}. Let's discuss pricing & digital mockups!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-1/2 py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100' : 'bg-emerald-950/40 border-emerald-600/40 text-emerald-200 hover:bg-emerald-900/50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>WhatsApp (+91 93270 98245)</span>
                    </a>

                    <a
                      href="https://www.instagram.com/itz.1313_?igsh=MXkxOHpiaDAwMWg2aA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-1/2 py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isLight ? 'bg-pink-50 border-pink-300 text-pink-950 hover:bg-pink-100' : 'bg-pink-950/40 border-pink-600/40 text-pink-200 hover:bg-pink-900/50'
                      }`}
                    >
                      <span>DM Instagram (@itz.1313_)</span>
                    </a>
                  </div>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className={`w-16 h-16 rounded-full border mx-auto flex items-center justify-center ${
                  isLight ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-serif font-bold">
                  Custom Order Request Received!
                </h4>
                <p className={`text-xs max-w-md mx-auto leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                  Thank you, <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>{formData.name}</span>. Our custom apparel team will review your requirement for <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>{quantity} pcs</span> ({selectedCategory}) and reach out to <span className={isLight ? 'text-amber-800 font-semibold' : 'text-amber-300'}>{formData.contact}</span> within 24 hours with mockups and direct wholesale pricing.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi 1313 Fashion! 👋 I just submitted a custom inquiry for ${formData.name} (${selectedCategory} - ${quantity} pcs). Here are my details: ${formData.organization || ''} ${formData.requirements || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Instant WhatsApp Follow-up
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      isLight 
                        ? 'bg-stone-200 hover:bg-stone-300 text-stone-900 font-bold' 
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                    }`}
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
