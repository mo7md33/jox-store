import React, { useState } from "react";

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

  const categories = ["الكل", ...new Set(products.map((p) => p.category))];
  const filtered =
    activeCategory === "الكل"
      ? products
      : products.filter((p) => p.category === activeCategory);
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
          `• ${item.name}${item.size ? " - مقاس " + item.size : ""} × ${item.qty} = ${item.price * item.qty} جنيه`,
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
      style={{ minHeight: "100vh", background: "#f0ebe0", direction: "rtl" }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "2px solid #1e4d2b22",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px",
          boxShadow: "0 2px 10px #1e4d2b11",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <JoxLogo size={48} />
          <div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                color: "#1e4d2b",
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
          onClick={() => setShowCart(true)}
          style={{
            background: totalItems > 0 ? "#1e4d2b" : "transparent",
            border: "2px solid #1e4d2b",
            borderRadius: "8px",
            color: totalItems > 0 ? "#f0ebe0" : "#1e4d2b",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.3s",
          }}
        >
          🛒 السلة{" "}
          {totalItems > 0 && (
            <span
              style={{
                background: "#f0ebe0",
                color: "#1e4d2b",
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
          padding: "60px 24px 40px",
          borderBottom: "1px solid #1e4d2b22",
          background: "#ffffff",
        }}
      >
        <JoxLogo size={90} />
        <div
          style={{
            marginTop: "20px",
            color: "#4a7c5a",
            fontSize: "12px",
            letterSpacing: "4px",
            marginBottom: "12px",
          }}
        >
          PREMIUM COLLECTION
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "42px",
            color: "#1e4d2b",
            marginBottom: "12px",
            lineHeight: "1.2",
          }}
        >
          أناقة لا حدود لها
        </h1>
        <p style={{ color: "#555", fontSize: "15px" }}>
          اختر من أرقى تشكيلات الملابس الرجالية
        </p>
      </div>

      {/* Categories */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          borderBottom: "1px solid #1e4d2b22",
          background: "#f0ebe0",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              border: "2px solid #1e4d2b",
              background: activeCategory === cat ? "#1e4d2b" : "transparent",
              color: activeCategory === cat ? "#f0ebe0" : "#1e4d2b",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
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
          padding: "32px 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              border: "2px solid #e0d9cc",
              transition: "all 0.3s",
              cursor: "pointer",
              boxShadow: "0 2px 8px #1e4d2b11",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#1e4d2b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#e0d9cc")
            }
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
                  transition: "transform 0.5s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "#1e4d2b",
                  color: "#f0ebe0",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                }}
              >
                {product.category}
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#1a1a1a",
                  fontSize: "16px",
                  marginBottom: "6px",
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "12px",
                  marginBottom: "12px",
                }}
              >
                {product.description}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#1e4d2b",
                    fontWeight: "700",
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
                    background: "#1e4d2b",
                    border: "none",
                    borderRadius: "6px",
                    color: "#f0ebe0",
                    padding: "8px 16px",
                    fontWeight: "600",
                    fontSize: "13px",
                    minWidth: "90px",
                  }}
                >
                  اختر مقاس
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#1e4d2b",
          padding: "40px 24px",
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
            color: "#f0ebe0",
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
          <div style={{ color: "#f0ebe0", fontSize: "14px" }}>
            📞 {STORE_INFO.phone}
          </div>
          <div style={{ color: "#f0ebe0", fontSize: "14px" }}>
            📍 {STORE_INFO.location}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <a
            href={STORE_INFO.instagram}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#f0ebe0",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "#1e4d2b",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            📸 Instagram
          </a>
          <a
            href={STORE_INFO.tiktok}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#f0ebe0",
              borderRadius: "8px",
              padding: "10px 20px",
              color: "#1e4d2b",
              textDecoration: "none",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: "600",
            }}
          >
            🎵 TikTok
          </a>
        </div>
        <button
          onClick={onContactClick}
          style={{
            background: "#f0ebe0",
            border: "none",
            borderRadius: "8px",
            color: "#1e4d2b",
            padding: "12px 32px",
            fontWeight: "700",
            fontSize: "15px",
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
            style={{ position: "absolute", inset: 0, background: "#00000066" }}
          />
          <div
            style={{
              position: "relative",
              width: "360px",
              maxWidth: "90vw",
              background: "#ffffff",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderLeft: "2px solid #1e4d2b22",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e0d9cc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#1e4d2b",
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
                  color: "#555",
                  fontSize: "20px",
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
                    color: "#555",
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
                      borderBottom: "1px solid #e0d9cc",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "#1a1a1a",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.size && (
                        <p
                          style={{
                            color: "#4a7c5a",
                            fontSize: "12px",
                            marginBottom: "4px",
                          }}
                        >
                          مقاس: {item.size}
                        </p>
                      )}
                      <p
                        style={{
                          color: "#1e4d2b",
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
                          style={{
                            background: "#e0d9cc",
                            border: "none",
                            borderRadius: "4px",
                            color: "#1a1a1a",
                            width: "28px",
                            height: "28px",
                            fontSize: "16px",
                            fontWeight: "700",
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            color: "#1a1a1a",
                            fontWeight: "700",
                            minWidth: "20px",
                            textAlign: "center",
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{
                            background: "#1e4d2b",
                            border: "none",
                            borderRadius: "4px",
                            color: "#f0ebe0",
                            width: "28px",
                            height: "28px",
                            fontSize: "16px",
                            fontWeight: "700",
                          }}
                        >
                          +
                        </button>
                        <span
                          style={{
                            color: "#1e4d2b",
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
                style={{ padding: "20px 24px", borderTop: "1px solid #e0d9cc" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span style={{ color: "#555" }}>الإجمالي:</span>
                  <span
                    style={{
                      color: "#1e4d2b",
                      fontWeight: "700",
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
                    borderRadius: "8px",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
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
            style={{ position: "absolute", inset: 0, background: "#00000066" }}
          />
          <div
            style={{
              position: "relative",
              background: "#ffffff",
              borderRadius: "12px",
              border: "2px solid #e0d9cc",
              maxWidth: "480px",
              width: "90%",
              overflow: "hidden",
              boxShadow: "0 10px 40px #00000033",
            }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100%", height: "280px", objectFit: "cover" }}
            />
            <div style={{ padding: "24px" }}>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#1a1a1a",
                  marginBottom: "8px",
                }}
              >
                {selectedProduct.name}
              </h2>
              <p style={{ color: "#555", marginBottom: "16px" }}>
                {selectedProduct.description}
              </p>

              {getSizes(selectedProduct.category) && (
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      color: "#1e4d2b",
                      fontWeight: "600",
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
                          padding: "8px 14px",
                          borderRadius: "6px",
                          border: "2px solid",
                          borderColor:
                            selectedSize === size ? "#1e4d2b" : "#e0d9cc",
                          background:
                            selectedSize === size ? "#1e4d2b" : "#ffffff",
                          color: selectedSize === size ? "#f0ebe0" : "#1a1a1a",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.2s",
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
                }}
              >
                <span
                  style={{
                    color: "#1e4d2b",
                    fontSize: "22px",
                    fontWeight: "700",
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
                    background: "#1e4d2b",
                    border: "none",
                    borderRadius: "8px",
                    color: "#f0ebe0",
                    padding: "10px 24px",
                    fontWeight: "700",
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
                background: "#00000066",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "16px",
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
