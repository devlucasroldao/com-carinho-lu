import { motion } from "motion/react";
import { Gift, Pen, MapPin, Star, ShoppingBag, MessageCircle, ChevronRight } from "lucide-react";
import { PRODUCTS, Product } from "../data/products";
import { productImages } from "../data/productImages";
import { AppHeader } from "./AppHeader";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";

interface GiftKitsProps {
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onMenuClick: () => void;
  onOpenKitBuilder: () => void;
}

const DIFFERENTIALS = [
  { icon: Gift,   title: "Montagem artesanal",    desc: "Cada kit é montado à mão, com fitas de cetim, papel seda e muito afeto. Nada de industrial, tudo com alma.",  color: "#F2E8DE" },
  { icon: Pen,    title: "Cartão personalizado",   desc: "Você escreve o recado, a gente coloca no cartão com caligrafia linda. Porque detalhe faz toda a diferença.",   color: "#EDE0D4" },
  { icon: MapPin, title: "Entrega local",          desc: "Entregamos com cuidado na sua cidade. O presente chega perfeito, sem amassado, sem susto.",                    color: "#F2E8DE" },
];

export function GiftKits({ onProductSelect, onAddToCart, onMenuClick, onOpenKitBuilder }: GiftKitsProps) {
  const { C } = useTheme();
  const kits = PRODUCTS.filter(p => p.category === "kits");

  return (
    <div style={{ minHeight: "100%", background: C.bg, fontFamily: "'Lato', sans-serif", paddingBottom: 160 }}>
      <AppHeader onMenuClick={onMenuClick} />

      <div className="px-5 pb-4 pt-2">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: C.text, lineHeight: 1.2 }}>Kits Presenteáveis</h1>
        <p style={{ fontSize: "13px", color: C.textSub, marginTop: "6px", lineHeight: 1.6 }}>
          Presentes montados com carinho para tornar qualquer momento inesquecível.
        </p>
      </div>

      {/* ── Monte seu Kit highlight ── */}
      <div className="px-5 mb-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onOpenKitBuilder}
          className="w-full rounded-2xl p-5 flex items-center gap-4 text-left"
          style={{ background: "linear-gradient(135deg, #6B3A3A 0%, #8B4D4D 100%)", boxShadow: "0 4px 20px rgba(107,58,58,0.3)" }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(212,165,116,0.2)", border: "1.5px solid rgba(212,165,116,0.45)" }}>
            <Gift size={22} strokeWidth={1.5} style={{ color: "#D4A574" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: "#FAF3EC", lineHeight: 1.2 }}>Crie seu kit do zero</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(250,243,236,0.7)", marginTop: "3px" }}>
              Adicione seus favoritos ou pesquise produtos
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-full flex-shrink-0" style={{ background: "#FAF3EC" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#6B3A3A" }}>Montar</span>
            <ChevronRight size={12} strokeWidth={2.5} className="text-[#6B3A3A]" />
          </div>
        </motion.button>
      </div>

      {/* Diferenciais */}
      <div className="px-5 mb-6">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: C.text, marginBottom: "14px" }}>
          Por que nossos kits são especiais?
        </h2>
        <div className="flex flex-col gap-3">
          {DIFFERENTIALS.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl"
              style={{ background: C.isDark ? C.cardAlt : color }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.card }}>
                <Icon size={17} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", color: C.text, marginBottom: "3px" }}>{title}</p>
                <p style={{ fontSize: "12px", color: C.textBody, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 mb-5 flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: C.border }} />
        <span style={{ fontSize: "11px", color: C.textSub }}>kits prontos</span>
        <div className="flex-1 h-px" style={{ background: C.border }} />
      </div>

      {/* Kit cards */}
      <div className="px-5 flex flex-col gap-5">
        {kits.map((kit, i) => {
          const imgSrc = productImages[kit.id] ?? kit.image;
          return (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: C.card, boxShadow: `0 4px 20px ${C.border}` }}
            >
              <div className="h-52 relative cursor-pointer" onClick={() => onProductSelect(kit)}>
                <ImageWithFallback src={imgSrc} alt={kit.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,24,16,0.75) 0%, transparent 55%)" }} />
                {kit.isNew && (
                  <span className="absolute top-3 left-3 bg-[#D4A574] text-white text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ fontWeight: 700 }}>Novidade</span>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#FAF3EC", lineHeight: 1.2 }}>{kit.name}</h3>
                  <p style={{ fontSize: "12px", color: "rgba(250,243,236,0.8)", marginTop: "2px", fontStyle: "italic" }}>{kit.tagline}</p>
                </div>
              </div>
              <div className="p-4">
                <p style={{ fontSize: "13px", color: C.textBody, lineHeight: 1.65, marginBottom: "10px" }}>{kit.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {kit.details.map((d, j) => (
                    <span key={j} className="px-2.5 py-1 rounded-full text-[10px]" style={{ background: C.cardAlt, color: "#6B3A3A", fontWeight: 600 }}>
                      {d}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} fill={j < Math.floor(kit.rating) ? "#D4A574" : C.mutedChip} stroke="none" />
                  ))}
                  <span style={{ fontSize: "11px", color: C.textSub, marginLeft: "4px" }}>{kit.rating} ({kit.reviews} pedidos)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span style={{ fontSize: "20px", fontWeight: 700, color: "#6B3A3A" }}>
                      R$ {kit.price.toFixed(2).replace('.', ',')}
                    </span>
                    <p style={{ fontSize: "10px", color: "#C4867A", fontWeight: 600, marginTop: "2px" }}>+ cartão personalizado grátis</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(kit)}
                    className="flex items-center gap-2 px-4 rounded-2xl"
                    style={{ background: "#6B3A3A", color: "#FAF3EC", fontSize: "12px", fontWeight: 700, boxShadow: "0 3px 10px rgba(107,58,58,0.3)", height: "44px" }}
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Quero este
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Custom kit CTA */}
      <div className="mx-5 mt-6 p-5 rounded-3xl" style={{ background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#FAF3EC", marginBottom: "6px" }}>
          Quer algo ainda mais especial?
        </h3>
        <p style={{ fontSize: "12px", color: "rgba(250,243,236,0.8)", lineHeight: 1.6, marginBottom: "14px" }}>
          A Lu monta o kit dos seus sonhos. Só falar no WhatsApp!
        </p>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold" style={{ background: "#D4A574", color: "#2C1810" }}>
          <MessageCircle size={14} strokeWidth={1.5} />
          Falar no WhatsApp
        </button>
      </div>
    </div>
  );
}
