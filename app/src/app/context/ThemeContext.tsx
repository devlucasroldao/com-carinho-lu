import { createContext, useContext, useState, ReactNode } from "react";

export interface ColorTokens {
  bg: string;
  card: string;
  cardAlt: string;
  primary: string;
  primaryFg: string;
  accent: string;
  rose: string;
  text: string;
  textSub: string;
  textBody: string;
  border: string;
  borderStrong: string;
  input: string;
  navBg: string;
  mutedChip: string;
}

const LIGHT: ColorTokens = {
  bg:          "#FAF3EC",
  card:        "#FDF8F3",
  cardAlt:     "#F2E8DE",
  primary:     "#6B3A3A",
  primaryFg:   "#FAF3EC",
  accent:      "#D4A574",
  rose:        "#C4867A",
  text:        "#2C1810",
  textSub:     "#8B6B5A",
  textBody:    "#5C3D2C",
  border:      "rgba(107,58,58,0.13)",
  borderStrong:"rgba(107,58,58,0.22)",
  input:       "#F2E8DE",
  navBg:       "#FDF8F3",
  mutedChip:   "#EDE0D4",
};

const DARK: ColorTokens = {
  bg:          "#2A1515",
  card:        "#3D1E1E",
  cardAlt:     "#4A2525",
  primary:     "#D4A574",
  primaryFg:   "#2A1515",
  accent:      "#D4A574",
  rose:        "#C4867A",
  text:        "#FAF3EC",
  textSub:     "#C4867A",
  textBody:    "#D4B8A0",
  border:      "#4A2525",
  borderStrong:"#5A3030",
  input:       "#4A2525",
  navBg:       "#1E0E0E",
  mutedChip:   "#4A2525",
};

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
  C: ColorTokens;
}

const Ctx = createContext<ThemeCtx>({ isDark: false, toggle: () => {}, C: LIGHT });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <Ctx.Provider value={{ isDark, toggle: () => setIsDark(v => !v), C: isDark ? DARK : LIGHT }}>
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => useContext(Ctx);
