import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Trash2, Heart } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { productImages } from "../data/productImages";
import { AppHeader } from "./AppHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

interface FavoritesProps {
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onExploreCatalog: () => void;
  onMenuClick: () => void;
}

export function Favorites({ favorites, onRemoveFavorite, onProductSelect, onAddToCart, onExploreCatalog, onMenuClick }: FavoritesProps) {
  const { C } = useTheme();
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="flex flex-col min-h-full pb-24" style={{ background: C.bg, fontFamily: "'Lato', sans-serif" }}>
      <AppHeader onMenuClick={onMenuClick} />
      <div className="px-5 pb-4">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: C.text }}>Favoritos</h1>
        <p style={{ fontSize: "13px", color: C.textSub, marginTop: "2px" }}>
          {favProducts.length > 0
            ? `${favProducts.length} produto${favProducts.length > 1 ? "s" : ""} na sua lista de desejos`
            : "Sua lista de desejos está esperando por você"}
        </p>
      </div>

      {favProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-8 text-center">
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.cardAlt}, ${C.mutedChip})` }}>
              <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
                <Heart size={52} strokeWidth={1.2} style={{ color: "#6B3A3A" }} fill="#C4867A" fillOpacity={0.35} />
              </motion.div>
            </div>
            {[{ x: -20, y: -12, delay: 0 }, { x: 22, y: -16, delay: 0.4 }, { x: -16, y: 20, delay: 0.8 }].map((pos, i) => (
              <motion.div key={i} className="absolute w-2 h-2 rounded-full"
                style={{ background: "#D4A574", top: `calc(50% + ${pos.y}px)`, left: `calc(50% + ${pos.x}px)` }}
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: pos.delay }} />
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: C.text, lineHeight: 1.25, marginBottom: "10px" }}>
              Sua lista de desejos<br />está esperando por você
            </p>
            <p style={{ fontSize: "13px", color: C.textSub, lineHeight: 1.65 }}>
              Toque no coração dos produtos que você amou para salvá-los aqui.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.96 }}
            onClick={onExploreCatalog}
            className="mt-6 px-7 py-3.5 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)", color: "#FAF3EC", fontSize: "14px", fontWeight: 700, boxShadow: "0 4px 14px rgba(107,58,58,0.28)" }}
          >
            Explorar catálogo
          </motion.button>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-8 px-5 py-4 rounded-2xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: "12px", color: C.textSub, lineHeight: 1.6, fontStyle: "italic" }}>
              "A Lu guarda tudo pra você. Basta apertar o coração em qualquer produto!"
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="px-5 flex flex-col gap-4">
          <AnimatePresence>
            {favProducts.map(product => {
              const imgSrc = productImages[product.id] ?? product.image;
              return (
                <motion.div key={product.id} layout
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex gap-3 p-3 rounded-2xl cursor-pointer"
                  style={{ background: C.card, boxShadow: `0 2px 12px ${C.border}` }}
                  onClick={() => onProductSelect(product)}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ background: C.mutedChip }}>
                    <ImageWithFallback src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <p style={{ fontSize: "10px", color: C.textSub, textTransform: "uppercase", letterSpacing: "0.3px" }}>{product.brand}</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: C.text, lineHeight: 1.3 }}>{product.name}</p>
                      <p style={{ fontSize: "11px", color: C.textSub, fontStyle: "italic" }} className="line-clamp-1">{product.tagline}</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span style={{ fontSize: "15px", fontWeight: 700, color: "#6B3A3A" }}>R$ {product.price.toFixed(2).replace('.', ',')}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span style={{ fontSize: "10px", color: C.textSub, textDecoration: "line-through" }}>{product.originalPrice.toFixed(2).replace('.', ',')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <motion.button whileTap={{ scale: 0.93 }}
                        onClick={e => { e.stopPropagation(); onAddToCart(product); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                        style={{ background: "#6B3A3A", color: "#FAF3EC" }}>
                        <ShoppingBag size={11} strokeWidth={1.5} />Adicionar
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.93 }}
                        onClick={e => { e.stopPropagation(); onRemoveFavorite(product.id); }}
                        className="w-7 h-7 rounded-xl flex items-center justify-center"
                        style={{ background: C.cardAlt }}>
                        <Trash2 size={12} strokeWidth={1.5} style={{ color: "#C4867A" }} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
