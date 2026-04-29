import React, { useState } from 'react';

export default function AdminPage({ products, addProduct, deleteProduct, onLogout }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '', description: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setForm(prev => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.image) {
      alert('من فضلك ادخل اسم المنتج والسعر والصورة');
      return;
    }
    addProduct({ ...form, price: Number(form.price) });
    setForm({ name: '', price: '', category: '', image: '', description: '' });
    setImagePreview('');
    setShowAddForm(false);
    setSuccessMsg('تم إضافة المنتج بنجاح! ✅');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', direction: 'rtl', fontFamily: 'Raleway, sans-serif' }}>

      {/* Admin Header */}
      <header style={{
        background: '#111',
        borderBottom: '1px solid #c9a84c44',
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Playfair Display, serif',
            fontWeight: '700', fontSize: '14px', color: '#0a0a0a'
          }}>JX</div>
          <div>
            <div style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: '700' }}>JOX STORE</div>
            <div style={{ color: '#888', fontSize: '11px' }}>لوحة التحكم</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            background: 'none', border: '1px solid #444',
            borderRadius: '6px', color: '#888',
            padding: '8px 16px', fontSize: '13px'
          }}
        >خروج 🚪</button>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'إجمالي المنتجات', value: products.length, icon: '👕' },
            { label: 'الفئات', value: new Set(products.map(p => p.category)).size, icon: '🏷️' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#1a1a1a', border: '1px solid #c9a84c33',
              borderRadius: '10px', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              <span style={{ fontSize: '28px' }}>{stat.icon}</span>
              <div>
                <div style={{ color: '#c9a84c', fontSize: '26px', fontWeight: '700' }}>{stat.value}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Success message */}
        {successMsg && (
          <div style={{
            background: '#1a3a1a', border: '1px solid #2d8a2d',
            borderRadius: '8px', padding: '12px 20px',
            color: '#4caf50', marginBottom: '20px', textAlign: 'center'
          }}>{successMsg}</div>
        )}

        {/* Add Product Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '22px' }}>المنتجات</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              background: '#c9a84c', border: 'none',
              borderRadius: '8px', color: '#0a0a0a',
              padding: '10px 20px', fontWeight: '700', fontSize: '14px',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >{showAddForm ? '✕ إلغاء' : '+ إضافة منتج جديد'}</button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div style={{
            background: '#1a1a1a', border: '1px solid #c9a84c44',
            borderRadius: '12px', padding: '24px', marginBottom: '28px'
          }}>
            <h3 style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif', marginBottom: '20px', fontSize: '18px' }}>إضافة منتج جديد</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { key: 'name', placeholder: 'اسم المنتج *', type: 'text' },
                { key: 'price', placeholder: 'السعر (جنيه) *', type: 'number' },
                { key: 'category', placeholder: 'الفئة (قمصان، بناطيل...)', type: 'text' },
                { key: 'description', placeholder: 'وصف المنتج', type: 'text' },
              ].map(field => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#2d2d2d', border: '1px solid #444',
                    borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none'
                  }}
                />
              ))}
            </div>

            {/* Image Upload */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ color: '#888', fontSize: '13px', display: 'block', marginBottom: '8px' }}>صورة المنتج *</label>
              <div style={{
                border: '2px dashed #c9a84c44', borderRadius: '8px',
                padding: '20px', textAlign: 'center',
                background: '#111'
              }}>
                {imagePreview ? (
                  <div>
                    <img src={imagePreview} alt="preview" style={{ maxHeight: '160px', borderRadius: '6px', marginBottom: '10px' }} />
                    <br />
                  </div>
                ) : (
                  <div style={{ color: '#888', marginBottom: '10px' }}>📸 اختر صورة من جهازك</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  style={{ color: '#c9a84c', fontSize: '13px' }}
                />
              </div>
              <p style={{ color: '#555', fontSize: '11px', marginTop: '6px' }}>أو ادخل رابط الصورة:</p>
              <input
                type="text"
                placeholder="https://..."
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={e => { setForm(prev => ({ ...prev, image: e.target.value })); setImagePreview(''); }}
                style={{
                  width: '100%', padding: '10px 16px', marginTop: '6px',
                  background: '#2d2d2d', border: '1px solid #444',
                  borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none'
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                marginTop: '20px', width: '100%', padding: '14px',
                background: '#c9a84c', border: 'none', borderRadius: '8px',
                color: '#0a0a0a', fontWeight: '700', fontSize: '16px'
              }}
            >✅ حفظ المنتج</button>
          </div>
        )}

        {/* Products List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{
              background: '#1a1a1a', border: '1px solid #2d2d2d',
              borderRadius: '10px', overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', paddingTop: '75%' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', top: '8px', right: '8px',
                  background: '#c9a84c', color: '#0a0a0a',
                  padding: '3px 8px', borderRadius: '4px',
                  fontSize: '11px', fontWeight: '700'
                }}>{product.category || 'عام'}</div>
              </div>
              <div style={{ padding: '14px' }}>
                <h3 style={{ color: '#fff', fontSize: '15px', marginBottom: '4px', fontFamily: 'Playfair Display, serif' }}>{product.name}</h3>
                <p style={{ color: '#c9a84c', fontWeight: '700', fontSize: '16px', marginBottom: '12px' }}>{product.price} جنيه</p>
                <button
                  onClick={() => {
                    if (window.confirm(`هتحذف "${product.name}"؟`)) deleteProduct(product.id);
                  }}
                  style={{
                    width: '100%', padding: '8px',
                    background: '#2d1a1a', border: '1px solid #e74c3c44',
                    borderRadius: '6px', color: '#e74c3c',
                    fontSize: '13px', fontWeight: '600',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >🗑 حذف المنتج</button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👕</div>
            <p>مفيش منتجات لسه، اضغط "إضافة منتج جديد" للبدء</p>
          </div>
        )}
      </div>
    </div>
  );
}