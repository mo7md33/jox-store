import React, { useState, useEffect } from "react";
import StorePage from "./StorePage";
import AdminPage from "./AdminPage";
import ContactPage from "./ContactPage";
import { supabase } from "./supabaseClient";

const COLORS = {
  bg: "#F8F6F1",
  primary: "#1B3325",
  border: "#E5E0D8",
  accent: "#C6A56B",
  text: "#1A1A1A",
};

function App() {
  const [page, setPage] = useState("store");
  const [showContact, setShowContact] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchAdminPassword();
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setPage("adminLogin");
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const fetchAdminPassword = async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_password")
      .single();
    if (!error) setAdminPassword(data.value);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty } : item)),
      );
    }
  };

  const adminLogin = (password) => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      setPage("admin");
      window.location.hash = "";
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    setPage("store");
  };

  const addProduct = async (product) => {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select();
    if (!error) setProducts((prev) => [data[0], ...prev]);
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: COLORS.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: `3px solid ${COLORS.border}`,
            borderTop: `3px solid ${COLORS.primary}`,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p
          style={{
            color: COLORS.primary,
            fontFamily: "Georgia, serif",
            fontSize: "20px",
            letterSpacing: "2px",
          }}
        >
          JOX STORE
        </p>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      {showContact ? (
        <ContactPage onBack={() => setShowContact(false)} />
      ) : page === "store" ? (
        <StorePage
          products={products}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateQty={updateQty}
          onContactClick={() => setShowContact(true)}
        />
      ) : page === "adminLogin" ? (
        <AdminLogin
          onLogin={adminLogin}
          onBack={() => {
            setPage("store");
            window.location.hash = "";
          }}
        />
      ) : page === "admin" && isAdminLoggedIn ? (
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const success = onLogin(password);
    if (!success) setError("باسورد غلط!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: `1px solid ${COLORS.border}`,
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "10px" }}>🔐</div>

        <h2
          style={{
            fontFamily: "Georgia, serif",
            color: COLORS.primary,
            marginBottom: "6px",
          }}
        >
          Admin Panel
        </h2>

        <p
          style={{
            color: "#777",
            marginBottom: "30px",
            fontSize: "13px",
          }}
        >
          JOX STORE
        </p>

        <input
          type="password"
          placeholder="ادخل الباسورد"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "10px",
            fontSize: "15px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        />

        {error && (
          <p
            style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "14px",
            background: COLORS.primary,
            border: "none",
            borderRadius: "999px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "15px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          دخول
        </button>

        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "13px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          رجوع للمتجر
        </button>
      </div>
    </div>
  );
}

export default App;
