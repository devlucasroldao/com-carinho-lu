import { motion, AnimatePresence } from "motion/react";
import { X, User, ShoppingBag, Tag, BookOpen, MessageCircle, LogOut, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type DrawerScreen = "profile" | "story" | "login";

interface HamburgerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: DrawerScreen) => void;
}

const MENU_ITEMS = [
  { icon: User,          label: "Meu Perfil",              screen: "profile" as DrawerScreen },
  { icon: ShoppingBag,   label: "Meus Pedidos",            screen: "profile" as DrawerScreen },
  { icon: Tag,           label: "Cupons e Promoções",      screen: "profile" as DrawerScreen },
  { icon: BookOpen,      label: "Nossa História",          screen: "story" as DrawerScreen },
  { icon: MessageCircle, label: "Fale Conosco (WhatsApp)", screen: "story" as DrawerScreen },
];

const AVATAR_URL = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format";

export function HamburgerDrawer({ isOpen, onClose, onNavigate }: HamburgerDrawerProps) {
  const { C } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — absolute inside the frame */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40"
            style={{ background: "rgba(44,24,16,0.45)", backdropFilter: "blur(2px)" }}
          />

          {/* Drawer — 80% width, slides in from right, absolute inside frame */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute top-0 right-0 h-full z-50 flex flex-col"
            style={{
              width: "80%",
              background: C.card,
              boxShadow: "-8px 0 40px rgba(44,24,16,0.2)",
            }}
          >
            {/* Close */}
            <div className="flex justify-end px-4 pt-12 pb-2">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: C.cardAlt }}
              >
                <X size={16} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
              </button>
            </div>

            {/* Avatar + user info */}
            <div className="px-5 pb-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${C.accent}` }}>
                <img
                  src={AVATAR_URL}
                  alt="Linda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", color: C.text }}>Olá, Linda! ✨</p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: C.textSub, marginTop: "2px" }}>linda@email.com</p>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-5 mb-4 h-px" style={{ background: C.border }} />

            {/* Menu items */}
            <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
              {MENU_ITEMS.map(({ icon: Icon, label, screen }) => (
                <button
                  key={label}
                  onClick={() => { onNavigate(screen); onClose(); }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl w-full text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
                    <Icon size={15} strokeWidth={1.5} style={{ color: "#6B3A3A" }} />
                  </div>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: C.text, flex: 1 }}>{label}</span>
                  <ChevronRight size={14} strokeWidth={1.5} style={{ color: C.textSub }} />
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-10">
              <div className="h-px mx-3 mb-3" style={{ background: C.border }} />
              <button
                onClick={() => { onNavigate("login"); onClose(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
                  <LogOut size={15} strokeWidth={1.5} style={{ color: "#C4867A" }} />
                </div>
                <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#C4867A" }}>Sair da conta</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
