import React, { useState } from 'react';

const STORE_INFO = {
  phone: '01101708750',
  location: 'العياط - الجيزة',
  instagram: 'https://www.instagram.com/jox._eg',
  tiktok: 'https://www.tiktok.com/@jox_eg2',
};

function JoxLogo({ size = 50 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#f0ebe0" stroke="#1e4d2b" strokeWidth="2"/>
      <text x="50" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="38" fill="#1e4d2b" letterSpacing="-2">JOX</text>
      <path d="M25 70 Q50 78 75 70" stroke="#1e4d2b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export default function StorePage({ products, cart, addToCart, removeFromCart, onAdminClick, onContactClick }) {
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('الكل');

  const categories = ['الكل', ...new Set(products.map(p => p.category))];
  const filtered = activeCategory === 'الكل' ? products : products.filter(p => p.category === activeCategory);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const whatsappOrder = () => {
    if (cart.length === 0) return;
    const items = cart.map(item => `• ${item.name} × ${item.qty} = ${item.price * item.qty} جنيه`).join('\n');
    const msg = `مرحباً JOX STORE 👋\nعايز أطلب:\n${items}\n\nالإجمالي: ${totalPrice} جنيه`;
    window.open(`https://wa.me/2${STORE_INFO.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1a0f', direction: 'rtl' }}>

      {/* Header */}
      <header style={{
        background: '#0f1a0f',
        borderBottom: '1px solid #1e4d2b55',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <JoxLogo size={48} />
          <div>
            <div style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', fontSize: '18px', fontWeight: '700', letterSpacing: '2px' }}>JOX.EG</div>
            <div style={{ color: '#4a7c5a', fontSize: '10px', letterSpacing: '3px' }}>MENS FASHION</div>
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          style={{
            background: totalItems > 0 ? '#1e4d2b' : 'transparent',
            border: '1px solid #1e4d2b',
            borderRadius: '8px',
            color: '#f0ebe0',
            padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: '8px',
            fontWeight: '600', fontSize: '14px',
            transition: 'all 0.3s'
          }}
        >
          🛒 السلة {totalItems > 0 && <span style={{
            background: '#f0ebe0', color: '#1e4d2b',
            borderRadius: '50%', width: '22px', height: '22px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '700'
          }}>{totalItems}</span>}
        </button>
      </header>

      {/* Hero */}
      <div style={{
        textAlign: 'center',
        padding: '60px 24px 40px',
        borderBottom: '1px solid #1e4d2b33'
      }}>
        <JoxLogo size={90} />
        <div style={{ marginTop: '20px', color: '#4a7c5a', fontSize: '12px', letterSpacing: '4px', marginBottom: '12px' }}>PREMIUM COLLECTION</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '42px', color: '#f0ebe0', marginBottom: '12px', lineHeight: '1.2' }}>
          أناقة لا حدود لها
        </h1>
        <p style={{ color: '#4a7c5a', fontSize: '15px' }}>اختر من أرقى تشكيلات الملابس الرجالية</p>
      </div>

      {/* Categories */}
      <div style={{
        padding: '24px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderBottom: '1px solid #1e4d2b33'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#1e4d2b' : '#2a3a2a',
              background: activeCategory === cat ? '#1e4d2b' : 'transparent',
              color: activeCategory === cat ? '#f0ebe0' : '#4a7c5a',
              fontWeight: '500',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s'
            }}
          >{cat}</button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
        padding: '32px 24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {filtered.map(product => (
          <div key={product.id} style={{
            background: '#162016',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #2a3a2a',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#1e4d2b'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a3a2a'}
          >
            <div
              onClick={() => setSelectedProduct(product)}
              style={{ position: 'relative', paddingTop: '110%', overflow: 'hidden' }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                background: '#1e4d2b', color: '#f0ebe0',
                padding: '4px 10px', borderRadius: '4px',
                fontSize: '11px', fontWeight: '700', letterSpacing: '1px'
              }}>{product.category}</div>
            </div>
            <div style={{ padding: '16px' }}>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', fontSize: '16px', marginBottom: '6px' }}>{product.name}</h3>
              <p style={{ color: '#4a7c5a', fontSize: '12px', marginBottom: '12px' }}>{product.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#7ab88a', fontWeight: '700', fontSize: '18px' }}>{product.price} جنيه</span>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    background: '#1e4d2b',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#f0ebe0',
                    padding: '8px 16px',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}
                >+ السلة</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0a120a',
        borderTop: '1px solid #1e4d2b33',
        padding: '40px 24px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <JoxLogo size={60} />
        </div>
        <div style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', fontSize: '22px', marginBottom: '24px', letterSpacing: '3px' }}>JOX.EG</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div style={{ color: '#4a7c5a', fontSize: '14px' }}>
            <span style={{ color: '#7ab88a' }}>📞</span> {STORE_INFO.phone}
          </div>
          <div style={{ color: '#4a7c5a', fontSize: '14px' }}>
            <span style={{ color: '#7ab88a' }}>📍</span> {STORE_INFO.location}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
          <a href={STORE_INFO.instagram} target="_blank" rel="noreferrer" style={{
            background: '#162016', border: '1px solid #1e4d2b55',
            borderRadius: '8px', padding: '10px 20px',
            color: '#7ab88a', textDecoration: 'none', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>📸 Instagram</a>
          <a href={STORE_INFO.tiktok} target="_blank" rel="noreferrer" style={{
            background: '#162016', border: '1px solid #1e4d2b55',
            borderRadius: '8px', padding: '10px 20px',
            color: '#7ab88a', textDecoration: 'none', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>🎵 TikTok</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onContactClick}
            style={{
              background: '#1e4d2b', border: 'none',
              borderRadius: '8px', color: '#f0ebe0',
              padding: '12px 32px', fontWeight: '700',
              fontSize: '15px', cursor: 'pointer'
            }}
          >📩 تواصل معنا</button>
         
        </div>
      </footer>

      {/* Cart Drawer */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'flex-start' }}>
          <div onClick={() => setShowCart(false)} style={{ position: 'absolute', inset: 0, background: '#000000aa' }} />
          <div style={{
            position: 'relative', width: '360px', maxWidth: '90vw',
            background: '#162016', height: '100%',
            display: 'flex', flexDirection: 'column',
            borderLeft: '1px solid #1e4d2b44'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #2a3a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', fontSize: '20px' }}>السلة 🛒</h2>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', color: '#4a7c5a', fontSize: '20px' }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#4a7c5a', marginTop: '60px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                  <p>السلة فاضية</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '12px', alignItems: 'center',
                  padding: '12px 0', borderBottom: '1px solid #2a3a2a'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#f0ebe0', fontSize: '14px', marginBottom: '4px' }}>{item.name}</p>
                    <p style={{ color: '#7ab88a', fontSize: '13px' }}>{item.price * item.qty} جنيه × {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '18px' }}>🗑</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: '20px 24px', borderTop: '1px solid #2a3a2a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#4a7c5a' }}>الإجمالي:</span>
                  <span style={{ color: '#7ab88a', fontWeight: '700', fontSize: '18px' }}>{totalPrice} جنيه</span>
                </div>
                <button
                  onClick={whatsappOrder}
                  style={{
                    width: '100%', padding: '14px',
                    background: '#25D366', border: 'none', borderRadius: '8px',
                    color: '#fff', fontWeight: '700', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >📱 اطلب عبر WhatsApp</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', inset: 0, background: '#000000cc' }} />
          <div style={{
            position: 'relative', background: '#162016',
            borderRadius: '12px', border: '1px solid #1e4d2b44',
            maxWidth: '480px', width: '90%', overflow: 'hidden'
          }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
            <div style={{ padding: '24px' }}>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', marginBottom: '8px' }}>{selectedProduct.name}</h2>
              <p style={{ color: '#4a7c5a', marginBottom: '16px' }}>{selectedProduct.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#7ab88a', fontSize: '22px', fontWeight: '700' }}>{selectedProduct.price} جنيه</span>
                <button
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  style={{ background: '#1e4d2b', border: 'none', borderRadius: '8px', color: '#f0ebe0', padding: '10px 24px', fontWeight: '700' }}
                >أضف للسلة</button>
              </div>
            </div>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '12px', left: '12px', background: '#000000aa', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', fontSize: '16px' }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}