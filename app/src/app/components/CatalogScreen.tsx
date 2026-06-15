import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, Star, X, ShoppingBag } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "../data/products";
import { productImages } from "../data/productImages";
import { AppHeader } from "./AppHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

interface CatalogScreenProps {
  onProductSelect: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onMenuClick: () => void;
  onAddToCart: (product: Product) => void;
}

type SortKey = "relevancia" | "menor" | "maior" | "novidades";

export function CatalogScreen({ onProductSelect, favorites, onToggleFavorite, onMenuClick, onAddToCart }: CatalogScreenProps) {
  const { C } = useTheme();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");
  const [sortBy, setSortBy] = useState<SortKey>("relevancia");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState(500);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "todos" || p.category === activeCategory;
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
    const matchPrice = p.price <= priceRange;
    const matchPromo = !onlyPromo || (p.originalPrice !== undefined && p.originalPrice > p.price);
    const matchRating = p.rating >= minRating;
    return matchCat && matchQ && matchPrice && matchPromo && matchRating;
  }).sort((a, b) => {
    if (sortBy === "menor") return a.price - b.price;
    if (sortBy === "maior") return b.price - a.price;
    if (sortBy === "novidades") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  return (
    <div className="flex flex-col min-h-full pb-24" style={{ background: C.bg, fontFamily: "'Lato', sans-serif" }}>
      <AppHeader showSearch={false} onMenuClick={onMenuClick} />

      <div className="px-5 pb-3">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: C.text, marginBottom: "12px" }}>Catálogo</h1>

        {/* Search + filter */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}>
            <Search size={14} strokeWidth={1.5} style={{ color: C.textSub }} className="flex-shrink-0" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar produtos…"
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "13px", color: C.text }}
            />
            {query && <button onClick={() => setQuery("")}><X size={13} style={{ color: C.textSub }} /></button>}
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: showFilters ? "#6B3A3A" : C.card, boxShadow: `0 2px 8px ${C.border}` }}
          >
            <SlidersHorizontal size={15} strokeWidth={1.5} color={showFilters ? "#FAF3EC" : "#6B3A3A"} />
          </button>
        </div>

        {/* Sort row */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-3" style={{ scrollbarWidth: "none" }}>
          {([
            { key: "relevancia", label: "Relevância" },
            { key: "menor",      label: "Menor preço" },
            { key: "maior",      label: "Maior preço" },
            { key: "novidades",  label: "Novidades" },
          ] as { key: SortKey; label: string }[]).map(opt => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
              style={{
                background: sortBy === opt.key ? "#6B3A3A" : C.card,
                color: sortBy === opt.key ? "#FAF3EC" : "#6B3A3A",
                boxShadow: sortBy === opt.key ? "0 2px 8px rgba(107,58,58,0.25)" : `0 1px 4px ${C.border}`,
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
              style={{
                background: activeCategory === cat.id ? "#D4A574" : C.card,
                color: activeCategory === cat.id ? "#2C1810" : "#6B3A3A",
                boxShadow: activeCategory === cat.id ? "0 2px 8px rgba(212,165,116,0.35)" : `0 1px 4px ${C.border}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="mx-5 mb-3 p-4 rounded-2xl" style={{ background: C.card, boxShadow: `0 2px 8px ${C.border}` }}>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>Faixa de preço</span>
                  <span style={{ fontSize: "12px", color: "#6B3A3A", fontWeight: 700 }}>Até R$ {priceRange}</span>
                </div>
                <input type="range" min={0} max={500} step={10} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full" style={{ accentColor: "#6B3A3A" }} />
                <div className="flex justify-between mt-1">
                  <span style={{ fontSize: "10px", color: C.textSub }}>R$ 0</span>
                  <span style={{ fontSize: "10px", color: C.textSub }}>R$ 500</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: "12px", fontWeight: 600, color: C.text }}>Em promoção</span>
                <button onClick={() => setOnlyPromo(v => !v)} className="w-11 h-6 rounded-full transition-colors relative" style={{ background: onlyPromo ? "#6B3A3A" : C.mutedChip }}>
                  <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: onlyPromo ? "calc(100% - 22px)" : "2px" }} />
                </button>
              </div>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: C.text, display: "block", marginBottom: "8px" }}>Avaliação mínima</span>
                <div className="flex gap-2 flex-wrap">
                  {[0, 3, 4, 4.5].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                      style={{ background: minRating === r ? "#6B3A3A" : C.cardAlt, color: minRating === r ? "#FAF3EC" : "#6B3A3A" }}>
                      {r === 0 ? "Todos" : (<><Star size={10} fill={minRating === r ? "#FAF3EC" : "#D4A574"} stroke="none" />{r}+</>)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-5 mb-3">
        <p style={{ fontSize: "12px", color: C.textSub }}>
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      <div className="px-5 grid grid-cols-2 gap-4">
        <AnimatePresence>
          {filtered.map((product, i) => {
            const imgSrc = productImages[product.id] ?? product.image;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onProductSelect(product)}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: C.card, boxShadow: `0 2px 12px ${C.border}` }}
              >
                <div className="relative h-44" style={{ background: C.mutedChip }}>
                  <ImageWithFallback src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-[#D4A574] text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ fontWeight: 700 }}>Novo</span>
                  )}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="absolute top-2 right-8 bg-[#6B3A3A] text-white text-[9px] px-2 py-0.5 rounded-full" style={{ fontWeight: 700 }}>
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                  {/* Heart */}
                  <button onClick={e => { e.stopPropagation(); onToggleFavorite(product.id); }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={favorites.includes(product.id) ? "#6B3A3A" : "none"} stroke="#6B3A3A" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  {/* + Sacola — 36×36px, never clipped */}
                  <button
                    onClick={e => { e.stopPropagation(); onAddToCart(product); }}
                    style={{ position: "absolute", bottom: 8, right: 8, width: 36, height: 36, borderRadius: "50%", background: "#6B3A3A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(107,58,58,0.35)", border: "none", cursor: "pointer", flexShrink: 0 }}
                  >
                    <ShoppingBag size={15} strokeWidth={1.5} style={{ color: "#FAF3EC" }} />
                  </button>
                </div>
                <div className="p-3">
                  <p style={{ fontSize: "9px", color: C.textSub, textTransform: "uppercase", letterSpacing: "0.3px" }}>{product.brand}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", color: C.text, lineHeight: 1.3 }} className="mt-0.5 line-clamp-1">{product.name}</p>
                  <p style={{ fontSize: "10px", color: C.textSub, fontStyle: "italic" }} className="mt-0.5 line-clamp-1">{product.tagline}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={9} fill="#D4A574" stroke="none" />
                    <span style={{ fontSize: "10px", color: C.textSub }}>{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#6B3A3A" }}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span style={{ fontSize: "10px", color: C.textSub, textDecoration: "line-through" }}>{product.originalPrice.toFixed(2).replace('.', ',')}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: C.cardAlt }}>
            <Search size={28} strokeWidth={1.2} style={{ color: C.textSub }} />
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: C.text }}>Nenhum resultado</p>
          <p style={{ fontSize: "13px", color: C.textSub, marginTop: "6px" }}>Tente outros filtros ou termos de busca</p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("todos"); setOnlyPromo(false); setMinRating(0); setPriceRange(500); }}
            className="mt-4 px-5 py-2.5 rounded-full text-[13px] font-semibold"
            style={{ background: "#6B3A3A", color: "#FAF3EC" }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
