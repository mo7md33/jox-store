import React, { useState } from "react";

const C = {
  bg: "#0D0D0D",
  bgCard: "#141414",
  bgSurface: "#1A1A1A",
  primary: "#C9A84C",
  primaryDark: "#A8832A",
  primaryLight: "#E4C97E",
  border: "#2A2A2A",
  borderGold: "rgba(201,168,76,0.25)",
  text: "#F5F0E8",
  muted: "#888",
  white: "#FFFFFF",
};

const STORE_INFO = {
  phone: "01115394400",
  location: "العياط - الجيزة",
  instagram: "https://www.instagram.com/pan57495?utm_source=qr&igsh=cTZwbG5oY2t5eHJw",
  instagramDM: "https://www.instagram.com/pan57495?utm_source=qr&igsh=cTZwbG5oY2t5eHJw",
  tiktok: "https://www.tiktok.com/@ahmedbahy155?_r=1&_t=ZS-97d8cU9tYzh",
};

const SIZES = {
  قمصان: ["S", "M", "L", "XL", "XXL"],
  تيشرت: ["S", "M", "L", "XL", "XXL"],
  جاكيت: ["S", "M", "L", "XL", "XXL"],
  بناطيل: ["28", "30", "32", "34", "36", "38"],
  كوتشي: ["38", "39", "40", "41", "42", "43", "44"],
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

export default function StorePage({ products, cart, addToCart, removeFromCart, updateQty, onContactClick }) {
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [sizeError, setSizeError] = useState(false);
  const [search, setSearch] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [orderErrors, setOrderErrors] = useState({});

  const categories = ["الكل", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "الكل" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const getSizes = (category) => {
    if (!category) return null;
    return SIZES[category.trim()] || null;
  };

  const hasDiscount = (p) => p.old_price && Number(p.old_price) > Number(p.price);
  const discountPercent = (p) => {
    if (!hasDiscount(p)) return null;
    return Math.round(((Number(p.old_price) - Number(p.price)) / Number(p.old_price)) * 100);
  };

  const handleAddToCart = (product, size = null) => {
    const sizes = getSizes(product.category);
    if (sizes && !size) { setSizeError(true); return; }
    addToCart({ ...product, size });
    setSelectedSize(null);
    setSizeError(false);
  };

  const openOrderModal = () => {
    if (cart.length === 0) return;
    setOrderForm({ name: "", phone: "", address: "", notes: "" });
    setOrderErrors({});
    setShowOrderModal(true);
  };

  const submitOrder = () => {
    const errors = {};
    if (!orderForm.name.trim()) errors.name = true;
    if (!orderForm.phone.trim()) errors.phone = true;
    if (!orderForm.address.trim()) errors.address = true;
    if (Object.keys(errors).length > 0) { setOrderErrors(errors); return; }

    const itemLines = cart
      .map((item) => `- ${item.name}${item.size ? " (مقاس " + item.size + ")" : ""} x${item.qty}`)
      .join("\n");

    const notesLine = orderForm.notes.trim() ? `\n\n📝 ملاحظات:\n${orderForm.notes.trim()}` : "";

    const msg =
      `🛍️ طلب جديد - BANDA\n\n` +
      `👤 العميل:\n${orderForm.name}\n\n` +
      `📞 الهاتف:\n${orderForm.phone}\n\n` +
      `📍 العنوان:\n${orderForm.address}\n\n` +
      `🛒 المنتجات:\n${itemLines}\n\n` +
      `💰 الإجمالي:\n${totalPrice} جنيه` +
      notesLine +
      `\n\nشكراً لك! 🙏`;

    window.open(`https://wa.me/20${STORE_INFO.phone.slice(1)}?text=${encodeURIComponent(msg)}`, "_blank");
    setShowOrderModal(false);
  };

  const instagramOrder = () => window.open(STORE_INFO.instagramDM, "_blank");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, direction: "rtl" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalPop { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes slideCart { from { transform:translateX(-30px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @keyframes shimmerGold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .banda-card { transition: all 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
        .banda-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.4) !important; border-color: rgba(201,168,76,0.5) !important; }
        .banda-card:hover .card-img { transform: scale(1.06); }
        .card-img { transition: transform 0.5s ease; }
        .gold-btn { transition: all 0.3s ease; }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.35) !important; }
        .cat-btn { transition: all 0.25s ease; }
        .cat-btn:hover { transform: translateY(-2px); }
        input::placeholder, textarea::placeholder { color: #555; }
        .order-input { transition: border-color 0.2s, box-shadow 0.2s; }
        .order-input:focus { border-color: #C9A84C !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.12) !important; }
        .order-input.error { border-color: #e74c3c !important; }
        @media (max-width: 600px) {
          .hero-title { font-size: 32px !important; }
          .products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important; gap: 14px !important; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        background: "rgba(13,13,13,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        padding: "0 28px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "76px",
        boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <BandaLogo size={46} />
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.primary, fontSize: "17px", fontWeight: "700", letterSpacing: "3px" }}>
              BANDA
            </div>
            <div style={{ color: C.muted, fontSize: "9px", letterSpacing: "3px", marginTop: "1px" }}>
              CLOTHING STORE
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          className="gold-btn"
          style={{
            background: totalItems > 0 ? "linear-gradient(135deg, #C9A84C, #A8832A)" : "transparent",
            border: `1px solid ${C.primary}`,
            borderRadius: "999px",
            color: totalItems > 0 ? "#0D0D0D" : C.primary,
            padding: "9px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "700",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: totalItems > 0 ? "0 4px 16px rgba(201,168,76,0.25)" : "none",
          }}
        >
          🛒 السلة
          {totalItems > 0 && (
            <span style={{
              background: "#0D0D0D", color: C.primary, borderRadius: "50%",
              width: "22px", height: "22px", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "11px", fontWeight: "800",
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* ── HERO BANNER ── */}
      <div style={{
        textAlign: "center",
        padding: "80px 24px 70px",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        background: "linear-gradient(180deg, #141414 0%, #0D0D0D 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <div style={{ padding: "6px", borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #A8832A)" }}>
            <BandaLogo size={100} />
          </div>
        </div>

        <div style={{ color: C.primary, fontSize: "11px", letterSpacing: "5px", marginBottom: "16px", fontWeight: "600" }}>
          PREMIUM MEN'S FASHION
        </div>

        <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "48px", color: C.text, marginBottom: "14px", fontWeight: "700", lineHeight: "1.2" }}>
          Style That Defines You
        </h1>

        <p style={{ color: C.muted, fontSize: "16px", marginBottom: "32px" }}>
          ستايل رجالي راقي يميزك
        </p>

        <button
          className="gold-btn"
          onClick={() => document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "linear-gradient(135deg, #C9A84C, #A8832A)", color: "#0D0D0D",
            padding: "14px 38px", borderRadius: "999px", border: "none",
            fontWeight: "800", cursor: "pointer", fontSize: "15px",
            letterSpacing: "0.5px", marginBottom: "36px", boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
          }}
        >
          شوف الكولكشن
        </button>

        <div style={{ maxWidth: "440px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="🔍 ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "14px 22px", borderRadius: "999px",
              border: "1px solid rgba(201,168,76,0.25)", background: "#1A1A1A",
              color: C.text, fontSize: "15px", outline: "none",
              textAlign: "right", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "#C9A84C"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(201,168,76,0.25)"; }}
          />
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
      </div>

      {/* ── CATEGORIES ── */}
      <div style={{
        padding: "24px 28px", display: "flex", gap: "10px", flexWrap: "wrap",
        justifyContent: "center", borderBottom: "1px solid rgba(201,168,76,0.12)", background: "#0D0D0D",
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className="cat-btn"
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "9px 22px", borderRadius: "999px",
              border: `1px solid ${activeCategory === cat ? C.primary : "rgba(201,168,76,0.25)"}`,
              background: activeCategory === cat ? "linear-gradient(135deg, #C9A84C, #A8832A)" : "transparent",
              color: activeCategory === cat ? "#0D0D0D" : C.primary,
              fontWeight: "700", fontSize: "14px", whiteSpace: "nowrap",
              cursor: "pointer", letterSpacing: "0.3px",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div
        id="products-section"
        className="products-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "22px", padding: "40px 28px", maxWidth: "1180px", margin: "0 auto",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: C.muted, padding: "80px", gridColumn: "1/-1" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p>مفيش نتايج للبحث ده</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="banda-card"
              style={{
                background: C.bgCard, borderRadius: "18px", overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.15)", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div
                onClick={() => { setSelectedProduct(product); setSelectedSize(null); setSizeError(false); }}
                style={{ position: "relative", paddingTop: "110%", overflow: "hidden", background: "#1A1A1A" }}
              >
                <img
                  src={product.image} alt={product.name} loading="lazy" decoding="async" className="card-img"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", top: "12px", right: "12px",
                  background: "linear-gradient(135deg, #C9A84C, #A8832A)",
                  color: "#0D0D0D", padding: "4px 12px", borderRadius: "999px",
                  fontSize: "10px", fontWeight: "700", letterSpacing: "1px",
                }}>
                  {product.category}
                </div>
                {hasDiscount(product) && (
                  <div style={{
                    position: "absolute", top: "12px", left: "12px",
                    background: "#c0392b", color: "#fff",
                    padding: "4px 12px", borderRadius: "999px", fontSize: "10px", fontWeight: "800",
                  }}>
                    خصم {discountPercent(product)}%
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 50%)", pointerEvents: "none" }} />
              </div>

              <div style={{ padding: "18px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.text, fontSize: "16px", marginBottom: "6px", fontWeight: "600" }}>
                  {product.name}
                </h3>
                {product.description && (
                  <p style={{ color: C.muted, fontSize: "12px", marginBottom: "14px", lineHeight: "1.5" }}>
                    {product.description}
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    {hasDiscount(product) && (
                      <span style={{ color: "#c0392b", textDecoration: "line-through", fontSize: "12px", marginLeft: "6px" }}>
                        {product.old_price} جنيه
                      </span>
                    )}
                    <span style={{ color: C.primary, fontWeight: "800", fontSize: "17px" }}>{product.price} جنيه</span>
                  </div>
                  <button
                    className="gold-btn"
                    onClick={() => { setSelectedProduct(product); setSelectedSize(null); setSizeError(false); }}
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #A8832A)", border: "none",
                      borderRadius: "999px", color: "#0D0D0D", padding: "9px 16px",
                      fontWeight: "700", fontSize: "12px", minWidth: "90px", cursor: "pointer", letterSpacing: "0.3px",
                    }}
                  >
                    اختر مقاس
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(201,168,76,0.2)", padding: "60px 28px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ padding: "4px", borderRadius: "50%", background: "linear-gradient(135deg, #C9A84C, #A8832A)" }}>
            <BandaLogo size={64} />
          </div>
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.primary, fontSize: "22px", marginBottom: "6px", letterSpacing: "5px", fontWeight: "700" }}>
          BANDA
        </div>
        <div style={{ color: C.muted, fontSize: "10px", letterSpacing: "4px", marginBottom: "32px" }}>CLOTHING STORE</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "36px", flexWrap: "wrap", marginBottom: "28px" }}>
          <div style={{ color: "#AAA", fontSize: "14px" }}>📞 {STORE_INFO.phone}</div>
          <div style={{ color: "#AAA", fontSize: "14px" }}>📍 {STORE_INFO.location}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          <a href={STORE_INFO.instagram} target="_blank" rel="noreferrer"
            style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", padding: "10px 22px", color: C.primary, fontSize: "14px", fontWeight: "600", transition: "all 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            📸 Instagram
          </a>
          <a href={STORE_INFO.tiktok} target="_blank" rel="noreferrer"
            style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.4)", borderRadius: "999px", padding: "10px 22px", color: C.primary, fontSize: "14px", fontWeight: "600", transition: "all 0.25s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            🎵 TikTok
          </a>
        </div>
        <button
          className="gold-btn" onClick={onContactClick}
          style={{
            background: "linear-gradient(135deg, #C9A84C, #A8832A)", border: "none",
            borderRadius: "999px", color: "#0D0D0D", padding: "13px 36px",
            fontWeight: "800", fontSize: "15px", cursor: "pointer",
            marginBottom: "36px", boxShadow: "0 4px 16px rgba(201,168,76,0.25)",
          }}
        >
          📩 تواصل معنا
        </button>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "24px", color: "#444", fontSize: "12px", letterSpacing: "1px" }}>
          © 2025 BANDA CLOTHING STORE — جميع الحقوق محفوظة
        </div>
      </footer>

      {/* ── CART DRAWER ── */}
      {showCart && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", justifyContent: "flex-start" }}>
          <div onClick={() => setShowCart(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />
          <div style={{
            position: "relative", width: "390px", maxWidth: "90vw",
            background: "#111", height: "100%", display: "flex", flexDirection: "column",
            borderLeft: "1px solid rgba(201,168,76,0.2)", animation: "slideCart 0.3s ease",
            boxShadow: "0 0 60px rgba(0,0,0,0.6)",
          }}>
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid rgba(201,168,76,0.15)",
              display: "flex", justifyContent: "space-between", alignItems: "center", background: "#141414",
            }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.primary, fontSize: "18px", letterSpacing: "1px" }}>
                السلة 🛒
              </h2>
              <button onClick={() => setShowCart(false)} style={{ background: "none", border: "none", color: C.muted, fontSize: "20px", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", color: C.muted, marginTop: "80px" }}>
                  <div style={{ fontSize: "52px", marginBottom: "16px" }}>🛒</div>
                  <p>السلة فاضية</p>
                  <p style={{ fontSize: "12px", marginTop: "8px", color: "#555" }}>أضف منتجات من المتجر</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                    <img src={item.image} alt={item.name} loading="lazy" decoding="async"
                      style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "10px", border: "1px solid rgba(201,168,76,0.2)" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ color: C.text, fontSize: "14px", marginBottom: "3px", fontWeight: "700" }}>{item.name}</p>
                      {item.size && (
                        <p style={{ color: C.primary, fontSize: "11px", marginBottom: "4px", letterSpacing: "0.5px" }}>مقاس: {item.size}</p>
                      )}
                      <p style={{ color: C.muted, fontSize: "12px", marginBottom: "8px" }}>{item.price} جنيه</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)} style={qtyBtnMinus}>-</button>
                        <span style={{ color: C.text, fontWeight: "700", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} style={qtyBtnPlus}>+</button>
                        <span style={{ color: C.primary, fontSize: "13px", marginRight: "auto", fontWeight: "700" }}>{item.price * item.qty} جنيه</span>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#e74c3c", fontSize: "16px", cursor: "pointer" }}>🗑</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(201,168,76,0.15)", background: "#141414" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
                  <span style={{ color: C.muted }}>الإجمالي:</span>
                  <span style={{ color: C.primary, fontWeight: "800", fontSize: "18px" }}>{totalPrice} جنيه</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={openOrderModal} className="gold-btn" style={{
                    flex: 1, padding: "13px", background: "#25D366", border: "none",
                    borderRadius: "999px", color: "#fff", fontWeight: "800", fontSize: "14px", cursor: "pointer",
                  }}>
                    📱 واتساب
                  </button>
                  <button onClick={instagramOrder} className="gold-btn" style={{
                    flex: 1, padding: "13px", background: "#E1306C", border: "none",
                    borderRadius: "999px", color: "#fff", fontWeight: "800", fontSize: "13px", cursor: "pointer",
                  }}>
                    📸 إنستجرام
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ORDER MODAL ── */}
      {showOrderModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={() => setShowOrderModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)" }} />
          <div style={{
            position: "relative", background: "#141414", borderRadius: "22px",
            border: "1px solid rgba(201,168,76,0.3)", width: "100%", maxWidth: "460px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.1)",
            animation: "modalPop 0.25s ease", overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid rgba(201,168,76,0.15)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "linear-gradient(135deg, rgba(201,168,76,0.08), transparent)",
            }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.primary, fontSize: "18px", letterSpacing: "1px", marginBottom: "2px" }}>
                  تفاصيل الطلب
                </h2>
                <p style={{ color: C.muted, fontSize: "11px", letterSpacing: "2px" }}>BANDA CLOTHING STORE</p>
              </div>
              <button onClick={() => setShowOrderModal(false)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: C.muted, borderRadius: "50%", width: "34px", height: "34px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: "24px" }}>
              {/* ملخص الطلب */}
              <div style={{ background: "#1A1A1A", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", border: "1px solid rgba(201,168,76,0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: C.muted, fontSize: "12px" }}>{totalItems} منتج</span>
                  <span style={{ color: C.primary, fontWeight: "800", fontSize: "16px" }}>{totalPrice} جنيه</span>
                </div>
              </div>

              {/* الاسم */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: C.muted, fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>الاسم *</label>
                <input
                  className={`order-input${orderErrors.name ? " error" : ""}`}
                  placeholder="اسمك الكامل"
                  value={orderForm.name}
                  onChange={(e) => { setOrderForm(p => ({ ...p, name: e.target.value })); setOrderErrors(p => ({ ...p, name: false })); }}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: `1px solid ${orderErrors.name ? "#e74c3c" : "#2A2A2A"}`,
                    background: "#1A1A1A", color: C.text, fontSize: "14px", outline: "none",
                  }}
                />
                {orderErrors.name && <p style={{ color: "#e74c3c", fontSize: "11px", marginTop: "5px" }}>⚠ الاسم مطلوب</p>}
              </div>

              {/* الهاتف */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: C.muted, fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>رقم الهاتف *</label>
                <input
                  className={`order-input${orderErrors.phone ? " error" : ""}`}
                  placeholder="01xxxxxxxxx"
                  value={orderForm.phone}
                  onChange={(e) => { setOrderForm(p => ({ ...p, phone: e.target.value })); setOrderErrors(p => ({ ...p, phone: false })); }}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: `1px solid ${orderErrors.phone ? "#e74c3c" : "#2A2A2A"}`,
                    background: "#1A1A1A", color: C.text, fontSize: "14px", outline: "none",
                  }}
                />
                {orderErrors.phone && <p style={{ color: "#e74c3c", fontSize: "11px", marginTop: "5px" }}>⚠ رقم الهاتف مطلوب</p>}
              </div>

              {/* العنوان */}
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: C.muted, fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>العنوان بالكامل *</label>
                <textarea
                  className={`order-input${orderErrors.address ? " error" : ""}`}
                  placeholder="المحافظة - المدينة - الشارع - رقم المبنى"
                  value={orderForm.address}
                  onChange={(e) => { setOrderForm(p => ({ ...p, address: e.target.value })); setOrderErrors(p => ({ ...p, address: false })); }}
                  rows={2}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: `1px solid ${orderErrors.address ? "#e74c3c" : "#2A2A2A"}`,
                    background: "#1A1A1A", color: C.text, fontSize: "14px", outline: "none",
                    resize: "none", fontFamily: "inherit",
                  }}
                />
                {orderErrors.address && <p style={{ color: "#e74c3c", fontSize: "11px", marginTop: "5px" }}>⚠ العنوان مطلوب</p>}
              </div>

              {/* ملاحظات */}
              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", color: C.muted, fontSize: "11px", letterSpacing: "1px", marginBottom: "6px" }}>ملاحظات (اختياري)</label>
                <textarea
                  className="order-input"
                  placeholder="أي تعليمات أو ملاحظات للطلب..."
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm(p => ({ ...p, notes: e.target.value }))}
                  rows={2}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: "12px",
                    border: "1px solid #2A2A2A", background: "#1A1A1A",
                    color: C.text, fontSize: "14px", outline: "none",
                    resize: "none", fontFamily: "inherit",
                  }}
                />
              </div>

              {/* زرار الإرسال */}
              <button
                onClick={submitOrder}
                className="gold-btn"
                style={{
                  width: "100%", padding: "15px",
                  background: "linear-gradient(135deg, #25D366, #1da851)",
                  border: "none", borderRadius: "999px",
                  color: "#fff", fontWeight: "800", fontSize: "16px",
                  cursor: "pointer", letterSpacing: "0.5px",
                  boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
                }}
              >
                📱 إرسال الطلب على واتساب
              </button>

              <p style={{ textAlign: "center", color: "#444", fontSize: "11px", marginTop: "12px", letterSpacing: "0.5px" }}>
                سيتم فتح واتساب تلقائياً بعد الضغط
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => { setSelectedProduct(null); setSelectedSize(null); setSizeError(false); }}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }}
          />
          <div style={{
            position: "relative", background: "#141414", borderRadius: "22px",
            border: "1px solid rgba(201,168,76,0.3)", maxWidth: "500px", width: "92%",
            overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.15)",
            animation: "modalPop 0.25s ease",
          }}>
            <div style={{ position: "relative", height: "300px", overflow: "hidden", background: "#1A1A1A" }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.8) 0%, transparent 50%)" }} />
            </div>
            <div style={{ padding: "26px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.text, marginBottom: "8px", fontSize: "20px" }}>
                {selectedProduct.name}
              </h2>
              {selectedProduct.description && (
                <p style={{ color: C.muted, marginBottom: "18px", lineHeight: "1.6", fontSize: "14px" }}>
                  {selectedProduct.description}
                </p>
              )}
              {getSizes(selectedProduct.category) && (
                <div style={{ marginBottom: "18px" }}>
                  <p style={{ color: C.primary, fontWeight: "700", marginBottom: "10px", fontSize: "13px", letterSpacing: "1px" }}>
                    اختر المقاس:
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {getSizes(selectedProduct.category).map((size) => (
                      <button key={size}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        style={{
                          padding: "8px 14px", borderRadius: "999px",
                          border: `1px solid ${selectedSize === size ? C.primary : "rgba(201,168,76,0.25)"}`,
                          background: selectedSize === size ? "linear-gradient(135deg, #C9A84C, #A8832A)" : "transparent",
                          color: selectedSize === size ? "#0D0D0D" : C.text,
                          fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "all 0.2s ease",
                        }}>
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p style={{ color: "#e74c3c", fontSize: "12px", marginTop: "8px" }}>⚠️ من فضلك اختر المقاس أول!</p>}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px" }}>
                <div>
                  {hasDiscount(selectedProduct) && (
                    <span style={{ color: "#c0392b", textDecoration: "line-through", fontSize: "13px", marginLeft: "8px" }}>
                      {selectedProduct.old_price} جنيه
                    </span>
                  )}
                  <span style={{ color: C.primary, fontSize: "22px", fontWeight: "800" }}>{selectedProduct.price} جنيه</span>
                </div>
                <button className="gold-btn"
                  onClick={() => {
                    const sizes = getSizes(selectedProduct.category);
                    if (sizes && !selectedSize) { setSizeError(true); return; }
                    handleAddToCart(selectedProduct, selectedSize);
                    setSelectedProduct(null);
                  }}
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #A8832A)", border: "none",
                    borderRadius: "999px", color: "#0D0D0D", padding: "12px 28px",
                    fontWeight: "800", cursor: "pointer", fontSize: "14px", letterSpacing: "0.3px",
                  }}>
                  أضف للسلة
                </button>
              </div>
            </div>
            <button
              onClick={() => { setSelectedProduct(null); setSelectedSize(null); setSizeError(false); }}
              style={{
                position: "absolute", top: "12px", left: "12px",
                background: "rgba(0,0,0,0.6)", border: "1px solid rgba(201,168,76,0.3)",
                color: "#fff", borderRadius: "50%", width: "34px", height: "34px",
                fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const qtyBtnMinus = {
  background: "#2A2A2A", border: "none", borderRadius: "8px",
  color: "#F5F0E8", width: "28px", height: "28px",
  fontSize: "16px", fontWeight: "700", cursor: "pointer",
};

const qtyBtnPlus = {
  background: "linear-gradient(135deg, #C9A84C, #A8832A)", border: "none", borderRadius: "8px",
  color: "#0D0D0D", width: "28px", height: "28px",
  fontSize: "16px", fontWeight: "700", cursor: "pointer",
};
