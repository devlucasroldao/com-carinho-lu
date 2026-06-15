import { motion } from "motion/react";
import { CheckCircle, MapPin, Clock, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface OrderConfirmationProps {
  onBackToHome: () => void;
  orderTotal: number;
}

export function OrderConfirmation({ onBackToHome, orderTotal }: OrderConfirmationProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#D4A574", "#C4867A", "#6B3A3A", "#FAF3EC", "#EDE0D4"],
      });
    }, 500);
  }, []);

  const orderNumber = `LU-${Math.floor(Math.random() * 90000) + 10000}`;

  return (
    <div style={{ minHeight: "100%", paddingBottom: 96, display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF3EC", fontFamily: "'Lato', sans-serif" }}>
      <div className="w-full max-w-[430px] px-5 pt-16 flex flex-col items-center text-center">

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #6B3A3A, #C4867A)" }}
        >
          <CheckCircle size={44} className="text-[#FAF3EC]" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "30px", color: "#2C1810", lineHeight: 1.2 }}>
            Pedido confirmado!
          </h1>
          <p style={{ fontSize: "14px", color: "#8B6B5A", marginTop: "8px", lineHeight: 1.6 }}>
            Que alegria! 🎉 Seu presente já está nas mãos carinhosas da Lu.
          </p>
        </motion.div>

        {/* Order info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-8 p-5 rounded-3xl text-left"
          style={{ background: "#FDF8F3", boxShadow: "0 4px 20px rgba(107,58,58,0.10)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p style={{ fontSize: "10px", color: "#8B6B5A", letterSpacing: "1px", textTransform: "uppercase" }}>Número do pedido</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#6B3A3A" }}>{orderNumber}</p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: "10px", color: "#8B6B5A", letterSpacing: "1px", textTransform: "uppercase" }}>Total pago</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#2C1810" }}>
                R$ {orderTotal.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          <div className="h-px mb-4" style={{ background: "rgba(107,58,58,0.12)" }} />

          {[
            { icon: Clock, title: "Prazo de entrega", desc: "Hoje até às 20h (entrega local) 🏍️" },
            { icon: MapPin, title: "Embalagem artesanal", desc: "Com laço de cetim e cartão personalizado 🎀" },
            { icon: MessageCircle, title: "Acompanhe seu pedido", desc: "Você receberá atualizações no WhatsApp" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#F2E8DE" }}>
                <Icon size={14} className="text-[#6B3A3A]" />
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#2C1810" }}>{title}</p>
                <p style={{ fontSize: "11px", color: "#8B6B5A", marginTop: "1px" }}>{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Warm message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 rounded-2xl w-full"
          style={{ background: "linear-gradient(135deg, #6B3A3A, #C4867A)" }}
        >
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "#FAF3EC", lineHeight: 1.6, fontStyle: "italic" }}>
            "Cada pedido é preparado com muito amor e atenção. Obrigada por confiar em nós! ✨"
          </p>
          <p style={{ fontSize: "11px", color: "#D4A574", marginTop: "6px", fontWeight: 600 }}>— Lu 💛</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="w-full flex flex-col gap-3 mt-8"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onBackToHome}
            className="w-full py-4 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)", color: "#FAF3EC", fontSize: "15px", fontWeight: 700, boxShadow: "0 4px 16px rgba(107,58,58,0.3)" }}
          >
            Continuar comprando 🛍️
          </motion.button>
          <button
            className="w-full py-3.5 rounded-2xl"
            style={{ background: "#F2E8DE", color: "#6B3A3A", fontSize: "14px", fontWeight: 600 }}
          >
            Acompanhar entrega
          </button>
        </motion.div>
      </div>
    </div>
  );
}
