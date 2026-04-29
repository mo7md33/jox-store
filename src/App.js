import React, { useState, useEffect } from 'react';
import StorePage from './StorePage';
import AdminPage from './AdminPage';
import ContactPage from './ContactPage';

const ADMIN_PASSWORD = 'mamama@01040113534';

const initialProducts = [
  { id: 1, name: 'قميص كلاسيك أبيض', price: 450, category: 'قمصان', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', description: 'قميص رجالي كلاسيك فاخر' },
  { id: 2, name: 'بنطلون كاجوال', price: 650, category: 'بناطيل', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400', description: 'بنطلون أنيق للإطلالات اليومية' },
  { id: 3, name: 'جاكيت رجالي', price: 1200, category: 'جاكيتات', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', description: 'جاكيت فاخر للمناسبات' },
  { id: 4, name: 'تيشرت', price: 250, category: 'تيشرتات', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'تيشرت قطن ناعم' },
  { id: 5, name: 'كوتشي', price: 850, category: 'كوتشي', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'كوتشي مريح وأنيق' },
];

function App() {
  const [page, setPage] = useState('store');
  const [showContact, setShowContact] = useState(false);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('jox_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('jox_products', JSON.stringify(products));
  }, [products]);

  // الرابط السري للأدمن
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

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const adminLogin = (password) => {
    if (password === ADMIN_PASSWORD) {
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

  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      {showContact ? (
        <ContactPage onBack={() => setShowContact(false)} />
      ) : page === 'store' ? (
        <StorePage
          products={products}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          onContactClick={() => setShowContact(true)}
        />
      ) : page === 'adminLogin' ? (
        <AdminLogin onLogin={adminLogin} onBack={() => { setPage('store'); window.location.hash = ''; }} />
      ) : page === 'admin' && isAdminLoggedIn ? (
        <AdminPage
          products={products}
          addProduct={addProduct}
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

  const handleSubmit = () => {
    const success = onLogin(password);
    if (!success) setError('باسورد غلط!');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f1a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Raleway, sans-serif'
    }}>
      <div style={{
        background: '#162016',
        border: '1px solid #1e4d2b',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🔐</div>
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#f0ebe0', marginBottom: '8px' }}>Admin Panel</h2>
        <p style={{ color: '#4a7c5a', marginBottom: '30px', fontSize: '14px' }}>JOX STORE</p>
        <input
          type="password"
          placeholder="ادخل الباسورد"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#0f1a0f',
            border: '1px solid #2a3a2a',
            borderRadius: '8px',
            color: '#f0ebe0',
            fontSize: '16px',
            marginBottom: '12px',
            outline: 'none',
            textAlign: 'center'
          }}
        />
        {error && <p style={{ color: '#e74c3c', fontSize: '14px', marginBottom: '12px' }}>{error}</p>}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            background: '#1e4d2b',
            border: 'none',
            borderRadius: '8px',
            color: '#f0ebe0',
            fontWeight: '600',
            fontSize: '16px',
            marginBottom: '12px'
          }}
        >دخول</button>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#4a7c5a',
            fontSize: '14px',
            textDecoration: 'underline'
          }}
        >رجوع للمتجر</button>
      </div>
    </div>
  );
}

export default App;