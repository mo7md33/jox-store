import React, { useState } from "react";

const COLORS = {
  bg: "#F8F6F1",
  primary: "#1B3325",
  border: "#E5E0D8",
  accent: "#C6A56B",
  text: "#1A1A1A",
  white: "#FFFFFF",
};

const CATEGORIES = ["قمصان", "تيشرت", "جاكيت", "بناطيل", "كوتشي"];

export default function AdminPage({
  products,
  addProduct,
  deleteProduct,
  onLogout,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    old_price: "",
    category: "",
    image: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category || !form.image) {
      alert("من فضلك ادخل البيانات المطلوبة");
      return;
    }

    addProduct({
      ...form,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
    });

    setForm({
      name: "",
      price: "",
      old_price: "",
      category: "",
      image: "",
      description: "",
    });
    setImagePreview("");
    setShowAddForm(false);

    setSuccessMsg("تم إضافة المنتج بنجاح ✔");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", direction: "rtl" }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <h2 style={{ color: COLORS.primary }}>لوحة التحكم</h2>

        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            border: `1px solid ${COLORS.primary}`,
            borderRadius: "999px",
            padding: "8px 16px",
            color: COLORS.primary,
            cursor: "pointer",
          }}
        >
          خروج
        </button>
      </header>

      <div style={{ maxWidth: "900px", margin: "auto", padding: "30px" }}>
        {/* SUCCESS */}
        {successMsg && (
          <div
            style={{
              background: "#EAF6EA",
              border: "1px solid #A4D4A4",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            marginBottom: "20px",
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "999px",
            cursor: "pointer",
          }}
        >
          {showAddForm ? "إلغاء" : "+ إضافة منتج"}
        </button>

        {/* FORM */}
        {showAddForm && (
          <div
            style={{
              background: COLORS.white,
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <input
              placeholder="اسم المنتج"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={inputStyle}
            />

            <input
              placeholder="السعر بعد الخصم / السعر الحالي"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm((p) => ({ ...p, price: e.target.value }))
              }
              style={inputStyle}
            />

            <input
              placeholder="السعر قبل الخصم (اختياري)"
              type="number"
              value={form.old_price}
              onChange={(e) =>
                setForm((p) => ({ ...p, old_price: e.target.value }))
              }
              style={inputStyle}
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              style={inputStyle}
            >
              <option value="">اختار الفئة</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              placeholder="وصف المنتج"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              style={inputStyle}
            />

            {/* IMAGE FILE */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              style={{ marginBottom: "10px" }}
            />

            {/* PREVIEW */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                style={{ width: "120px", marginBottom: "10px" }}
              />
            )}

            {/* IMAGE URL */}
            <input
              placeholder="او لينك صورة"
              value={form.image}
              onChange={(e) => {
                setForm((p) => ({ ...p, image: e.target.value }));
                setImagePreview("");
              }}
              style={inputStyle}
            />

            <button
              onClick={handleSubmit}
              style={{
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                padding: "10px",
                width: "100%",
                borderRadius: "999px",
                cursor: "pointer",
              }}
            >
              حفظ المنتج
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: "15px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />

              <div style={{ padding: "10px" }}>
                <h4>{p.name}</h4>

                <div style={{ marginBottom: "10px" }}>
                  {p.old_price && (
                    <span
                      style={{
                        color: "#c0392b",
                        textDecoration: "line-through",
                        fontSize: "13px",
                        marginLeft: "8px",
                      }}
                    >
                      {p.old_price} جنيه
                    </span>
                  )}

                  <span
                    style={{
                      color: COLORS.primary,
                      fontWeight: "800",
                      fontSize: "16px",
                    }}
                  >
                    {p.price} جنيه
                  </span>
                </div>

                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{
                    background: "#ffe5e5",
                    border: "none",
                    padding: "6px",
                    width: "100%",
                    borderRadius: "6px",
                    color: "#c0392b",
                    cursor: "pointer",
                  }}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};