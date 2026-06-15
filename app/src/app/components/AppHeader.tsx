import { Bell, Menu, Sun, Moon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";
import logoImg from "../../imports/logo_com_carinho_lu2.png";

interface AppHeaderProps {
  onSearchClick?: () => void;
  onMenuClick: () => void;
  showSearch?: boolean;
  greeting?: string;
}

// 64px header, items vertically centered
export function AppHeader({ onSearchClick, onMenuClick, greeting }: AppHeaderProps) {
  const { C, isDark, toggle } = useTheme();

  // In dark mode use the deep-dark nav bg for header too
  const headerBg = isDark ? "#1E0E0E" : C.bg;
  const iconBg    = isDark ? "#2A1515" : C.card;
  const iconShadow = isDark ? "none" : `0 1px 6px ${C.border}`;

  return (
    <div
      style={{
        paddingTop: 40,          // clear status bar
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 16,
        height: 104,             // 40 status + 64 header
        display: "flex",
        alignItems: "flex-end",  // pin content to the 64px bottom zone
        justifyContent: "space-between",
        background: headerBg,
        gap: 12,
      }}
    >
      {/* ── Left: Logo circle + text ── */}
      <button
        onClick={onSearchClick}
        style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, minWidth: 0, height: 48, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        {/* Logo circle — 43px, perfect circle */}
        <div style={{
          width: 43, height: 43,
          borderRadius: "50%",
          background: iconBg,
          boxShadow: iconShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <ImageWithFallback
            src={logoImg}
            alt="Com Carinho, Lu"
            style={{ width: 37, height: 37, objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Text */}
        <div style={{ lineHeight: 1 }}>
          {greeting && (
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: C.textSub, margin: 0, marginBottom: 2 }}>
              {greeting}
            </p>
          )}
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: C.primary, margin: 0, lineHeight: 1.1 }}>
            Com Carinho, Lu
          </p>
        </div>
      </button>

      {/* ── Right: action icons, all 36px, vertically centered ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, height: 48 }}>
        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          style={{ width: 36, height: 36, borderRadius: "50%", background: iconBg, boxShadow: iconShadow, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}
        >
          {isDark
            ? <Sun  size={15} strokeWidth={1.5} style={{ color: C.accent }} />
            : <Moon size={15} strokeWidth={1.5} style={{ color: C.primary }} />
          }
        </button>

        {/* Bell */}
        <button style={{ width: 36, height: 36, borderRadius: "50%", background: iconBg, boxShadow: iconShadow, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer", position: "relative" }}>
          <Bell size={15} strokeWidth={1.5} style={{ color: C.primary }} />
          <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: "#D4A574", border: `1.5px solid ${headerBg}` }} />
        </button>

        {/* Hamburger */}
        <button
          onClick={onMenuClick}
          style={{ width: 36, height: 36, borderRadius: "50%", background: iconBg, boxShadow: iconShadow, display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}
        >
          <Menu size={16} strokeWidth={1.5} style={{ color: C.primary }} />
        </button>
      </div>
    </div>
  );
}
