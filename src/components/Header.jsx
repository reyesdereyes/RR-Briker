// HeaderBar.jsx - ADAPTADO PARA RR BIKER
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css"; 


const HeaderBar = () => {
  // ===== ESTADOS BÁSICOS =====
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // ===== BUSCADOR =====
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions] = useState([
    "Casco full face", "Guantes racing", "Batería lithium", "Neumático sport", 
    "Cadena moto", "Filtro aceite", "Bujía iridium", "Pastillas freno"
  ]);
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // ===== NAV HIGHLIGHT =====
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0, visible: false });

  // ===== REFS =====
  const wrapperRef = useRef(null);
  const searchRef = useRef(null);
  const navListRef = useRef(null);
  const linkRefs = useRef({});

  // ===== CARRITO PERSISTENTE =====
  useEffect(() => {
    const savedCart = localStorage.getItem('rrbikerCart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rrbikerCart', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  // ===== SCROLL DETECTION =====
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== CLICK OUTSIDE =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setCartOpen(false);
        setFiltered([]);
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // ===== NAV HIGHLIGHT =====
  const moveHighlightToKey = useCallback((key) => {
    const navList = navListRef.current;
    const linkEl = linkRefs.current[key];
    if (!navList || !linkEl) return;

    const itemRect = linkEl.getBoundingClientRect();
    const navRect = navList.getBoundingClientRect();
    const width = itemRect.width;
    const left = itemRect.left - navRect.left;

    setHighlightStyle({ width, left, visible: true });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => moveHighlightToKey("inicio"), 100);
    return () => clearTimeout(t);
  }, [moveHighlightToKey]);

  // ===== BUSCADOR =====
  const onSearchChange = (value) => {
    setSearchQuery(value);
    if (!value) {
      setFiltered([]);
      setActiveIndex(-1);
      return;
    }
    const f = suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));
    setFiltered(f);
    setActiveIndex(f.length ? 0 : -1);
  };

  const handleSearchKey = (e) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        setSearchQuery(filtered[activeIndex]);
        setFiltered([]);
      }
    } else if (e.key === "Escape") {
      setFiltered([]);
    }
  };

  return (
    <>
      <header className={`app-header ${scrolled ? "scrolled" : ""}`} ref={wrapperRef}>
        <div className="header-inner">
          {/* LOGO RR BIKER */}
          <div className="logo-area">
            <Link to="/" className="logo-link">
              <img src="/SVG 1.svg" alt="RR Biker" className="logo-img" />
            </Link>
          </div>

          {/* NAVEGACIÓN */}
          <nav className={`nav-area ${open ? "open" : ""}`}>
            <div className="nav-inner" ref={navListRef}>
              <span
                className="nav-highlight"
                style={{
                  width: `${highlightStyle.width}px`,
                  transform: `translateX(${highlightStyle.left}px)`,
                  opacity: highlightStyle.visible ? 1 : 0,
                }}
              />
              <ul className="nav-list">
                {[
                  { key: "inicio", label: "Inicio", to: "/" },
                  { key: "productos", label: "Productos", to: "/productos" },
                  { key: "servicios", label: "Servicios", to: "/servicios" },
                  { key: "contacto", label: "Contacto", to: "/contacto" }
                ].map(({ key, label, to }) => (
                  <li key={key} className="nav-item">
                    <Link
                      to={to}
                      className="nav-link"
                      ref={el => (linkRefs.current[key] = el)}
                      onMouseEnter={() => moveHighlightToKey(key)}
                      onClick={() => {
                        moveHighlightToKey(key);
                        setOpen(false);
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ACCIONES */}
          <div className="actions-area">
            {/* BUSCADOR */}
            <div className="search-box">
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                onKeyDown={handleSearchKey}
                className="search-input"
                placeholder="Buscar cascos, repuestos..."
              />
              <button className="search-btn" aria-label="Buscar">🔍</button>
              {filtered.length > 0 && (
                <ul className="search-suggestions">
                  {filtered.map((s, idx) => (
                    <li
                      key={s}
                      className={`search-suggestion-item ${idx === activeIndex ? "active" : ""}`}
                      onMouseDown={ev => {
                        ev.preventDefault();
                        setSearchQuery(s);
                        setFiltered([]);
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* CARRITO */}
            <button
              className={`cart-btn ${cartOpen ? "open" : ""}`}
              onClick={e => {
                e.stopPropagation();
                setCartOpen(s => !s);
                setCartPulse(true);
                setTimeout(() => setCartPulse(false), 900);
              }}
              aria-label="Carrito de compras"
              aria-expanded={cartOpen}
            >
              <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Carrito
              {cartCount > 0 && (
                <span className={`cart-badge ${cartPulse ? "pulse" : ""}`}>
                  {cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className={`mini-cart ${cartCount === 0 ? "empty" : ""}`}>
                {cartCount === 0 ? (
                  <div className="mini-empty">
                    <div className="empty-ico">🛒</div>
                    <div className="empty-text">Tu carrito está vacío</div>
                    <Link to="/productos" className="btn primary" onClick={() => setCartOpen(false)}>
                      Ver productos
                    </Link>
                  </div>
                ) : (
                  <div>
                    <p><strong>{cartCount} items</strong></p>
                    <Link to="/carrito" className="btn primary" onClick={() => setCartOpen(false)}>
                      Ver carrito completo
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* HAMBURGUESA */}
            <button
              className={`hamburger ${open ? "active" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Abrir menú móvil"
            >
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderBar;
