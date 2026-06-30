import React, { useState, useEffect } from 'react';
import StorePage from './StorePage';
import AdminPage from './AdminPage';
import ContactPage from './ContactPage';
import { supabase } from './supabaseClient';

const COLORS = {
  bg: '#0D0D0D',
  bgCard: '#141414',
  bgSurface: '#1A1A1A',
  primary: '#C9A84C',
  primaryDark: '#A8832A',
  border: '#2A2A2A',
  text: '#F5F0E8',
  muted: '#888',
};

// BANDA SVG Logo Component
export function BandaLogo({ size = 50 }) {
  return (
    <img
      src="/banda-logo.jpg"
      alt="BANDA Clothing Store"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #C9A84C',
      }}
    />
  );
}

function App() {
  const [page, setPage] = useState('store');
  const [showContact, setShowContact] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchAdminPassword();
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setPage('adminLogin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const fetchAdminPassword = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'admin_password')
      .single();
    if (!error) setAdminPassword(data.value);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id && item.size === product.size);
      if (exists) {
        return prev.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
    }
  };

  const adminLogin = (password) => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      setPage('admin');
      window.location.hash = '';
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setPage('store');
  };

  const addProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (!error && data?.[0]) setProducts(prev => [data[0], ...prev]);
    return { data, error };
  };

  const updateProduct = async (id, updatedProduct) => {
    const { data, error } = await supabase.from('products').update(updatedProduct).eq('id', id).select();
    if (!error && data?.[0]) {
      setProducts(prev => prev.map(product => product.id === id ? data[0] : product));
    }
    return { data, error };
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(prev => prev.filter(p => p.id !== id));
    return { error };
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
      }}>
        <BandaLogo size={80} />
        <div style={{
          width: '40px',
          height: '40px',
          border: `2px solid ${COLORS.border}`,
          borderTop: `2px solid ${COLORS.primary}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{
          color: COLORS.primary,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '16px',
          letterSpacing: '4px',
          fontWeight: '600',
        }}>
          BANDA CLOTHING STORE
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh' }}>
      {showContact ? (
        <ContactPage onBack={() => setShowContact(false)} />
      ) : page === 'store' ? (
        <StorePage
          products={products}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateQty={updateQty}
          onContactClick={() => setShowContact(true)}
        />
      ) : page === 'adminLogin' ? (
        <AdminLogin
          onLogin={adminLogin}
          onBack={() => { setPage('store'); window.location.hash = ''; }}
        />
      ) : page === 'admin' && isAdminLoggedIn ? (
        <AdminPage
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          onLogout={adminLogout}
        />
      ) : null}
    </div>
  );
}

function AdminLogin({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleSubmit = () => {
    const success = onLogin(password);
    if (!success) setError('باسورد غلط!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D0D',
      backgroundImage: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0D0D0D 70%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#141414',
        border: '1px solid rgba(201,168,76,0.25)',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <BandaLogo size={72} />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#C9A84C',
          marginBottom: '6px',
          fontSize: '22px',
          letterSpacing: '2px',
        }}>
          Admin Panel
        </h2>

        <p style={{ color: '#666', marginBottom: '32px', fontSize: '12px', letterSpacing: '3px' }}>
          BANDA CLOTHING STORE
        </p>

        <input
          type="password"
          placeholder="ادخل الباسورد"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          style={{
            width: '100%',
            padding: '14px 18px',
            background: '#1A1A1A',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
            fontSize: '15px',
            marginBottom: '12px',
            textAlign: 'center',
            color: '#F5F0E8',
            outline: 'none',
            transition: '0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = '#C9A84C'; }}
          onBlur={e => { e.target.style.borderColor = '#2A2A2A'; }}
        />

        {error && (
          <p style={{ color: '#e74c3c', fontSize: '13px', marginBottom: '12px' }}>{error}</p>
        )}

        <button
          onClick={handleSubmit}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '100%',
            padding: '14px',
            background: hovered
              ? 'linear-gradient(135deg, #E4C97E, #C9A84C)'
              : 'linear-gradient(135deg, #C9A84C, #A8832A)',
            border: 'none',
            borderRadius: '999px',
            color: '#0D0D0D',
            fontWeight: '700',
            fontSize: '15px',
            marginBottom: '14px',
            cursor: 'pointer',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            transform: hovered ? 'translateY(-1px)' : 'none',
            boxShadow: hovered ? '0 8px 24px rgba(201,168,76,0.35)' : '0 4px 12px rgba(201,168,76,0.2)',
          }}
        >
          دخول
        </button>

        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '13px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          رجوع للمتجر
        </button>
      </div>
    </div>
  );
}

export default App;
