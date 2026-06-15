import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/logo_com_carinho_lu2.png";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "14px",
    color: "#2C1810",
    background: "transparent",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="flex flex-col min-h-full pb-10" style={{ background: "#FAF3EC", fontFamily: "'Lato', sans-serif" }}>
      {/* Logo hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center pt-16 pb-8 px-6"
        style={{ background: "linear-gradient(180deg, #FDF8F3 0%, #FAF3EC 100%)" }}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4" style={{ background: "#FDF8F3", boxShadow: "0 4px 20px rgba(107,58,58,0.12)" }}>
          <ImageWithFallback src={logoImg} alt="Com Carinho, Lu" className="w-full h-full object-contain p-1" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#2C1810", textAlign: "center", lineHeight: 1.25 }}>
          {mode === "login" ? "Bem-vinda de volta! 💛" : "Criar minha conta"}
        </h1>
        <p style={{ fontSize: "13px", color: "#8B6B5A", marginTop: "6px", textAlign: "center" }}>
          {mode === "login"
            ? "Entre para acessar seus favoritos e pedidos"
            : "Junte-se ao universo Com Carinho, Lu"}
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 px-6 flex flex-col gap-4"
      >
        {mode === "register" && (
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: "#FDF8F3", boxShadow: "0 2px 8px rgba(107,58,58,0.08)" }}>
            <User size={16} strokeWidth={1.5} className="text-[#8B6B5A] flex-shrink-0" />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              style={inputStyle}
            />
          </div>
        )}

        <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: "#FDF8F3", boxShadow: "0 2px 8px rgba(107,58,58,0.08)" }}>
          <Mail size={16} strokeWidth={1.5} className="text-[#8B6B5A] flex-shrink-0" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            style={inputStyle}
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ background: "#FDF8F3", boxShadow: "0 2px 8px rgba(107,58,58,0.08)" }}>
          <Lock size={16} strokeWidth={1.5} className="text-[#8B6B5A] flex-shrink-0" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            style={{ ...inputStyle, flex: 1 }}
          />
          <button onClick={() => setShowPassword(v => !v)}>
            {showPassword
              ? <EyeOff size={16} strokeWidth={1.5} className="text-[#8B6B5A]" />
              : <Eye size={16} strokeWidth={1.5} className="text-[#8B6B5A]" />}
          </button>
        </div>

        {mode === "login" && (
          <button className="self-end" style={{ fontSize: "12px", color: "#6B3A3A", fontWeight: 600 }}>
            Esqueci minha senha
          </button>
        )}

        {/* Primary CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogin}
          className="w-full py-4 rounded-2xl mt-1"
          style={{ background: "linear-gradient(135deg, #6B3A3A, #8B4D4D)", color: "#FAF3EC", fontSize: "15px", fontWeight: 700, boxShadow: "0 4px 16px rgba(107,58,58,0.28)" }}
        >
          {mode === "login" ? "Entrar" : "Criar conta"}
        </motion.button>

        {/* Toggle mode */}
        <button onClick={() => setMode(m => m === "login" ? "register" : "login")} className="text-center">
          <span style={{ fontSize: "13px", color: "#8B6B5A" }}>
            {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
          </span>
          <span style={{ fontSize: "13px", color: "#6B3A3A", fontWeight: 700 }}>
            {mode === "login" ? "Criar minha conta" : "Entrar"}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px" style={{ background: "rgba(107,58,58,0.15)" }} />
          <span style={{ fontSize: "12px", color: "#8B6B5A" }}>ou</span>
          <div className="flex-1 h-px" style={{ background: "rgba(107,58,58,0.15)" }} />
        </div>

        {/* Google */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onLogin}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-3"
          style={{ background: "#FDF8F3", border: "1.5px solid rgba(107,58,58,0.2)", fontSize: "14px", fontWeight: 600, color: "#2C1810" }}
        >
          {/* Google G icon */}
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar com Google
        </motion.button>
      </motion.div>
    </div>
  );
}

// small inline component used above
function User(props: React.ComponentProps<typeof Mail>) {
  return (
    <svg width={props.size as number} height={props.size as number} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth as number} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
