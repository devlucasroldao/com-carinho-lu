import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag } from "lucide-react";
import { Product } from "../data/products";
import { productImages } from "../data/productImages";
import { AppHeader } from "./AppHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onMenuClick: () => void;
}

export function Cart({ items, onUpdateQty, onRemove, onCheckout, onMenuClick }: CartProps) {
  const { C } = useTheme();
  const subtotal = items.reduce((acc, { product, qty }) => acc + product.price * qty, 0);

  return (
    <div style={{ minHeight: "100%", background: C.bg, fontFamily: "'Lato', sans-serif", paddingBottom: 160 }}>
      <AppHeader onMenuClick={onMenuClick} />
      <div className="px-5 pb-4">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: C.text }}>Minha Sacola</h1>
        <p style={{ fontSize: "13px", color: C.textSub, marginTop: "2px" }}>
          {items.length > 0 ? `${items.reduce((a, i) => a + i.qty, 0)} ite${items.reduce((a, i) => a + i.qty, 0) > 1 ? "ns" : "m"} selecionados` : "Sua sacola está vazia"}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: C.cardAlt }}>
            <ShoppingBag size={34} strokeWidth={1.2} style={{ color: "#6B3A3A" }} />
          </motion.div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: C.text, marginBottom: "6px" }}>Sacola vazia</p>
          <p style={{ fontSize: "13px", color: C.textSub, lineHeight: 1.6 }}>Encontre produtos incríveis no catálogo!</p>
        </div>
      ) : (
        <>
          <div className="px-5 flex flex-col gap-4">
            <AnimatePresence>
              {items.map(({ product, qty }) => {
                const imgSrc = productImages[product.id] ?? product.image;
                return (
                  <motion.div key={product.id} layout
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}
                    className="flex gap-3 p-3 rounded-2xl" style={{ background: C.card, boxShadow: `0 2px 12px ${C.border}` }}>
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0" style={{ background: C.mutedChip }}>
                      <ImageWithFallback src={imgSrc} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: "9px", color: C.textSub, textTransform: "uppercase" }}>{product.brand}</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: C.text, lineHeight: 1.3 }}>{product.name}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#6B3A3A", marginTop: "4px" }}>
                        R$ {(product.price * qty).toFixed(2).replace('.', ',')}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => onUpdateQty(product.id, qty - 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.cardAlt }}>
                            <Minus size={10} strokeWidth={2} style={{ color: "#6B3A3A" }} />
                          </button>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: C.text, minWidth: "16px", textAlign: "center" }}>{qty}</span>
                          <button onClick={() => onUpdateQty(product.id, qty + 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#6B3A3A" }}>
                            <Plus size={10} strokeWidth={2} className="text-[#FAF3EC]" />
                          </button>
                        </div>
                        <button onClick={() => onRemove(product.id)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: C.cardAlt }}>
                          <Trash2 size={11} strokeWidth={1.5} style={{ color: "#C4867A" }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Coupon */}
          <div className="mx-5 mt-4 flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: C.card, border: `1px dashed ${C.borderStrong}` }}>
            <Tag size={14} strokeWidth={1.5} style={{ color: "#D4A574" }} />
            <input placeholder="Código de desconto" className="flex-1 bg-transparent outline-none" style={{ fontSize: "13px", color: C.text }} />
            <button style={{ fontSize: "12px", color: "#6B3A3A", fontWeight: 700 }}>Aplicar</button>
          </div>

          {/* Summary */}
          <div className="mx-5 mt-4 p-4 rounded-2xl" style={{ background: C.card }}>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: "13px", color: C.textBody }}>Subtotal</span>
              <span style={{ fontSize: "13px", color: C.text, fontWeight: 600 }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: "13px", color: C.textBody }}>Entrega</span>
              <span style={{ fontSize: "13px", color: "#C4867A", fontWeight: 600 }}>Grátis</span>
            </div>
            <div className="h-px my-3" style={{ background: C.border }} />
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: C.text }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#6B3A3A", fontWeight: 600 }}>
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </>
      )}

      {items.length > 0 && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "0 20px", pointerEvents: "none" }}>
          <motion.button whileTap={{ scale: 0.97 }} onClick={onCheckout}
            style={{ width: "100%", height: 56, borderRadius: 16, background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)", color: "#FAF3EC", fontSize: 15, fontWeight: 700, fontFamily: "'Lato', sans-serif", boxShadow: "0 4px 16px rgba(107,58,58,0.3)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "auto" }}>
            Finalizar pedido <ArrowRight size={18} strokeWidth={1.5} />
          </motion.button>
        </div>
      )}
    </div>
  );
}
