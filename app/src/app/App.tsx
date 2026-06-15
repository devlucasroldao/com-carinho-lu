import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SplashScreen } from "./components/SplashScreen";
import { HomeScreen } from "./components/HomeScreen";
import { CatalogScreen } from "./components/CatalogScreen";
import { GiftKits } from "./components/GiftKits";
import { Favorites } from "./components/Favorites";
import { Cart, CartItem } from "./components/Cart";
import { ProductDetail } from "./components/ProductDetail";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { LoginScreen } from "./components/LoginScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { OurStoryScreen } from "./components/OurStoryScreen";
import { KitBuilderScreen } from "./components/KitBuilderScreen";
import { BottomNav } from "./components/BottomNav";
import { HamburgerDrawer } from "./components/HamburgerDrawer";
import { Product } from "./data/products";

type Screen =
  | "home" | "catalog" | "kits" | "favorites" | "cart"
  | "product" | "confirmation"
  | "login" | "profile" | "story" | "kitbuilder";

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

const NAV_ORDER: Screen[] = ["home", "catalog", "kits", "favorites", "cart"];

function AppInner() {
  const { C } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState<Screen>("home");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const direction = useCallback((next: Screen) => {
    const pi = NAV_ORDER.indexOf(prevScreen);
    const ci = NAV_ORDER.indexOf(next);
    if (pi === -1 || ci === -1) return 1;
    return ci >= pi ? 1 : -1;
  }, [prevScreen]);

  const navigate = useCallback((next: Screen) => {
    setPrevScreen(screen);
    setScreen(next);
  }, [screen]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setPrevScreen(screen);
    setScreen("product");
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const handleUpdateQty = (id: string, qty: number) => {
    if (qty <= 0) setCartItems(prev => prev.filter(i => i.product.id !== id));
    else setCartItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((acc, { product, qty }) => acc + product.price * qty, 0);
    setOrderTotal(total);
    setCartItems([]);
    navigate("confirmation");
  };

  const handleKitCheckout = (kitProducts: Product[]) => {
    kitProducts.forEach(handleAddToCart);
    navigate("cart");
  };

  if (showSplash) return <SplashScreen onDone={() => setShowSplash(false)} />;

  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);
  const favCount = favorites.length;
  const dir = direction(screen);
  const showBottomNav = !["confirmation", "login", "story", "kitbuilder"].includes(screen);

  return (
    <div
      className="relative overflow-hidden"
      style={{ maxWidth: "430px", margin: "0 auto", height: "100dvh", background: C.bg }}
    >
      {/* Hamburger drawer — absolute, inside frame */}
      <HamburgerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={s => navigate(s)}
      />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={screen + (selectedProduct?.id ?? "")}
          custom={dir}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 290, damping: 30 }}
          className="absolute inset-0 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {screen === "home" && (
            <HomeScreen
              onProductSelect={handleProductSelect}
              onNavigateCatalog={() => navigate("catalog")}
              onNavigateKits={() => navigate("kits")}
              onMenuClick={() => setDrawerOpen(true)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          )}
          {screen === "catalog" && (
            <CatalogScreen
              onProductSelect={handleProductSelect}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onMenuClick={() => setDrawerOpen(true)}
              onAddToCart={handleAddToCart}
            />
          )}
          {screen === "kits" && (
            <GiftKits
              onProductSelect={handleProductSelect}
              onAddToCart={handleAddToCart}
              onMenuClick={() => setDrawerOpen(true)}
              onOpenKitBuilder={() => navigate("kitbuilder")}
            />
          )}
          {screen === "favorites" && (
            <Favorites
              favorites={favorites}
              onRemoveFavorite={handleToggleFavorite}
              onProductSelect={handleProductSelect}
              onAddToCart={handleAddToCart}
              onExploreCatalog={() => navigate("catalog")}
              onMenuClick={() => setDrawerOpen(true)}
            />
          )}
          {screen === "cart" && (
            <Cart
              items={cartItems}
              onUpdateQty={handleUpdateQty}
              onRemove={id => setCartItems(prev => prev.filter(i => i.product.id !== id))}
              onCheckout={handleCheckout}
              onMenuClick={() => setDrawerOpen(true)}
            />
          )}
          {screen === "product" && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onBack={() => navigate(prevScreen === "product" ? "home" : prevScreen as Screen)}
              onAddToCart={p => { handleAddToCart(p); navigate("cart"); }}
              isFavorite={favorites.includes(selectedProduct.id)}
              onToggleFavorite={() => handleToggleFavorite(selectedProduct.id)}
            />
          )}
          {screen === "confirmation" && (
            <OrderConfirmation onBackToHome={() => navigate("home")} orderTotal={orderTotal} />
          )}
          {screen === "login" && (
            <LoginScreen onLogin={() => navigate("home")} />
          )}
          {screen === "profile" && (
            <ProfileScreen onBack={() => navigate("home")} onNavigateFavorites={() => navigate("favorites")} />
          )}
          {screen === "story" && (
            <OurStoryScreen onBack={() => navigate("home")} />
          )}
          {screen === "kitbuilder" && (
            <KitBuilderScreen
              favorites={favorites}
              onBack={() => navigate("kits")}
              onCheckoutKit={handleKitCheckout}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav
          active={screen}
          onNavigate={navigate}
          cartCount={cartCount}
          favCount={favCount}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
