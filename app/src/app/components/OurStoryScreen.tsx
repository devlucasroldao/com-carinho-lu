import { motion } from "motion/react";
import { ArrowLeft, MapPin, Clock, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "../context/ThemeContext";
import logoImg from "../../imports/logo_com_carinho_lu2.png";
import lojaFisica from "../../imports/loja_fisica.jpg";

interface OurStoryScreenProps {
  onBack: () => void;
}

export function OurStoryScreen({ onBack }: OurStoryScreenProps) {
  const { C } = useTheme();

  return (
    <div className="flex flex-col min-h-full pb-10" style={{ background: C.bg, fontFamily: "'Lato', sans-serif" }}>
      {/* ── Hero: gradient + centered logo ── */}
      <div
        className="relative flex flex-col items-center px-6 pb-10"
        style={{
          background: "linear-gradient(180deg, #6B3A3A 0%, #8B4D4D 55%, #FAF3EC 100%)",
          paddingTop: "52px",
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(250,243,236,0.18)", backdropFilter: "blur(6px)" }}
        >
          <ArrowLeft size={18} strokeWidth={1.5} className="text-[#FAF3EC]" />
        </button>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          {/* Logo circle — perfect 180×180px circle */}
          <div
            style={{
              width:          180,
              height:         180,
              borderRadius:   "50%",
              background:     "rgba(253,248,243,0.97)",
              boxShadow:      "0 8px 32px rgba(0,0,0,0.15), 0 0 0 1.5px rgba(212,165,116,0.4)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}
          >
            <ImageWithFallback className="rounded-[100px]"
              src={logoImg}
              alt="Com Carinho, Lu"
              style={{ width: 162, height: 162, objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Tagline under logo */}
          <div className="text-center">
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#FAF3EC", lineHeight: 1.2 }}>
              Nossa História
            </p>
            <p style={{ fontSize: "12px", color: "rgba(250,243,236,0.65)", marginTop: "5px", letterSpacing: "0.5px" }}>
              com carinho, lu — arroio do sal, rs
            </p>
          </div>
        </motion.div>

        {/* Store photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 w-full"
        >
          <div
            className="overflow-hidden w-full"
            style={{ borderRadius: "16px", boxShadow: "0 8px 32px rgba(44,24,16,0.25)" }}
          >
            <ImageWithFallback
              src={lojaFisica}
              alt="Loja física Com Carinho, Lu — Arroio do Sal"
              className="w-full object-cover"
              style={{ height: "200px" }}
            />
          </div>
          <p style={{ fontSize: "12px", color: "rgba(250,243,236,0.6)", textAlign: "center", marginTop: "8px" }}>
            Nossa casinha em Arroio do Sal, RS 🏡
          </p>
        </motion.div>
      </div>

      {/* ── Story content ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="px-5 mt-6"
      >
        <p style={{ fontSize: "15px", color: C.textBody, lineHeight: 1.85 }}>
          Oi, eu sou a Lu! Acredito que cada presente conta uma história e que os cheiros têm o superpoder de eternizar os nossos melhores momentos.
        </p>
        <p style={{ fontSize: "15px", color: C.textBody, lineHeight: 1.85, marginTop: "14px" }}>
          A{" "}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: C.primary }}>
            Com Carinho, Lu
          </span>{" "}
          nasceu da minha vontade de criar pequenas doses de afeto em forma de perfumes artesanais, mimos e joias que abraçam a alma.
        </p>
        <p style={{ fontSize: "15px", color: C.textBody, lineHeight: 1.85, marginTop: "14px" }}>
          Aqui no litoral gaúcho, embalada pelo barulhinho do mar de Arroio do Sal, eu misturo essências e monto cada caixinha à mão — com amor, cuidado e uma pitada de magia.
        </p>
      </motion.div>

      {/* ── Info cards ── */}
      <div className="px-5 mt-6 flex flex-col gap-3">
        {[
          {
            icon: MapPin,
            title: "Onde nos encontrar",
            body: "Rua das Bromélias, 142 — Centro\nArroio do Sal, RS",
          },
          {
            icon: Clock,
            title: "Horário de atendimento",
            body: "Terça a Sábado: 10h – 19h\nDom e Feriados: 10h – 14h",
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: C.card }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.cardAlt }}>
              <Icon size={16} strokeWidth={1.5} style={{ color: C.primary }} />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>{title}</p>
              <p style={{ fontSize: "12px", color: C.textSub, marginTop: "2px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── WhatsApp CTA ── */}
      <div className="px-5 mt-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)", color: "#FAF3EC", fontSize: "15px", fontWeight: 700, boxShadow: "0 4px 14px rgba(107,58,58,0.28)" }}
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          Falar no WhatsApp
        </motion.button>
      </div>
    </div>
  );
}
