import { ArrowLeft, Star, ShoppingBag, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../data/products";
import { productImages } from "../data/productImages";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Bottom nav height (64) + button height (56) + gap (24) = 144px padding
const CONTENT_BOTTOM_PAD = 160;
// Fixed button sits 64px (nav) + 16px gap above bottom
const BTN_BOTTOM = 80;

export function ProductDetail({ product, onBack, onAddToCart, isFavorite, onToggleFavorite }: ProductDetailProps) {
  const { C } = useTheme();
  const imgSrc = productImages[product.id] ?? product.image;

  return (
    // Single outer div — the App.tsx screen wrapper handles scrolling via overflow-y-auto
    <div style={{ minHeight: "100%", background: C.bg, fontFamily: "'Lato', sans-serif", paddingBottom: CONTENT_BOTTOM_PAD }}>
      {/* ── Hero image ── */}
      <div style={{ position: "relative", height: 300, flexShrink: 0 }}>
        <ImageWithFallback src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)" }} />

        {/* Back */}
        <button
          onClick={onBack}
          style={{ position: "absolute", top: 48, left: 16, width: 40, height: 40, borderRadius: "50%", background: "rgba(253,248,243,0.92)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ArrowLeft size={18} className="text-[#6B3A3A]" />
        </button>

        {/* Fav + Share */}
        <div style={{ position: "absolute", top: 48, right: 16, display: "flex", gap: 8 }}>
          <button
            onClick={onToggleFavorite}
            style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(253,248,243,0.92)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorite ? "#6B3A3A" : "none"} stroke="#6B3A3A" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(253,248,243,0.92)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Share2 size={16} strokeWidth={1.5} className="text-[#6B3A3A]" />
          </button>
        </div>

        {product.isNew && (
          <span style={{ position: "absolute", bottom: 16, left: 16, background: "#D4A574", color: "#fff", fontSize: 10, padding: "4px 12px", borderRadius: 999, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Novidade
          </span>
        )}
      </div>

      {/* ── Content — no inner scroll, outer container scrolls ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginTop: -16, borderRadius: "24px 24px 0 0", background: C.bg, padding: "24px 20px 0" }}
      >
        {/* Brand + rating */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: C.textSub, letterSpacing: 0.8, textTransform: "uppercase" as const }}>{product.brand}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={11} fill="#D4A574" stroke="none" />
            <span style={{ fontSize: 12, color: "#6B3A3A", fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: 11, color: C.textSub }}>({product.reviews})</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.text, lineHeight: 1.2, margin: 0 }}>{product.name}</h1>
        <p style={{ fontSize: 13, color: C.textSub, fontStyle: "italic", marginTop: 4 }}>{product.tagline}</p>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontSize: 26, fontWeight: 700, color: "#6B3A3A" }}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span style={{ fontSize: 14, color: C.textSub, textDecoration: "line-through" }}>R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
              <span style={{ fontSize: 12, color: "#C4867A", fontWeight: 700 }}>
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.text, marginBottom: 8 }}>Sobre o produto</h3>
          <p style={{ fontSize: 14, color: C.textBody, lineHeight: 1.75, margin: 0 }}>{product.description}</p>
        </div>

        {/* Details */}
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.text, marginBottom: 10 }}>Detalhes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {product.details.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A574", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.textBody }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: C.card, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: Truck,     text: "Entrega local com cuidado" },
            { icon: Shield,    text: "Produto artesanal e autêntico" },
            { icon: RotateCcw, text: "Troca garantida em até 7 dias" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.cardAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
              </div>
              <span style={{ fontSize: 12, color: C.textBody }}>{text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Fixed CTA — 56px tall, above bottom nav (64px) + 16px gap ── */}
      <div
        style={{
          position: "fixed",
          bottom: BTN_BOTTOM,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "0 20px",
          pointerEvents: "none",
        }}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(product)}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)",
            color: "#FAF3EC",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            boxShadow: "0 4px 16px rgba(107,58,58,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            border: "none",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          Adicionar à sacola
        </motion.button>
      </div>
    </div>
  );
}
