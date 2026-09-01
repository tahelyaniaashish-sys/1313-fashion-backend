import { Product, WisdomReflection, StoreConfig } from '../types';

import heroBg from '../assets/images/hero_ethereal_bg_1786551336453.jpg';
import officialLogoImg from '../assets/images/official_1313_logo_exact_1786607417883.jpg';
import legacyBlackFrontNewImg from '../assets/images/legacy_black_front_new.png';
import legacyBlackBackNewImg from '../assets/images/legacy_black_back_new.png';
import legacyWhiteFrontNewImg from '../assets/images/legacy_white_front_new.png';
import legacyWhiteBackNewImg from '../assets/images/legacy_white_back_new.png';
import lookAgainFrontNewImg from '../assets/images/look_again_front_new.png';
import lookAgainBackNewImg from '../assets/images/look_again_back_new.png';
import lookAgainGalleryImg from '../assets/images/look_again_gallery_new.png';
import unseenForceFrontNewImg from '../assets/images/unseen_force_front_new.png';
import unseenForceBackNewImg from '../assets/images/unseen_force_back_new.png';
import unseenForceGalleryImg from '../assets/images/unseen_force_gallery_new.png';
import packagingBoxImg from '../assets/images/actual_frosted_packaging_1786607444303.jpg';

export { heroBg, packagingBoxImg, officialLogoImg };

// Custom & Corporate Apparel Category Portfolio Showcase Images (Vibrant High-Contrast Studio Shots)
import corpApparelImg from '../assets/images/corporate_1313_apparel_1787027700723.jpg';
import collegeFestImg from '../assets/images/college_1313_fest_1787027713203.jpg';
import gymActivewearImg from '../assets/images/gym_1313_activewear_1787027725219.jpg';
import danceAcademyImg from '../assets/images/dance_1313_crew_1787027739862.jpg';
import coachingUniformImg from '../assets/images/coaching_1313_uniform_1787027755016.jpg';
import customBrandImg from '../assets/images/custom_1313_bespoke_1787027765341.jpg';

export {
  corpApparelImg,
  collegeFestImg,
  gymActivewearImg,
  danceAcademyImg,
  coachingUniformImg,
  customBrandImg
};

export const BRAND_CONFIG = {
  name: "1313 FASHION",
  tagline: "IT'S YOURS, OWN IT !",
  origin: "Derived from 'Tera' (तेरा)",
  ethosShort: "A reminder that everything you are given in this life is driven by an unseen force—a divine grace.",
  ethosFull: "1313 is born from the word 'Tera' (तेरा), meaning 'Yours'. In ancient spiritual tradition, repeating 'Tera' is a profound surrender: acknowledging that no accomplishment, breath, or gift is solely ours. It is all driven by an unseen force, a divine grace. Our luxury streetwear and expanding fashion collections carry this quiet power.",
  currency: "₹",
  fit: "Signature Oversized Streetwear Fit",
};

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  upiId: "tahelyaniaashish14@okaxis",
  upiMerchantName: "1313 FASHION",
  whatsappNumber: "919327098245",
  whatsappNumberAlt: "919265331152",
  instagramHandle: "itz.1313_",
  instagramUrl: "https://www.instagram.com/itz.1313_?igsh=MXkxOHpiaDAwMWg2aA==",
  supportEmail: "tahelyaniaashish14@gmail.com",
};

export const PRODUCTS: Product[] = [
  {
    id: "legacy-tee",
    title: "The Legacy Tee",
    subtitle: "High-End Streetwear Cotton Edition",
    price: 550,
    ethosQuote: "IT'S YOURS, OWN IT !",
    meaning: "The flagship piece representing ownership over one's divine journey. Crafted with a structured boxy fit, 3D bronze chest emblem, and empowering back typography.",
    fabric: "100% Premium Combed Ringspun Cotton (240 GSM)",
    silhouette: "Signature Oversized Dropped-Shoulder Boxy Cut",
    badge: "SIGNATURE DROP 1",
    defaultColor: "Deep Black",
    colorways: [
      { name: "Deep Black", hex: "#0f0f0f", bgClass: "bg-neutral-900", frontImage: legacyBlackFrontNewImg, backImage: legacyBlackBackNewImg },
      { name: "Classic White", hex: "#ffffff", bgClass: "bg-white", frontImage: legacyWhiteFrontNewImg, backImage: legacyWhiteBackNewImg }
    ],
    frontImage: legacyBlackFrontNewImg,
    backImage: legacyBlackBackNewImg,
    frontDetailsText: "3D Metallic Bronze Gold '1313 FASHION' emblem raised chest print.",
    backDetailsText: "Gothic Blackletter typography across upper shoulder blades: 'It's yours, own it.'",
    printDetails: {
      front: "Center Chest Metallic Bronze Foil & 3D Molded '1313 FASHION' Emblem",
      back: "Upper Back Shoulder Arc Gothic Typography 'It's yours, own it.'",
      sleeves: "Custom 1313 Hem Tag Stitching"
    },
    story: [
      "The Legacy Tee anchors Drop 01 with raw minimalist authority.",
      "Crafted from ultra-soft combed ringspun cotton, it drapes with structured weight that holds its boxy streetwear silhouette endlessly.",
      "The front features our signature 3D metallic bronze '1313 FASHION' emblem, while the back carries the bold Gothic declaration: 'It's yours, own it.'"
    ]
  },
  {
    id: "look-again-tee",
    title: "Look Again Tee",
    subtitle: "Artisanal Submerged Mirror Artwork",
    price: 650,
    ethosQuote: "YOU'RE MORE THAN WHAT THEY SEE.",
    meaning: "When a fish looks in a mirror underwater, she sees only a thin line—a fraction of reality. Yet in truth, she is infinitely greater! Look Again reminds your audience that surface judgment catches only a subtle line, while your true inner existence is vast and divinely empowered.",
    fabric: "Premium Skin-Tone Combed Cotton (240 GSM)",
    silhouette: "Oversized Streetwear Silhouette with Ribbed Collar",
    badge: "ARTWORK EDITION",
    defaultColor: "Skin",
    colorways: [
      { name: "Skin", hex: "#f4f0e6", bgClass: "bg-[#f4f0e6]", frontImage: lookAgainFrontNewImg, backImage: lookAgainBackNewImg }
    ],
    frontImage: lookAgainFrontNewImg,
    backImage: lookAgainBackNewImg,
    galleryImage: lookAgainGalleryImg,
    frontDetailsText: "Minimal 'LOOK AGAIN.' chest typography + '1313' lower hem seal.",
    backDetailsText: "Fish gazing into a mirror reflection showing a slender surface line, representing an infinitely greater, grander truth.",
    printDetails: {
      front: "Chest minimal typography 'LOOK AGAIN.' in warm metallic bronze",
      back: "Full-back archival artwork: Submerged mirror reflection + 'YOU'RE MORE THAN WHAT THEY SEE. 1313'",
      sleeves: "1313 lower left hem seal"
    },
    story: [
      "The Look Again Tee carries a deep philosophical reminder against surface judgment.",
      "The artwork depicts a fish looking into a submerged mirror underwater. The surface reflection shows only a thin, subtle line—yet in reality, she is far greater than that mere reflection.",
      "It serves as a powerful message to your world: what people see on the surface is only a line, but who you truly are is infinitely grander."
    ]
  },
  {
    id: "unseen-force-tee",
    title: "Unseen Force Tee",
    subtitle: "Divine Grace Energy Graphic Edition",
    price: 650,
    ethosQuote: "HELD TOGETHER BY WHAT YOU CAN'T SEE.",
    meaning: "The artwork illustrates a glass fist shattered into pieces, yet remarkably held intact and standing strong through the unseen energy of the Almighty. Even when life fractures you into fragments, an invisible divine power keeps you unbroken, resilient, and formidable.",
    fabric: "Heavywashed Deep Black Cotton (240 GSM)",
    silhouette: "Relaxed Boxy Cut with Drop Shoulders",
    badge: "HIGHLY REQUESTED",
    defaultColor: "Deep Black",
    hasPlacementOptions: false,
    hasTaglineStyles: true,
    colorways: [
      { name: "Deep Black", hex: "#0f0f0f", bgClass: "bg-neutral-900", frontImage: unseenForceFrontNewImg, backImage: unseenForceBackNewImg }
    ],
    frontImage: unseenForceFrontNewImg,
    backImage: unseenForceBackNewImg,
    galleryImage: unseenForceGalleryImg,
    frontDetailsText: "Minimalist 1313 center chest placement.",
    backDetailsText: "Glass fist broken into pieces, held together in powerful alignment by the unseen energy of the Almighty.",
    printDetails: {
      front: "Center Chest Placement",
      back: "Back Graphic: Shattered Glass Fist Held Intact by Divine Energy + 'HELD TOGETHER BY WHAT YOU CAN'T SEE. 1313'",
      sleeves: "Right Sleeve: 'IT'S YOURS' / Left Sleeve: 'OWN IT'"
    },
    story: [
      "The Unseen Force Tee embodies the core spirit of 'Tera' (Surrender & Divine Power).",
      "The back artwork displays a glass fist shattered into pieces, yet held firmly together and standing strong by the unseen, radiant energy of the Almighty.",
      "It clarifies a crucial message to every wearer: when physical strength fails or life breaks you apart, you are sustained and kept strong by divine grace."
    ]
  }
];

export const REFLECTIONS: WisdomReflection[] = [
  {
    id: 1,
    quote: "Everything you are given in this life is driven by an unseen force—a divine grace.",
    sourceText: "Tera (तेरा)",
    meaning: "When you stop taking credit for every triumph and realize you are guided, fear disappears.",
    theme: "Surrender & Grace"
  },
  {
    id: 2,
    quote: "When a fish looks in a mirror, she sees only a thin line—yet she is infinitely greater.",
    sourceText: "Look Again",
    meaning: "Surface judgment catches only a fraction of reality. Your true presence is vast and divinely empowered.",
    theme: "Inner Depth"
  },
  {
    id: 3,
    quote: "A glass fist broken into pieces, held together and standing strong by the unseen energy of the Almighty.",
    sourceText: "Unseen Force",
    meaning: "When you feel shattered, divine grace holds every piece in place and keeps you unbreakable.",
    theme: "Resilience"
  },
  {
    id: 4,
    quote: "It's yours, own it! Walk with the weight of purpose.",
    sourceText: "1313 Legacy",
    meaning: "Your life, your passion, your calling—it was assigned specifically to you.",
    theme: "Ownership"
  }
];
