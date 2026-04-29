import React, { useState, useEffect } from 'react';
import StorePage from './StorePage';
import AdminPage from './AdminPage';
import ContactPage from './ContactPage';
import { supabase } from './supabaseClient';

const ADMIN_PASSWORD = '01153473807';

function App() {
  const [page, setPage] = useState('store');
  const [showContact, setShowContact] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    fetchProducts();
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
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

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

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
    }
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

  const addProduct = async (product) => {
    const { data, error } = await supabase.from('products').insert([product]).select();
    if (!error) setProducts(prev => [data[0], ...prev]);
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f1a0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px'
      }}>
        <div style={{
          width: '50px', height: '50px',
          border: '3px solid #1e4d2b',
          borderTop: '3px solid #f0ebe0',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#4a7c5a', fontFamily: 'Georgia, serif' }}>JOX STORE</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
          updateQty={updateQty}
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