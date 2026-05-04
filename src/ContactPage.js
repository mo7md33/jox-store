import React, { useState } from "react";

const COLORS = {
  bg: "#F8F6F1",
  primary: "#1B3325",
  border: "#E5E0D8",
  accent: "#C6A56B",
  text: "#1A1A1A",
  white: "#FFFFFF"
};

function JoxLogo({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill={COLORS.bg} stroke={COLORS.primary} strokeWidth="2"/>
      <text x="50" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="38" fill={COLORS.primary}>JOX</text>
    </svg>
  );
}

export default function ContactPage({ onBack }) {

  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.phone) {
      alert("من فضلك ادخل اسمك ورقمك");
      return;
    }

    const msg = `مرحباً JOX STORE 👋\nاسمي: ${form.name}\nرقمي: ${form.phone}\n${form.message ? "رسالتي: " + form.message : ""}`;

    window.open(`https://wa.me/201101708750?text=${encodeURIComponent(msg)}`, "_blank");

    setSent(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      direction: "rtl"
    }}>

      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: `1px solid ${COLORS.border}`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <JoxLogo size={45}/>
          <div>
            <div style={{ fontWeight: "800", color: COLORS.primary }}>JOX.EG</div>
            <div style={{ fontSize: "10px", color: COLORS.accent }}>MEN'S WEAR</div>
          </div>
        </div>

        <button onClick={onBack} style={{
          background: "transparent",
          border: `1px solid ${COLORS.primary}`,
          borderRadius: "999px",
          padding: "8px 16px",
          color: COLORS.primary,
          cursor: "pointer"
        }}>
          رجوع
        </button>
      </header>

      {/* CONTENT */}
      <div style={{ maxWidth: "500px", margin: "60px auto", padding: "0 20px" }}>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <JoxLogo size={70}/>
          <h1 style={{
            fontFamily: "Georgia, serif",
            color: COLORS.primary,
            marginTop: "20px"
          }}>
            تواصل معنا
          </h1>
          <p style={{ color: "#777" }}>هنرد عليك في أقرب وقت</p>
        </div>

        {!sent ? (
          <div style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.05)"
          }}>

            {/* NAME */}
            <input
              placeholder="اسمك"
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              style={inputStyle}
            />

            {/* PHONE */}
            <input
              placeholder="رقمك"
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              style={inputStyle}
            />

            {/* MESSAGE */}
            <textarea
              placeholder="رسالتك (اختياري)"
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              style={{ ...inputStyle, height: "100px" }}
            />

            <button onClick={handleSend} style={{
              width: "100%",
              padding: "14px",
              borderRadius: "999px",
              border: "none",
              background: "#25D366",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer"
            }}>
              ارسال على واتساب
            </button>

          </div>
        ) : (
          <div style={{
            textAlign: "center",
            background: COLORS.white,
            padding: "40px",
            borderRadius: "16px"
          }}>
            <h2 style={{ color: COLORS.primary }}>تم الإرسال ✔</h2>
            <button onClick={onBack} style={{
              marginTop: "20px",
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "999px"
            }}>
              رجوع
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none"
};
