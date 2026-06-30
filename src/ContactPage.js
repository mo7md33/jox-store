import React, { useState } from "react";

const C = {
  bg: "#0D0D0D",
  bgCard: "#141414",
  bgSurface: "#1A1A1A",
  primary: "#C9A84C",
  primaryDark: "#A8832A",
  border: "#2A2A2A",
  text: "#F5F0E8",
  muted: "#888",
};

function BandaLogo({ size = 50 }) {
  return (
    <img
      src="/banda-logo.jpg"
      alt="BANDA Clothing Store"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #C9A84C",
        display: "block",
      }}
    />
  );
}

export default function ContactPage({ onBack }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [backHover, setBackHover] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.phone) {
      alert("من فضلك ادخل اسمك ورقمك");
      return;
    }
    const msg = `مرحباً BANDA CLOTHING STORE 👋\nاسمي: ${form.name}\nرقمي: ${form.phone}\n${form.message ? "رسالتي: " + form.message : ""}`;
    window.open(`https://wa.me/201101708750?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, direction: "rtl" }}>
      <style>{`
        input::placeholder, textarea::placeholder { color: #555; }
        .contact-input:focus { border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.1) !important; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        background: "#141414",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <BandaLogo size={42} />
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: C.primary,
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "3px",
            }}>
              BANDA
            </div>
            <div style={{ color: C.muted, fontSize: "9px", letterSpacing: "3px" }}>
              CLOTHING STORE
            </div>
          </div>
        </div>

        <button
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
          onClick={onBack}
          style={{
            background: backHover ? "rgba(201,168,76,0.08)" : "transparent",
            border: `1px solid ${backHover ? C.primary : "rgba(201,168,76,0.35)"}`,
            borderRadius: "999px",
            padding: "9px 20px",
            color: C.primary,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.25s ease",
          }}
        >
          ← رجوع
        </button>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: "520px", margin: "60px auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-block",
            padding: "5px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C9A84C, #A8832A)",
            marginBottom: "20px",
          }}>
            <BandaLogo size={80} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: C.text,
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "8px",
            letterSpacing: "1px",
          }}>
            تواصل معنا
          </h1>

          <p style={{ color: C.muted, fontSize: "14px" }}>هنرد عليك في أقرب وقت</p>

          {/* Decorative divider */}
          <div style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            margin: "18px auto 0",
          }} />
        </div>

        {!sent ? (
          <div style={{
            background: "#141414",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          }}>
            <input
              className="contact-input"
              placeholder="اسمك *"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              style={inputStyle}
            />

            <input
              className="contact-input"
              placeholder="رقمك *"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              style={inputStyle}
            />

            <textarea
              className="contact-input"
              placeholder="رسالتك (اختياري)"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              style={{ ...inputStyle, height: "110px", resize: "none" }}
            />

            <button
              onClick={handleSend}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "999px",
                border: "none",
                background: "#25D366",
                color: "#fff",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "16px",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.25)"; }}
            >
              📱 ارسال على واتساب
            </button>

            <p style={{ textAlign: "center", color: "#555", fontSize: "11px", marginTop: "14px", letterSpacing: "0.5px" }}>
              سنتواصل معك خلال 24 ساعة
            </p>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            background: "#141414",
            padding: "50px 36px",
            borderRadius: "20px",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>✅</div>
            <h2 style={{
              color: C.primary,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "22px",
              marginBottom: "10px",
            }}>
              تم الإرسال!
            </h2>
            <p style={{ color: C.muted, fontSize: "14px", marginBottom: "28px" }}>
              شكراً للتواصل معنا، هنرد عليك قريباً
            </p>
            <button
              onClick={onBack}
              style={{
                background: "linear-gradient(135deg, #C9A84C, #A8832A)",
                color: "#0D0D0D",
                border: "none",
                padding: "12px 32px",
                borderRadius: "999px",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              رجوع للمتجر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid #2A2A2A",
  background: "#1A1A1A",
  color: "#F5F0E8",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  display: "block",
};
