import React, { useState } from "react";

const COLORS = {
  bg: "#F8F6F1",
  primary: "#1B3325",
  oldPrimary: "#1e4d2b",
  border: "#E5E0D8",
  accent: "#C6A56B",
  text: "#1A1A1A",
  muted: "#666",
  white: "#ffffff",
};

const STORE_INFO = {
  phone: "01101708750",
  location: "العياط - الجيزة",
  instagram: "https://www.instagram.com/jox._eg",
  tiktok: "https://www.tiktok.com/@jox_eg2",
};

const SIZES = {
  قمصان: ["S", "M", "L", "XL", "XXL"],
  تيشرت: ["S", "M", "L", "XL", "XXL"],
  جاكيت: ["S", "M", "L", "XL", "XXL"],
  بناطيل: ["28", "30", "32", "34", "36", "38"],
  كوتشي: ["38", "39", "40", "41", "42", "43", "44"],
};

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
        fill={COLORS.bg}
        stroke={COLORS.primary}
        strokeWidth="2"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="900"
        fontSize="38"
        fill={COLORS.primary}
        letterSpacing="-2"
      >
        JOX
      </text>
      <path
        d="M25 70 Q50 78 75 70"
        stroke={COLORS.primary}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StorePage({
  products,
  cart,
  addToCart,
  removeFromCart,
  updateQty,
  onContactClick,
}) {
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [sizeError, setSizeError] = useState(false);
  const [search, setSearch] = useState("");

  const categories = ["الكل", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchCategory =
      activeCategory === "الكل" || p.category === activeCategory;
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

  const handleAddToCart = (product, size = null) => {
    const sizes = getSizes(product.category);
    if (sizes && !size) {
      setSizeError(true);
      return;
    }
    addToCart({ ...product, size });
    setSelectedSize(null);
    setSizeError(false);
  };

  const whatsappOrder = () => {
    if (cart.length === 0) return;

    const items = cart
      .map(
        (item) =>
          `• ${item.name}${item.size ? " - مقاس " + item.size : ""} × ${item.qty} = ${item.price * item.qty} جنيه\n  📸 ${item.image}`,
      )
      .join("\n");

    const msg = `مرحباً JOX STORE 👋\nعايز أطلب:\n${items}\n\nالإجمالي: ${totalPrice} جنيه`;
    window.open(
      `https://wa.me/2${STORE_INFO.phone}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        direction: "rtl",
        animation: "fadeIn 0.5s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideCart {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "74px",
          boxShadow: "0 4px 20px rgba(27,51,37,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <JoxLogo size={48} />
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                color: COLORS.primary,
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "2px",
              }}
            >
              JOX.EG
            </div>
            <div
              style={{
                color: COLORS.accent,
                fontSize: "10px",
                letterSpacing: "3px",
              }}
            >
              MENS FASHION
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          style={{
            background: totalItems > 0 ? COLORS.primary : COLORS.white,
            border: `1px solid ${COLORS.primary}`,
            borderRadius: "999px",
            color: totalItems > 0 ? COLORS.white : COLORS.primary,
            padding: "9px 18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "700",
            fontSize: "14px",
            transition: "all 0.3s ease",
            cursor: "pointer",
            boxShadow:
              totalItems > 0 ? "0 8px 22px rgba(27,51,37,0.18)" : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🛒 السلة
          {totalItems > 0 && (
            <span
              style={{
                background: COLORS.bg,
                color: COLORS.primary,
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "64px 24px 42px",
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.white,
        }}
      >
        <JoxLogo size={90} />

        <div
          style={{
            marginTop: "20px",
            color: COLORS.accent,
            fontSize: "12px",
            letterSpacing: "4px",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          PREMIUM COLLECTION
        </div>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "42px",
            color: COLORS.primary,
            marginBottom: "12px",
            lineHeight: "1.2",
          }}
        >
          هنا هنميزك يعني هنميزك 😉😄
        </h1>

        <p
          style={{
            color: COLORS.muted,
            fontSize: "15px",
            marginBottom: "24px",
          }}
        >
          اختر من أرقى تشكيلات الملابس الرجالية
        </p>

        <div style={{ maxWidth: "420px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="🔍 ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 22px",
              borderRadius: "999px",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.bg,
              color: COLORS.text,
              fontSize: "15px",
              outline: "none",
              textAlign: "right",
              boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottom: `1px solid ${COLORS.border}`,
          background: COLORS.bg,
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "9px 20px",
              borderRadius: "999px",
              border: `1px solid ${COLORS.primary}`,
              background:
                activeCategory === cat ? COLORS.primary : "transparent",
              color: activeCategory === cat ? COLORS.white : COLORS.primary,
              fontWeight: "700",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              if (activeCategory !== cat) {
                e.currentTarget.style.background = COLORS.white;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              if (activeCategory !== cat) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
          padding: "36px 24px",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: COLORS.muted,
              padding: "60px",
              gridColumn: "1/-1",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p>مفيش نتايج للبحث ده</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              style={{
                background: COLORS.white,
                borderRadius: "18px",
                overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 5px 18px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-7px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 34px rgba(27,51,37,0.12)";
                e.currentTarget.style.borderColor = COLORS.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 18px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = COLORS.border;
              }}
            >
              <div
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize(null);
                  setSizeError(false);
                }}
                style={{
                  position: "relative",
                  paddingTop: "110%",
                  overflow: "hidden",
                  background: COLORS.bg,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.07)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />

                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: COLORS.primary,
                    color: COLORS.white,
                    padding: "5px 12px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                  }}
                >
                  {product.category}
                </div>
              </div>

              <div style={{ padding: "18px" }}>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    color: COLORS.text,
                    fontSize: "17px",
                    marginBottom: "7px",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    color: COLORS.muted,
                    fontSize: "13px",
                    marginBottom: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      color: COLORS.primary,
                      fontWeight: "800",
                      fontSize: "18px",
                    }}
                  >
                    {product.price} جنيه
                  </span>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(null);
                      setSizeError(false);
                    }}
                    style={{
                      background: COLORS.primary,
                      border: "none",
                      borderRadius: "999px",
                      color: COLORS.white,
                      padding: "9px 16px",
                      fontWeight: "700",
                      fontSize: "13px",
                      minWidth: "92px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.background = "#14281D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.background = COLORS.primary;
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

      {/* Footer */}
      <footer
        style={{
          background: COLORS.primary,
          padding: "42px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <JoxLogo size={60} />
        </div>

        <div
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.bg,
            fontSize: "22px",
            marginBottom: "24px",
            letterSpacing: "3px",
          }}
        >
          JOX.EG
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div style={{ color: COLORS.bg, fontSize: "14px" }}>
            📞 {STORE_INFO.phone}
          </div>
          <div style={{ color: COLORS.bg, fontSize: "14px" }}>
            📍 {STORE_INFO.location}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={STORE_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            style={{
              background: COLORS.bg,
              borderRadius: "999px",
              padding: "10px 20px",
              color: COLORS.primary,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            📸 Instagram
          </a>

          <a
            href={STORE_INFO.tiktok}
            target="_blank"
            rel="noreferrer"
            style={{
              background: COLORS.bg,
              borderRadius: "999px",
              padding: "10px 20px",
              color: COLORS.primary,
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            🎵 TikTok
          </a>
        </div>

        <button
          onClick={onContactClick}
          style={{
            background: COLORS.accent,
            border: "none",
            borderRadius: "999px",
            color: COLORS.primary,
            padding: "12px 32px",
            fontWeight: "800",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          📩 تواصل معنا
        </button>
      </footer>

      {/* Cart Drawer */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "370px",
              maxWidth: "90vw",
              background: COLORS.white,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderLeft: `1px solid ${COLORS.border}`,
              animation: "slideCart 0.3s ease",
              boxShadow: "0 0 40px rgba(0,0,0,0.12)",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: `1px solid ${COLORS.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  color: COLORS.primary,
                  fontSize: "20px",
                }}
              >
                السلة 🛒
              </h2>

              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.muted,
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: COLORS.muted,
                    marginTop: "60px",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    🛒
                  </div>
                  <p>السلة فاضية</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: COLORS.text,
                          fontSize: "14px",
                          marginBottom: "4px",
                          fontWeight: "700",
                        }}
                      >
                        {item.name}
                      </p>

                      {item.size && (
                        <p
                          style={{
                            color: COLORS.accent,
                            fontSize: "12px",
                            marginBottom: "4px",
                          }}
                        >
                          مقاس: {item.size}
                        </p>
                      )}

                      <p
                        style={{
                          color: COLORS.primary,
                          fontSize: "13px",
                          marginBottom: "8px",
                        }}
                      >
                        {item.price} جنيه
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          style={qtyBtnLight}
                        >
                          -
                        </button>
                        <span
                          style={{
                            color: COLORS.text,
                            fontWeight: "700",
                            minWidth: "20px",
                            textAlign: "center",
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={qtyBtnDark}
                        >
                          +
                        </button>
                        <span
                          style={{
                            color: COLORS.primary,
                            fontSize: "13px",
                            marginRight: "auto",
                          }}
                        >
                          {item.price * item.qty} جنيه
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#e74c3c",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div
                style={{
                  padding: "20px 24px",
                  borderTop: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ color: COLORS.muted }}>الإجمالي:</span>
                  <span
                    style={{
                      color: COLORS.primary,
                      fontWeight: "800",
                      fontSize: "18px",
                    }}
                  >
                    {totalPrice} جنيه
                  </span>
                </div>

                <button
                  onClick={whatsappOrder}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "#25D366",
                    border: "none",
                    borderRadius: "999px",
                    color: "#fff",
                    fontWeight: "800",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  📱 اطلب عبر WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => {
              setSelectedProduct(null);
              setSelectedSize(null);
              setSizeError(false);
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.48)",
            }}
          />

          <div
            style={{
              position: "relative",
              background: COLORS.white,
              borderRadius: "20px",
              border: `1px solid ${COLORS.border}`,
              maxWidth: "480px",
              width: "90%",
              overflow: "hidden",
              boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
              animation: "modalPop 0.25s ease",
            }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "24px" }}>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  color: COLORS.text,
                  marginBottom: "8px",
                }}
              >
                {selectedProduct.name}
              </h2>

              <p
                style={{
                  color: COLORS.muted,
                  marginBottom: "16px",
                  lineHeight: "1.6",
                }}
              >
                {selectedProduct.description}
              </p>

              {getSizes(selectedProduct.category) && (
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      color: COLORS.primary,
                      fontWeight: "700",
                      marginBottom: "10px",
                      fontSize: "14px",
                    }}
                  >
                    اختر المقاس:
                  </p>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {getSizes(selectedProduct.category).map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        style={{
                          padding: "9px 15px",
                          borderRadius: "999px",
                          border: `1px solid ${selectedSize === size ? COLORS.primary : COLORS.border}`,
                          background:
                            selectedSize === size
                              ? COLORS.primary
                              : COLORS.white,
                          color:
                            selectedSize === size ? COLORS.white : COLORS.text,
                          fontWeight: "700",
                          fontSize: "14px",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {sizeError && (
                    <p
                      style={{
                        color: "#e74c3c",
                        fontSize: "13px",
                        marginTop: "8px",
                      }}
                    >
                      ⚠️ من فضلك اختر المقاس أول!
                    </p>
                  )}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    color: COLORS.primary,
                    fontSize: "22px",
                    fontWeight: "800",
                  }}
                >
                  {selectedProduct.price} جنيه
                </span>

                <button
                  onClick={() => {
                    const sizes = getSizes(selectedProduct.category);
                    if (sizes && !selectedSize) {
                      setSizeError(true);
                      return;
                    }
                    handleAddToCart(selectedProduct, selectedSize);
                    setSelectedProduct(null);
                  }}
                  style={{
                    background: COLORS.primary,
                    border: "none",
                    borderRadius: "999px",
                    color: COLORS.white,
                    padding: "12px 26px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  أضف للسلة
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedProduct(null);
                setSelectedSize(null);
                setSizeError(false);
              }}
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "rgba(0,0,0,0.55)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const qtyBtnLight = {
  background: "#EFEAE1",
  border: "none",
  borderRadius: "8px",
  color: "#1A1A1A",
  width: "28px",
  height: "28px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

const qtyBtnDark = {
  background: COLORS.primary,
  border: "none",
  borderRadius: "8px",
  color: COLORS.white,
  width: "28px",
  height: "28px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};
