import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Sparkles, Package, Droplets, Gem, Gift, ShoppingBag } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { productImages } from "../data/productImages";
import { AppHeader } from "./AppHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";
import kitAmorEmFlor from "../../imports/Amor_em_flor.jpg";
import noiteEstrelada from "../../imports/Noite_Estrelada.jpg";
import marDeEncantos from "../../imports/Mar_de_Encantos.jpg";

// ── Carousel ─────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: kitAmorEmFlor,
    title: "Kits com até 30% off",
    sub: "presentes com alma artesanal",
    tag: "Oferta especial",
  },
  {
    img: noiteEstrelada,
    title: "Nova coleção de perfumes",
    sub: "fragrâncias que deixam rastros",
    tag: "Novidade",
  },
  {
    img: marDeEncantos,
    title: "Semi-joias que contam histórias",
    sub: "uma homenagem ao litoral gaúcho",
    tag: "Semi-joias",
  },
];

function BannerCarousel({ onNavigate }: { onNavigate: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl h-44 cursor-pointer" onClick={onNavigate}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={SLIDES[active].img}
            alt={SLIDES[active].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(107,58,58,0.88) 0%, rgba(107,58,58,0.25) 100%)" }} />
          <div className="relative z-10 p-5 h-full flex flex-col justify-between">
            <span style={{ fontSize: "10px", color: "#D4A574", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Lato', sans-serif" }}>
              {SLIDES[active].tag}
            </span>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#FAF3EC", lineHeight: 1.2 }}>
                {SLIDES[active].title}
              </h2>
              <p style={{ fontSize: "12px", color: "rgba(250,243,236,0.75)", marginTop: "3px", fontFamily: "'Lato', sans-serif" }}>
                {SLIDES[active].sub}
              </p>
              <div className="flex items-center gap-1.5 mt-3 self-start bg-[#D4A574] rounded-full px-4 py-2 w-fit">
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", fontWeight: 700, color: "#2C1810" }}>Ver mais</span>
                <ChevronRight size={12} strokeWidth={2} className="text-[#2C1810]" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-3 right-4 flex gap-1.5 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setActive(i); }}
            className="rounded-full transition-all"
            style={{ width: i === active ? "18px" : "6px", height: "6px", background: i === active ? "#D4A574" : "rgba(250,243,236,0.5)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product, onClick, isFav, onFav, onAddToCart,
}: {
  product: Product; onClick: () => void; isFav: boolean; onFav: () => void; onAddToCart: (e: React.MouseEvent) => void;
}) {
  const { C } = useTheme();
  const imgSrc = productImages[product.id] ?? product.image;
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-44"
      style={{ background: C.card, boxShadow: `0 2px 12px ${C.border}` }}
      onClick={onClick}
    >
      <div className="relative h-44" style={{ background: C.mutedChip }}>
        <ImageWithFallback src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#D4A574] text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ fontWeight: 700 }}>
            Novo
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-2 right-8 bg-[#6B3A3A] text-white text-[9px] px-2 py-0.5 rounded-full" style={{ fontWeight: 700 }}>
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        {/* Heart */}
        <button
          onClick={e => { e.stopPropagation(); onFav(); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={isFav ? "#6B3A3A" : "none"} stroke="#6B3A3A" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {/* + Sacola button — 36×36px, always visible */}
        <button
          onClick={onAddToCart}
          style={{ position: "absolute", bottom: 8, right: 8, width: 36, height: 36, borderRadius: "50%", background: "#6B3A3A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(107,58,58,0.35)", border: "none", cursor: "pointer", flexShrink: 0 }}
        >
          <ShoppingBag size={15} strokeWidth={1.5} style={{ color: "#FAF3EC" }} />
        </button>
      </div>
      <div className="p-3">
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: C.textSub, letterSpacing: "0.3px" }}>{product.brand}</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: C.text, lineHeight: 1.3 }} className="mt-0.5 line-clamp-1">{product.name}</p>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: C.textSub, fontStyle: "italic" }} className="mt-0.5 line-clamp-1">{product.tagline}</p>
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", fontWeight: 700, color: "#6B3A3A" }}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: C.textSub, textDecoration: "line-through" }}>
              {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface HomeScreenProps {
  onProductSelect: (product: Product) => void;
  onNavigateCatalog: () => void;
  onNavigateKits: () => void;
  onMenuClick: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const CATEGORY_ICONS = [
  { label: "Perfumes",   Icon: Droplets, color: "#F2E8DE" },
  { label: "Cosméticos", Icon: Sparkles, color: "#EDE0D4" },
  { label: "Semi-joias", Icon: Gem,      color: "#F2E8DE" },
  { label: "Kits",       Icon: Gift,     color: "#EDE0D4" },
];

export function HomeScreen({
  onProductSelect, onNavigateCatalog, onNavigateKits, onMenuClick,
  favorites, onToggleFavorite, onAddToCart,
}: HomeScreenProps) {
  const { C } = useTheme();
  const newProducts = PRODUCTS.filter(p => p.isNew).slice(0, 6);
  const promoProducts = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="flex flex-col min-h-full pb-24" style={{ background: C.bg }}>
      <AppHeader greeting="Olá, linda!" onSearchClick={onNavigateCatalog} onMenuClick={onMenuClick} />

      {/* Search shortcut */}
      <div className="px-5 mb-5">
        <button
          onClick={onNavigateCatalog}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}`, fontFamily: "'Lato', sans-serif" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.textSub} strokeWidth="1.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: "14px", color: C.textSub }}>Buscar perfumes, kits, joias…</span>
        </button>
      </div>

      {/* Carousel */}
      <div className="px-5 mb-5">
        <BannerCarousel onNavigate={onNavigateCatalog} />
      </div>

      {/* Category grid */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-4 gap-3">
          {CATEGORY_ICONS.map(({ label, Icon, color }) => (
            <button
              key={label}
              onClick={label === "Kits" ? onNavigateKits : onNavigateCatalog}
              className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl transition-transform active:scale-95"
              style={{ background: C.isDark ? C.cardAlt : color }}
            >
              <Icon size={20} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
              <span style={{ fontSize: "10px", color: "#6B3A3A", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Monte seu Kit card */}
      <div className="px-5 mb-5">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={onNavigateKits}
          className="cursor-pointer rounded-2xl p-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #6B3A3A 0%, #8B4D4D 100%)" }}
        >
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,165,116,0.2)", border: "1.5px solid rgba(212,165,116,0.4)" }}>
            <Gift size={20} strokeWidth={1.5} style={{ color: "#D4A574" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#FAF3EC", lineHeight: 1.2 }}>Monte seu kit personalizado</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(250,243,236,0.7)", marginTop: "2px" }}>Escolha os produtos que você ama</p>
          </div>
          <div className="flex items-center gap-1 rounded-full px-3 py-1.5 flex-shrink-0" style={{ background: "#D4A574" }}>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, color: "#2C1810" }}>Começar</span>
            <ChevronRight size={11} strokeWidth={2.5} className="text-[#2C1810]" />
          </div>
        </motion.div>
      </div>

      {/* Novidades */}
      <div className="mb-5">
        <div className="px-5 flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={15} strokeWidth={1.5} style={{ color: "#D4A574" }} />
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: C.text }}>Novidades</h3>
          </div>
          <button onClick={onNavigateCatalog} style={{ fontSize: "12px", color: "#6B3A3A", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>
            Ver tudo
          </button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {newProducts.map(p => (
            <ProductCard
              key={p.id} product={p}
              onClick={() => onProductSelect(p)}
              isFav={favorites.includes(p.id)} onFav={() => onToggleFavorite(p.id)}
              onAddToCart={e => { e.stopPropagation(); onAddToCart(p); }}
            />
          ))}
        </div>
      </div>

      {/* Handcraft strip */}
      <div className="mx-5 mb-5 rounded-2xl p-4 flex items-center gap-4" style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
          <Package size={18} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: C.text }}>Entrega com amor</p>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: C.textSub }}>Embalagem artesanal + cartão personalizado em cada pedido</p>
        </div>
      </div>

      {/* Com desconto */}
      {promoProducts.length > 0 && (
        <div className="mb-5">
          <div className="px-5 flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: C.text }}>Com desconto</h3>
            <button onClick={onNavigateCatalog} style={{ fontSize: "12px", color: "#6B3A3A", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Ver tudo</button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {promoProducts.map(p => (
              <ProductCard
                key={p.id} product={p}
                onClick={() => onProductSelect(p)}
                isFav={favorites.includes(p.id)} onFav={() => onToggleFavorite(p.id)}
                onAddToCart={e => { e.stopPropagation(); onAddToCart(p); }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
