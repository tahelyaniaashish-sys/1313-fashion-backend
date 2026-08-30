import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EthosSection } from './components/EthosSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FabricSpecSheet } from './components/FabricSpecSheet';
import { PackagingExperience } from './components/PackagingExperience';
import { CustomOrdersSection } from './components/CustomOrdersSection';
import { UnseenWisdomModal } from './components/UnseenWisdomModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { VIPClubSection } from './components/VIPClubSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { AdminLoginGate } from './components/AdminLoginGate';
import { OrderNotificationBanner } from './components/OrderNotificationBanner';

import { Product, Colorway, CartItem, OrderDetails, StoreConfig } from './types';
import { DEFAULT_STORE_CONFIG } from './data/products';
import {
  subscribeStoreConfig,
  saveStoreConfig,
  subscribeOrders,
  updateOrderStatus,
} from './utils/firestoreStore';
import { useAdminAuth } from './context/AdminAuthContext';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalInitialColor, setModalInitialColor] = useState<Colorway | undefined>(undefined);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWisdomOpen, setIsWisdomOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Store Orders and Configuration State (live-synced from Firestore)
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isAdminOrdersOpen, setIsAdminOrdersOpen] = useState(false);
  const [recentNotificationOrder, setRecentNotificationOrder] = useState<OrderDetails | null>(null);

  const { user: adminUser, logout: adminLogout } = useAdminAuth();

  // Public config (UPI ID, WhatsApp, etc.) is readable by everyone so the
  // storefront/checkout can function — protected from writes by Firestore rules.
  useEffect(() => {
    const unsubscribe = subscribeStoreConfig(setStoreConfig);
    return unsubscribe;
  }, []);

  // Orders are only ever fetched while an authenticated admin session exists.
  // Firestore security rules reject reads for anyone else, so this listener
  // simply returns nothing for anonymous visitors.
  useEffect(() => {
    if (!adminUser) {
      setOrders([]);
      return;
    }
    const unsubscribe = subscribeOrders(setOrders, (err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to load orders:', err);
    });
    return unsubscribe;
  }, [adminUser]);

  // Admin access is intentionally NOT exposed via any visible storefront button.
  // Store owner opens it via a secret URL hash (#admin-1313) or the
  // keyboard shortcut Ctrl+Shift+A, then must sign in with their Firebase admin account.
  const requestAdminAccess = () => {
    setIsAdminOrdersOpen(true);
  };

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin-1313') {
        requestAdminAccess();
        // Clean the hash out of the URL bar so it isn't left visible/bookmarked in history views
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };
    checkHash();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        requestAdminAccess();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogout = () => {
    adminLogout();
    setIsAdminOrdersOpen(false);
  };

  // Navigate to section by ID
  const handleNavigateSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open detail modal
  const handleSelectProduct = (product: Product, initialColor?: Colorway) => {
    setSelectedProduct(product);
    setModalInitialColor(initialColor);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedColor: Colorway,
    selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    placementOption?: string,
    taglineStyle?: number
  ) => {
    const cartItemId = `${product.id}-${selectedColor.name}-${selectedSize}-${placementOption || ''}`;
    
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedColor,
            selectedSize,
            placementOption,
            taglineStyle,
            quantity: 1,
          },
        ];
      }
    });

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Quick add handler from catalog
  const handleQuickAdd = (
    product: Product,
    color: Colorway,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  ) => {
    handleAddToCart(product, color, size);
  };

  // Direct Buy Now handler
  const handleBuyNow = (
    product: Product,
    selectedColor: Colorway,
    selectedSize: 'S' | 'M' | 'L' | 'XL' | 'XXL',
    placementOption?: string,
    taglineStyle?: number
  ) => {
    handleAddToCart(product, selectedColor, selectedSize, placementOption, taglineStyle);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Cart quantity update
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from cart
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Placement Callback & Live Notification Trigger.
  // CheckoutModal already persists the order to Firestore itself — it writes
  // PENDING before opening Razorpay (a public "create", allowed by rules),
  // and the PAID update afterward is written server-side by the
  // verify-razorpay-payment function using admin privileges (since a plain
  // client write to an existing order would be rejected by the "update
  // requires auth" rule). So this handler only needs to drive the local
  // notification banner — it must NOT write to Firestore again here.
  const handleOrderCompleted = (newOrder: OrderDetails) => {
    setRecentNotificationOrder(newOrder);
  };

  // Update Status from Admin Drawer (requires authenticated admin session).
  const handleUpdateOrderStatus = (
    orderNumber: string,
    status: 'NEW' | 'ACCEPTED' | 'DISPATCHED' | 'DELIVERED',
    paymentStatus?: 'PAID' | 'PENDING'
  ) => {
    updateOrderStatus(orderNumber, status, paymentStatus).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to update order:', err);
    });
  };

  // Save Store Settings (UPI ID, WhatsApp number, Instagram) — admin only.
  const handleSaveStoreConfig = (newConfig: StoreConfig) => {
    saveStoreConfig(newConfig).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to save store config:', err);
      alert('Could not save settings — please check your connection and try again.');
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Real-time Order Acceptance Pop-up Banner */}
      <OrderNotificationBanner
        order={recentNotificationOrder}
        onDismiss={() => setRecentNotificationOrder(null)}
        onViewOrder={() => {
          setRecentNotificationOrder(null);
          requestAdminAccess();
        }}
      />

      {/* Sticky Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWisdom={() => setIsWisdomOpen(true)}
        onNavigateSection={handleNavigateSection}
        config={storeConfig}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreDrop={() => handleNavigateSection('catalog')}
          onExploreEthos={() => handleNavigateSection('ethos')}
          onOpenWisdom={() => setIsWisdomOpen(true)}
        />

        {/* Drop 1 Catalog Section */}
        <ProductCatalog
          onSelectProduct={handleSelectProduct}
          onQuickAdd={handleQuickAdd}
        />

        {/* Ethos & Origin Section ('Tera') */}
        <EthosSection
          onOpenWisdom={() => setIsWisdomOpen(true)}
        />

        {/* Custom Printing & Bulk Orders */}
        <CustomOrdersSection />

        {/* Fabric Specifications & Craftsmanship */}
        <FabricSpecSheet />

        {/* VIP Access Pass Section */}
        <VIPClubSection />

        {/* Unboxing & Packaging Experience (Placed at the bottom of the page) */}
        <PackagingExperience />
      </main>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenWisdom={() => setIsWisdomOpen(true)}
        config={storeConfig}
      />

      {/* Product Detail & Configurator Modal */}
      <ProductDetailModal
        product={selectedProduct}
        initialColor={modalInitialColor}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Seek Reflection / Unseen Wisdom Modal */}
      <UnseenWisdomModal
        isOpen={isWisdomOpen}
        onClose={() => setIsWisdomOpen(false)}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Express Checkout Modal with Real UPI, QR Code & WhatsApp Integration */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onClearCart={() => setCart([])}
        config={storeConfig}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Admin Gate: shows a Firebase email/password login until an authenticated
          admin session exists. Order/payment data is only ever fetched (and only
          ever rendered) after that — enforced both here and by Firestore rules. */}
      <AdminLoginGate isOpen={isAdminOrdersOpen} onClose={() => setIsAdminOrdersOpen(false)}>
        <AdminOrdersModal
          isOpen={isAdminOrdersOpen}
          onClose={() => setIsAdminOrdersOpen(false)}
          orders={orders}
          config={storeConfig}
          onUpdateStatus={handleUpdateOrderStatus}
          onSaveConfig={handleSaveStoreConfig}
          onLogout={handleAdminLogout}
        />
      </AdminLoginGate>

      {/* Floating 1-Tap Concierge for WhatsApp & Instagram (customer-facing only, no admin access) */}
      <FloatingConcierge
        config={storeConfig}
      />

    </div>
  );
}
