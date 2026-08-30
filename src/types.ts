export interface Colorway {
  name: string;
  hex: string;
  bgClass: string;
  frontImage?: string;
  backImage?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  ethosQuote: string;
  meaning: string;
  gsm?: number;
  fabric: string;
  silhouette: string;
  badge?: string;
  colorways: Colorway[];
  defaultColor: string;
  frontImage: string;
  backImage: string;
  frontDetailsText: string;
  backDetailsText: string;
  printDetails: {
    front: string;
    back: string;
    sleeves?: string;
  };
  hasPlacementOptions?: boolean;
  hasTaglineStyles?: boolean;
  story: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: Colorway;
  selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  placementOption?: string;
  taglineStyle?: number;
  quantity: number;
}

export interface StoreConfig {
  upiId: string;
  upiMerchantName: string;
  whatsappNumber: string;
  whatsappNumberAlt?: string;
  instagramHandle: string;
  instagramUrl?: string;
  supportEmail: string;
}

export interface OrderDetails {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  transactionId?: string;
  utrNumber?: string;
  screenshotProof?: string;
  orderStatus: 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED';
  date: string;
  timestamp: number;
}

export interface WisdomReflection {
  id: number;
  quote: string;
  sourceText: string;
  meaning: string;
  theme: string;
}
