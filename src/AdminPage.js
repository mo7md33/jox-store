import React, { useState } from "react";

const C = {
  bg: "#0D0D0D",
  bgCard: "#141414",
  bgSurface: "#1A1A1A",
  primary: "#C9A84C",
  primaryDark: "#A8832A",
  border: "#2A2A2A",
  borderGold: "rgba(201,168,76,0.25)",
  text: "#F5F0E8",
  muted: "#888",
  white: "#FFFFFF",
};

const CATEGORIES = ["قمصان", "تيشرت", "جاكيت", "بناطيل", "كوتشي"];

const emptyForm = {
  name: "",
  price: "",
  old_price: "",
  category: "",
  image: "",
  description: "",
};

function BandaLogo({ size = 40 }) {
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

export default function AdminPage({ products, addProduct, updateProduct, deleteProduct, onLogout }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [logoutHover, setLogoutHover] = useState(false);

  const isEditing = Boolean(editingProductId);

  const resetForm = () => {
    setForm(emptyForm);
    setImagePreview("");
    setEditingProductId(null);
    setShowAddForm(false);
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setForm((prev) => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const startEdit = (product) => {
    setEditingProductId(product.id);
    setShowAddForm(true);
    setImagePreview("");
    setForm({
      name: product.name || "",
      price: product.price || "",
      old_price: product.old_price || "",
      category: product.category || "",
      image: product.image || "",
      description: product.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      alert("من فضلك ادخل البيانات المطلوبة");
      return;
    }

    const productPayload = {
      name: form.name,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      category: form.category,
      image: form.image,
      description: form.description,
    };

    if (isEditing) {
      const { error } = await updateProduct(editingProductId, productPayload);
      if (error) { alert("حصل خطأ أثناء تعديل المنتج"); return; }
      setSuccessMsg("تم تعديل المنتج بنجاح ✔");
    } else {
      const { error } = await addProduct(productPayload);
      if (error) { alert("حصل خطأ أثناء إضافة المنتج"); return; }
      setSuccessMsg("تم إضافة المنتج بنجاح ✔");
    }

    resetForm();
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", direction: "rtl" }}>
      <style>{`
        .admin-card { transition: all 0.25s ease; }
        .admin-card:hover { transform: translateY(-4px); box-shadow: 0 12px 35px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.3) !important; }
        input::placeholder, textarea::placeholder { color: #555; }
        select option { background: #1A1A1A; color: #F5F0E8; }
        input[type="file"] { color: #888; }
        input[type="file"]::file-selector-button {
          background: linear-gradient(135deg, #C9A84C, #A8832A);
          color: #0D0D0D;
          border: none;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
          margin-left: 10px;
          font-size: 13px;
        }
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
          <BandaLogo size={40} />
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: C.primary,
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "3px",
            }}>
              BANDA
            </div>
            <div style={{ color: C.muted, fontSize: "9px", letterSpacing: "2px" }}>
              لوحة التحكم
            </div>
          </div>
        </div>

        <button
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
          onClick={onLogout}
          style={{
            background: logoutHover ? "rgba(231,76,60,0.15)" : "transparent",
            border: `1px solid ${logoutHover ? "#e74c3c" : "rgba(201,168,76,0.35)"}`,
            borderRadius: "999px",
            padding: "9px 20px",
            color: logoutHover ? "#e74c3c" : C.primary,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.25s ease",
          }}
        >
          خروج
        </button>
      </header>

      <div style={{ maxWidth: "960px", margin: "auto", padding: "36px 28px" }}>

        {/* Success message */}
        {successMsg && (
          <div style={{
            background: "rgba(39,174,96,0.12)",
            border: "1px solid rgba(39,174,96,0.4)",
            padding: "14px 20px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "24px",
            color: "#27ae60",
            fontWeight: "600",
            fontSize: "15px",
          }}>
            {successMsg}
          </div>
        )}

        {/* Add / Cancel button */}
        <button
          onClick={() => { if (showAddForm) { resetForm(); } else { setShowAddForm(true); } }}
          style={{
            marginBottom: "24px",
            background: showAddForm
              ? "transparent"
              : "linear-gradient(135deg, #C9A84C, #A8832A)",
            color: showAddForm ? C.muted : "#0D0D0D",
            border: showAddForm ? "1px solid #2A2A2A" : "none",
            padding: "11px 24px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "0.5px",
            transition: "all 0.25s",
          }}
        >
          {showAddForm ? "✕ إلغاء" : "+ إضافة منتج"}
        </button>

        {/* Add / Edit Form */}
        {showAddForm && (
          <div style={{
            background: "#141414",
            padding: "28px",
            borderRadius: "16px",
            marginBottom: "28px",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}>
            <h3 style={{
              color: C.primary,
              marginBottom: "22px",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "18px",
              letterSpacing: "1px",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
              paddingBottom: "14px",
            }}>
              {isEditing ? "✏️ تعديل المنتج" : "➕ إضافة منتج جديد"}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <input
                placeholder="اسم المنتج *"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                style={inputStyle}
              />
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                style={inputStyle}
              >
                <option value="">اختار الفئة *</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                placeholder="السعر الحالي *"
                type="number"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                style={inputStyle}
              />
              <input
                placeholder="السعر قبل الخصم (اختياري)"
                type="number"
                value={form.old_price}
                onChange={(e) => setForm((p) => ({ ...p, old_price: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <input
              placeholder="وصف المنتج (اختياري)"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              style={{ ...inputStyle, marginTop: "12px", width: "100%" }}
            />

            <div style={{
              marginTop: "16px",
              padding: "16px",
              background: "#1A1A1A",
              borderRadius: "12px",
              border: "1px solid #2A2A2A",
            }}>
              <p style={{ color: C.muted, fontSize: "12px", marginBottom: "10px", letterSpacing: "1px" }}>
                صورة المنتج *
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFile}
                style={{ marginBottom: "12px", width: "100%" }}
              />
              <input
                placeholder="أو الصق لينك صورة هنا"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => { setForm((p) => ({ ...p, image: e.target.value })); setImagePreview(""); }}
                style={{ ...inputStyle, width: "100%" }}
              />
              {(imagePreview || form.image) && (
                <img
                  src={imagePreview || form.image}
                  alt="معاينة"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "12px",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                />
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #C9A84C, #A8832A)",
                  color: "#0D0D0D",
                  border: "none",
                  padding: "13px",
                  width: "100%",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: "800",
                  fontSize: "15px",
                  letterSpacing: "0.5px",
                }}
              >
                {isEditing ? "💾 حفظ التعديل" : "✔ حفظ المنتج"}
              </button>

              {isEditing && (
                <button
                  onClick={resetForm}
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: C.muted,
                    border: "1px solid #2A2A2A",
                    padding: "13px",
                    width: "100%",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  إلغاء التعديل
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "0 4px",
        }}>
          <h2 style={{
            color: C.text,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "17px",
            fontWeight: "600",
          }}>
            المنتجات
            <span style={{
              marginRight: "10px",
              color: C.primary,
              fontSize: "14px",
              fontWeight: "700",
            }}>
              ({products.length})
            </span>
          </h2>
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: "16px",
        }}>
          {products.map((p) => (
            <div
              key={p.id}
              className="admin-card"
              style={{
                background: "#141414",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.15)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ position: "relative", height: "185px", overflow: "hidden", background: "#1A1A1A" }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", top: "8px", right: "8px",
                  background: "linear-gradient(135deg, #C9A84C, #A8832A)",
                  color: "#0D0D0D",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "10px",
                  fontWeight: "700",
                }}>
                  {p.category}
                </div>
              </div>

              <div style={{ padding: "12px" }}>
                <h4 style={{
                  color: C.text,
                  fontSize: "14px",
                  fontWeight: "700",
                  marginBottom: "6px",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}>
                  {p.name}
                </h4>

                <div style={{ marginBottom: "12px" }}>
                  {p.old_price && (
                    <span style={{ color: "#c0392b", textDecoration: "line-through", fontSize: "12px", marginLeft: "6px" }}>
                      {p.old_price} جنيه
                    </span>
                  )}
                  <span style={{ color: C.primary, fontWeight: "800", fontSize: "15px" }}>
                    {p.price} جنيه
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => startEdit(p)}
                    style={{
                      flex: 1,
                      background: "linear-gradient(135deg, #C9A84C, #A8832A)",
                      border: "none",
                      padding: "9px",
                      borderRadius: "8px",
                      color: "#0D0D0D",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => { if (window.confirm(`هتحذف "${p.name}"؟`)) deleteProduct(p.id); }}
                    style={{
                      flex: 1,
                      background: "rgba(231,76,60,0.1)",
                      border: "1px solid rgba(231,76,60,0.3)",
                      padding: "9px",
                      borderRadius: "8px",
                      color: "#e74c3c",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "80px",
            color: C.muted,
            background: "#141414",
            borderRadius: "16px",
            border: "1px solid rgba(201,168,76,0.1)",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
            <p style={{ fontSize: "16px" }}>مفيش منتجات لسه</p>
            <p style={{ fontSize: "13px", marginTop: "8px", color: "#555" }}>اضغط "+ إضافة منتج" للبداية</p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "0",
  borderRadius: "10px",
  border: "1px solid #2A2A2A",
  background: "#1A1A1A",
  color: "#F5F0E8",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
};
