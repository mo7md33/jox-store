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

const emptyForm = {
  name: "",
  price: "",
  old_price: "",
  category: "",
  image: "",
  description: "",
};

export default function AdminPage({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  onLogout,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

      if (error) {
        alert("حصل خطأ أثناء تعديل المنتج");
        return;
      }

      setSuccessMsg("تم تعديل المنتج بنجاح ✔");
    } else {
      const { error } = await addProduct(productPayload);

      if (error) {
        alert("حصل خطأ أثناء إضافة المنتج");
        return;
      }

      setSuccessMsg("تم إضافة المنتج بنجاح ✔");
    }

    resetForm();
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", direction: "rtl" }}>
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

        <button
          onClick={() => {
            if (showAddForm) {
              resetForm();
            } else {
              setShowAddForm(true);
            }
          }}
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
            <h3 style={{ color: COLORS.primary, marginBottom: "15px" }}>
              {isEditing ? "تعديل المنتج" : "إضافة منتج جديد"}
            </h3>

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

            <input
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              style={{ marginBottom: "10px" }}
            />

            {(imagePreview || form.image) && (
              <img
                src={imagePreview || form.image}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
            )}

            <input
              placeholder="او لينك صورة"
              value={form.image.startsWith("data:") ? "" : form.image}
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
                marginBottom: "10px",
              }}
            >
              {isEditing ? "حفظ التعديل" : "حفظ المنتج"}
            </button>

            {isEditing && (
              <button
                onClick={resetForm}
                style={{
                  background: "#eee",
                  color: COLORS.text,
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        )}

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

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => startEdit(p)}
                    style={{
                      flex: 1,
                      background: COLORS.primary,
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`هتحذف "${p.name}"؟`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    style={{
                      flex: 1,
                      background: "#ffe5e5",
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#c0392b",
                      cursor: "pointer",
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
          <div style={{ textAlign: "center", padding: "60px", color: "#777" }}>
            مفيش منتجات لسه
          </div>
        )}
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