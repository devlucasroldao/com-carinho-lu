import { motion } from "motion/react";
import { useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/logo_com_carinho_lu2.png";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  // Circle size: 220x220px. Logo padding: 28px each side → logo area = 220 - 56 = 164px
  const CIRCLE = 220;
  const LOGO = CIRCLE - 32; // 188px

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: "linear-gradient(160deg, #6B3A3A 0%, #8B4D4D 40%, #C4867A 100%)" }}
    >
      {/* Decorative bg blobs */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 280, borderRadius: "50%", background: "#D4A574", opacity: 0.08, transform: "translate(35%, -35%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 220, height: 220, borderRadius: "50%", background: "#FAF3EC", opacity: 0.07, transform: "translate(-35%, 35%)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.82, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}
      >
        {/* Outer glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Glow halo — purely decorative, bigger than the circle */}
          <div style={{
            position: "absolute",
            width: CIRCLE + 48,
            height: CIRCLE + 48,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,165,116,0.32) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* ── Perfect circle ── */}
          <div style={{
            width:        CIRCLE,
            height:       CIRCLE,
            borderRadius: "50%",           // guarantees a circle regardless of content
            background:   "rgba(253,248,243,0.97)",
            boxShadow:    "0 8px 32px rgba(0,0,0,0.15), 0 0 0 1.5px rgba(212,165,116,0.35)",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            flexShrink:   0,
            overflow:       "hidden",
          }}>
            <ImageWithFallback
              src={logoImg}
              alt="Com Carinho, Lu"
              style={{
                width:      LOGO,
                height:     LOGO,
                objectFit:  "contain",
                display:    "block",
              }}
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{ fontFamily: "'Lato', sans-serif", color: "rgba(250,243,236,0.72)", fontSize: 13, letterSpacing: 0.5, textAlign: "center" }}
        >
          perfumes · cosméticos · semi-joias · kits
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ position: "absolute", bottom: 64, display: "flex", gap: 10 }}
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.22 }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A574" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
