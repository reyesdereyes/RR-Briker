import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Whatsapp from "../components/whatsapp.jsx";
import "../css/Inicio.css";

const Inicio = () => {
  const animatedRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !animatedRefs.current.includes(el)) {
      animatedRefs.current.push(el);
    }
  };

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Todo para tu Moto al <span style={{color: 'var(--rr-red)'}}>Nivel Pro</span></h1>
            <p>Descubre la colección más completa de accesorios y repuestos premium con envíos garantizados a todo el país.</p>
            <div className="hero-buttons">
              <button className="btn-primary-large">Explorar Catálogo</button>
              <button className="btn-secondary" style={{padding: '20px 40px', borderRadius: '999px', border: '2px solid white', color: 'white', background: 'transparent', fontWeight: '800', cursor: 'pointer'}}>Ofertas</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">🏍️</div>
            <div className="floating-card delay-1">🛠️</div>
            <div className="floating-card delay-2">🏁</div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="categorias-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Categorías Destacadas</h2>
          <div className="categorias-grid">
            {["Cascos", "Guantes", "Chupas", "Repuestos", "Cauchos"].map((cat) => (
              <div key={cat} className="categoria-card">
                <span className="cat-icon">🛡️</span>
                <h3>{cat}</h3>
                <p style={{color: 'var(--rr-gray)', marginTop: '10px', fontWeight: '600'}}>+120 Artículos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" ref={addToRefs}>
        <div className="container stats-container">
          {[
            { v: "5K+", l: "Productos" },
            { v: "24H", l: "Envío Express" },
            { v: "99%", l: "Clientes Felices" },
            { v: "10+", l: "Años Líderes" }
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{s.v}</div>
              <div className="stat-label" style={{color: '#fff', opacity: 0.6, fontWeight: '700'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS & INFO BOX */}
      <main className="main-container">
        <div className="container carosel-layout">
          <aside className="carosel-info enhanced" ref={addToRefs}>
            <div className="info-header">
              {/* Imagen ahora controlada por clase para ser GIGANTE */}
              <img src="/RR Biker - SVG.svg" alt="RR Biker Logo" className="carosel-icon" />

              {/* Contenedor de insignias debajo de la imagen */}
              <div className="badges-container">
                <span className="badge-tag hot">🔥 TOP VENTAS</span>
                <span className="badge-tag premium">PREMIUM</span>
              </div>
            </div>

            <div className="info-content">
              <h2>Equipamiento <br /><span>Seleccionado</span></h2>
              <p>Nuestra curaduría de productos asegura rendimiento y seguridad de alto nivel en cada ruta.</p>

              <div className="features-list">
                <div className="feature">
                  <span className="check-icon">✓</span>
                  <span>Garantía Extendida</span>
                </div>
                <div className="feature">
                  <span className="check-icon">✓</span>
                  <span>Soporte Técnico</span>
                </div>
                <div className="feature">
                  <span className="check-icon">✓</span>
                  <span>Cambios sin costo</span>
                </div>
              </div>
            </div>

            <button className="btn-primary-large">Explorar Todo</button>
          </aside>

          <div className="carosel-box enhanced" ref={addToRefs}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center'}}>
              <h3 style={{fontSize: '24px', fontWeight: '900'}}>Novedades</h3>
              <div style={{width: '60px', height: '4px', background: 'var(--rr-red)', borderRadius: '2px'}}></div>
            </div>
            <div className="productos-grid">
              {[1, 2, 3, 4].map((p) => (
                <div key={p} className="producto-card">
                  <div style={{height: '220px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px'}}>📦</div>
                  <div className="producto-info">
                    <h4 style={{marginBottom: '10px'}}>Producto Premium #{p}</h4>
                    <span style={{color: 'var(--rr-red)', fontWeight: '900', fontSize: '20px'}}>$120.00</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CONTACTO */}
      <section className="contacto-section">
        <div className="container contacto-content">
          <div className="contacto-info">
            <h2 style={{fontSize: '40px', marginBottom: '20px'}}>¿Hablamos?</h2>
            <p style={{opacity: 0.7, marginBottom: '30px'}}>Estamos en Guacara listos para asesorarte con tu compra.</p>
            <div className="contacto-item">
              <span style={{fontSize: '30px'}}>📍</span>
              <div>
                <h4 style={{fontWeight: '900'}}>Ubicación</h4>
                <p style={{opacity: 0.6}}>Calle Principal, Guacara, Carabobo</p>
              </div>
            </div>
            <div className="contacto-item">
              <span style={{fontSize: '30px'}}>📞</span>
              <div>
                <h4 style={{fontWeight: '900'}}>Teléfono</h4>
                <p style={{opacity: 0.6}}>+58 412-1234567</p>
              </div>
            </div>
          </div>

          <div className="contacto-form">
            <h3 style={{marginBottom: '30px'}}>Escríbenos directamente</h3>
            <form>
              <input type="text" placeholder="Nombre completo" />
              <input type="email" placeholder="Correo electrónico" />
              <textarea placeholder="¿En qué podemos ayudarte?" rows="5"></textarea>
              <button type="submit" className="btn-primary-large">Enviar ahora</button>
            </form>
          </div>
        </div>
      </section>

      <Whatsapp />
      <Footer />
    </>
  );
};

export default Inicio;