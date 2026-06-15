import { motion } from "motion/react";
import { ShoppingBag, MapPin, User, Heart, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ProfileScreenProps {
  onBack: () => void;
  onNavigateFavorites: () => void;
}

const PROFILE_ITEMS = [
  { icon: ShoppingBag, label: "Meus Pedidos",   sub: "3 pedidos realizados" },
  { icon: MapPin,      label: "Endereços",       sub: "Adicionar endereço de entrega" },
  { icon: User,        label: "Dados pessoais",  sub: "Nome, e-mail, telefone" },
  { icon: Heart,       label: "Favoritos",       sub: "Produtos que você amou" },
  { icon: Tag,         label: "Cupons",          sub: "Nenhum cupom ativo" },
];

const AVATAR_URL = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format";

export function ProfileScreen({ onBack, onNavigateFavorites }: ProfileScreenProps) {
  const { C } = useTheme();

  return (
    <div className="flex flex-col min-h-full pb-24" style={{ background: C.bg, fontFamily: "'Lato', sans-serif" }}>
      {/* Header — 140px, gradient, horizontal layout */}
      <div
        className="relative px-5 flex-shrink-0"
        style={{
          background: "linear-gradient(160deg, #6B3A3A 0%, #C4867A 100%)",
          paddingTop: "52px",
          paddingBottom: "24px",
          minHeight: "140px",
        }}
      >
        <button onClick={onBack} className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(250,243,236,0.18)" }}>
          <ArrowLeft size={17} strokeWidth={1.5} className="text-[#FAF3EC]" />
        </button>

        {/* Avatar + info — horizontal, left-aligned, below back button */}
        <div className="flex items-center gap-4 mt-2">
          {/* Avatar 72px */}
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: "72px", height: "72px", border: "2.5px solid rgba(212,165,116,0.6)", boxShadow: "0 4px 16px rgba(44,24,16,0.25)" }}
          >
            <img src={AVATAR_URL} alt="Linda" className="w-full h-full object-cover" />
          </div>

          {/* Name + email left of avatar */}
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#FAF3EC", lineHeight: 1.2 }}>Linda</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(250,243,236,0.75)", marginTop: "3px" }}>linda@email.com</p>
            <div className="mt-2 px-3 py-1 rounded-full w-fit" style={{ background: "rgba(212,165,116,0.25)", border: "1px solid rgba(212,165,116,0.4)" }}>
              <span style={{ fontSize: "10px", color: "#D4A574", fontWeight: 700, letterSpacing: "0.5px" }}>Cliente VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu cards */}
      <div className="px-4 mt-4 flex flex-col gap-3">
        {PROFILE_ITEMS.map(({ icon: Icon, label, sub }, i) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.98 }}
            onClick={label === "Favoritos" ? onNavigateFavorites : undefined}
            className="flex items-center gap-3 rounded-2xl w-full text-left"
            style={{ background: C.card, boxShadow: `0 2px 10px ${C.border}`, padding: "16px" }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
              <Icon size={20} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{label}</p>
              <p style={{ fontSize: "11px", color: C.textSub, marginTop: "1px" }}>{sub}</p>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} style={{ color: C.textSub }} />
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <div className="px-5 mt-6">
        <button style={{ fontSize: "14px", color: "#6B3A3A", fontWeight: 600, width: "100%", textAlign: "center", padding: "12px" }}>
          Sair da conta
        </button>
      </div>
    </div>
  );
}
