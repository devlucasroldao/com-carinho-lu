import { Home, Grid3x3, Gift, Heart, ShoppingBag } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type Screen = "home" | "catalog" | "kits" | "favorites" | "cart" | "product" | "confirmation";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  favCount: number;
}

const TABS = [
  { id: "home"      as Screen, label: "Início",    Icon: Home },
  { id: "catalog"   as Screen, label: "Catálogo",  Icon: Grid3x3 },
  { id: "kits"      as Screen, label: "Kits",      Icon: Gift },
  { id: "favorites" as Screen, label: "Favoritos", Icon: Heart },
  { id: "cart"      as Screen, label: "Sacola",    Icon: ShoppingBag },
] as const;

export function BottomNav({ active, onNavigate, cartCount, favCount }: BottomNavProps) {
  const { C, isDark } = useTheme();

  const navBg = isDark ? "#1E0E0E" : C.navBg;
  const borderColor = isDark ? "#2A1515" : C.border;

  const badge = (id: string) => {
    if (id === "favorites") return favCount;
    if (id === "cart") return cartCount;
    return 0;
  };

  const isActive = (id: Screen) =>
    id === active ||
    (active === "product" && id === "catalog") ||
    (active === "confirmation" && id === "cart");

  return (
    <nav
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        background: navBg,
        borderTop: `1px solid ${borderColor}`,
        zIndex: 50,
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const on = isActive(id);
        // Active: #6B3A3A, Inactive: #C4867A (as requested)
        const color = on ? "#6B3A3A" : "#C4867A";
        const b = badge(id);

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "4px 12px",
              borderRadius: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              flex: 1,
            }}
          >
            {/* Icon + badge */}
            <div style={{ position: "relative" }}>
              <Icon
                size={22}
                strokeWidth={on ? 2 : 1.5}
                style={{ color, display: "block" }}
                fill={on && id === "favorites" ? "#6B3A3A" : "none"}
              />
              {b > 0 && (
                <span style={{
                  position: "absolute",
                  top: -5, right: -6,
                  background: "#D4A574",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: 15, height: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}>
                  {b > 9 ? "9+" : b}
                </span>
              )}
            </div>

            {/* Label */}
            <span style={{
              fontSize: 10,
              fontFamily: "'Lato', sans-serif",
              fontWeight: on ? 700 : 400,
              color,
              lineHeight: 1,
            }}>
              {label}
            </span>

            {/* Active dot */}
            {on && (
              <div style={{ position: "absolute", bottom: 2, width: 4, height: 4, borderRadius: "50%", background: "#D4A574" }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
