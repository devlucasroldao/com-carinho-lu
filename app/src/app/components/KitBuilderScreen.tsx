import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, X, ShoppingBag, Plus } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { productImages } from "../data/productImages";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

interface KitBuilderScreenProps {
  favorites: string[];
  onBack: () => void;
  onCheckoutKit: (items: Product[]) => void;
}

export function KitBuilderScreen({ favorites, onBack, onCheckoutKit }: KitBuilderScreenProps) {
  const { C } = useTheme();
  const [query, setQuery] = useState("");
  const [kitItems, setKitItems] = useState<Product[]>([]);

  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  const searchResults = query.length > 0
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && !kitItems.find(k => k.id === p.id))
    : [];

  const addToKit = (p: Product) => {
    if (!kitItems.find(k => k.id === p.id)) setKitItems(prev => [...prev, p]);
    setQuery("");
  };
  const removeFromKit = (id: string) => setKitItems(prev => prev.filter(k => k.id !== id));

  const kitTotal = kitItems.reduce((s, p) => s + p.price, 0);
  const canCheckout = kitItems.length >= 2;

  return (
    <div style={{ minHeight: "100%", background: C.bg, fontFamily: "'Lato', sans-serif", paddingBottom: 160 }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4" style={{ background: C.bg }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.card, boxShadow: `0 1px 6px ${C.border}` }}>
            <ArrowLeft size={18} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
          </button>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: C.text, lineHeight: 1.2 }}>Monte seu Kit</h1>
            <p style={{ fontSize: "12px", color: C.textSub, marginTop: "1px" }}>Mínimo 2 itens para finalizar</p>
          </div>
        </div>
      </div>

      {/* Section 1: Favoritos */}
      {favProducts.length > 0 && (
        <div className="mb-5">
          <p style={{ fontSize: "12px", fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "1px", paddingLeft: "20px", marginBottom: "10px" }}>
            Seus Favoritos
          </p>
          <div className="flex gap-3 px-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {favProducts.map(p => {
              const inKit = kitItems.some(k => k.id === p.id);
              const imgSrc = productImages[p.id] ?? p.image;
              return (
                <motion.div key={p.id} whileTap={{ scale: 0.95 }} className="flex-shrink-0 w-28 rounded-2xl overflow-hidden relative" style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}>
                  <div className="relative h-28" style={{ background: C.mutedChip }}>
                    <ImageWithFallback src={imgSrc} alt={p.name} className="w-full h-full object-cover" />
                    {inKit && <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(107,58,58,0.55)" }}>
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B3A3A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </div>}
                  </div>
                  <div className="p-2">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "11px", color: C.text, lineHeight: 1.2 }} className="line-clamp-2">{p.name}</p>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#6B3A3A", marginTop: "3px" }}>R$ {p.price.toFixed(0)}</p>
                  </div>
                  {!inKit && (
                    <button
                      onClick={() => addToKit(p)}
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: "#6B3A3A" }}
                    >
                      <Plus size={13} strokeWidth={2} className="text-[#FAF3EC]" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 2: Search */}
      <div className="px-5 mb-5">
        <p style={{ fontSize: "12px", fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
          Pesquisar produtos
        </p>
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}>
            <Search size={14} strokeWidth={1.5} style={{ color: C.textSub }} className="flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "13px", color: C.text }}
            />
            {query && <button onClick={() => setQuery("")}><X size={13} style={{ color: C.textSub }} /></button>}
          </div>
          {/* Search dropdown */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-10"
                style={{ background: C.card, boxShadow: `0 8px 24px rgba(44,24,16,0.15)` }}
              >
                {searchResults.slice(0, 5).map(p => {
                  const imgSrc = productImages[p.id] ?? p.image;
                  return (
                    <button
                      key={p.id}
                      onClick={() => addToKit(p)}
                      className="w-full flex items-center gap-3 px-4 py-3 border-b last:border-b-0 text-left"
                      style={{ borderColor: C.border }}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ background: C.mutedChip }}>
                        <ImageWithFallback src={imgSrc} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: "13px", color: C.text, fontWeight: 600 }} className="truncate">{p.name}</p>
                        <p style={{ fontSize: "11px", color: "#6B3A3A", fontWeight: 700 }}>R$ {p.price.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#6B3A3A" }}>
                        <Plus size={13} strokeWidth={2} className="text-[#FAF3EC]" />
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Section 3: Kit atual */}
      <div className="px-5">
        <p style={{ fontSize: "12px", fontWeight: 700, color: C.textSub, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
          Seu Kit {kitItems.length > 0 && `(${kitItems.length} ite${kitItems.length === 1 ? "m" : "ns"})`}
        </p>

        {kitItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 rounded-2xl" style={{ background: C.card, border: `1.5px dashed ${C.border}` }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ background: C.cardAlt }}>
              <ShoppingBag size={24} strokeWidth={1.2} style={{ color: C.textSub }} />
            </div>
            <p style={{ fontSize: "13px", color: C.textSub, textAlign: "center" }}>
              Adicione pelo menos 2 produtos<br />para montar seu kit
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {kitItems.map(p => {
                const imgSrc = productImages[p.id] ?? p.image;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: C.mutedChip }}>
                      <ImageWithFallback src={imgSrc} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: C.text, lineHeight: 1.3 }} className="line-clamp-1">{p.name}</p>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "#6B3A3A", marginTop: "2px" }}>R$ {p.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button onClick={() => removeFromKit(p.id)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
                      <X size={14} strokeWidth={1.5} style={{ color: "#C4867A" }} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Summary */}
            <div className="p-4 rounded-2xl mt-1" style={{ background: C.card }}>
              <div className="flex justify-between items-center mb-2">
                <span style={{ fontSize: "13px", color: C.textSub }}>Subtotal dos itens</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>R$ {kitTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: C.cardAlt }}>
                <span style={{ fontSize: "14px" }}>🎀</span>
                <span style={{ fontSize: "12px", color: C.textBody }}>Embalagem artesanal inclusa</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed CTA */}
      <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "0 20px", pointerEvents: canCheckout ? "auto" : "none" }}>
        <motion.button
          whileTap={{ scale: canCheckout ? 0.97 : 1 }}
          onClick={() => canCheckout && onCheckoutKit(kitItems)}
          className="w-full flex items-center justify-center gap-3 rounded-2xl transition-opacity"
          style={{
            height: "56px",
            background: canCheckout ? "linear-gradient(135deg, #6B3A3A, #8B4D4D)" : "#EDE0D4",
            color: canCheckout ? "#FAF3EC" : "#8B6B5A",
            fontSize: "15px", fontWeight: 700,
            boxShadow: canCheckout ? "0 4px 16px rgba(107,58,58,0.3)" : "none",
          }}
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
          {canCheckout
            ? `Finalizar kit — R$ ${kitTotal.toFixed(2).replace('.', ',')}`
            : `Adicione mais ${2 - kitItems.length} item${2 - kitItems.length > 1 ? "s" : ""}`}
        </motion.button>
      </div>
    </div>
  );
}
