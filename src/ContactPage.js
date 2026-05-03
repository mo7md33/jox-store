import React, { useState } from "react";

function JoxLogo({ size = 50 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="#f0ebe0"
        stroke="#1e4d2b"
        strokeWidth="2"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="900"
        fontSize="38"
        fill="#1e4d2b"
        letterSpacing="-2"
      >
        JOX
      </text>
      <path
        d="M25 70 Q50 78 75 70"
        stroke="#1e4d2b"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
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
    window.open(
      `https://wa.me/201101708750?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setSent(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1a0f",
        direction: "rtl",
        fontFamily: "Raleway, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#0f1a0f",
          borderBottom: "1px solid #1e4d2b55",
          padding: "0 24px",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <JoxLogo size={44} />
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                color: "#f0ebe0",
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              JOX.EG
            </div>
            <div
              style={{
                color: "#4a7c5a",
                fontSize: "10px",
                letterSpacing: "3px",
              }}
            >
              MENS FASHION
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid #1e4d2b",
            borderRadius: "8px",
            color: "#f0ebe0",
            padding: "8px 16px",
            fontSize: "13px",
          }}
        >
          ← رجوع للمتجر
        </button>
      </header>

      {/* Content */}
      <div
        style={{ maxWidth: "500px", margin: "60px auto", padding: "0 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <JoxLogo size={70} />
          <h1
            style={{
              fontFamily: "Georgia, serif",
              color: "#f0ebe0",
              fontSize: "32px",
              marginTop: "20px",
              marginBottom: "8px",
            }}
          >
            تواصل معنا
          </h1>
          <p style={{ color: "#4a7c5a", fontSize: "14px" }}>
            هنرد عليك في أقرب وقت 💚
          </p>
        </div>

        {!sent ? (
          <div
            style={{
              background: "#162016",
              border: "1px solid #1e4d2b44",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  color: "#4a7c5a",
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                الاسم *
              </label>
              <input
                type="text"
                placeholder="اسمك"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#0f1a0f",
                  border: "1px solid #2a3a2a",
                  borderRadius: "8px",
                  color: "#f0ebe0",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  color: "#4a7c5a",
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                رقم الموبايل *
              </label>
              <input
                type="tel"
                placeholder="01xxxxxxxxx"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#0f1a0f",
                  border: "1px solid #2a3a2a",
                  borderRadius: "8px",
                  color: "#f0ebe0",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: "28px" }}>
              <label
                style={{
                  color: "#4a7c5a",
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                رسالتك (اختياري)
              </label>
              <textarea
                placeholder="اكتب رسالتك هنا..."
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "#0f1a0f",
                  border: "1px solid #2a3a2a",
                  borderRadius: "8px",
                  color: "#f0ebe0",
                  fontSize: "15px",
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>

            <button
              onClick={handleSend}
              style={{
                width: "100%",
                padding: "14px",
                background: "#25D366",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: "700",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              📱 ابعت على WhatsApp
            </button>

            {/* Social Links */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <a
                href="https://www.instagram.com/jox._eg"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#0f1a0f",
                  border: "1px solid #1e4d2b44",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "#7ab88a",
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📸 Instagram
              </a>
              <a
                href="https://www.tiktok.com/@jox_eg2"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#0f1a0f",
                  border: "1px solid #1e4d2b44",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  color: "#7ab88a",
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#162016",
              border: "1px solid #1e4d2b",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>✅</div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                color: "#f0ebe0",
                marginBottom: "12px",
              }}
            >
              تم الإرسال!
            </h2>
            <p style={{ color: "#4a7c5a", marginBottom: "24px" }}>
              هنرد عليك على واتساب في أقرب وقت 💚
            </p>
            <button
              onClick={onBack}
              style={{
                background: "#1e4d2b",
                border: "none",
                borderRadius: "8px",
                color: "#f0ebe0",
                padding: "12px 32px",
                fontWeight: "700",
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
