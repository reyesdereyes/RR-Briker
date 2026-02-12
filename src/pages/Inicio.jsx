import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Whatsapp from '../components/whatsapp.jsx'; // ← NUEVO COMPONENTE
import '../css/Inicio.css';
import Footer from '../components/Footer.jsx';

const Inicio = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Refs para animaciones de entrada
  const caroselInfoRef = useRef(null);
  const caroselBoxRef = useRef(null);
  const statsRef = useRef(null);
  const serviciosRef = useRef(null);
  const categoriasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Lista de elementos a observar para la animación de entrada
    const targets = [
      caroselInfoRef.current, 
      caroselBoxRef.current, 
      categoriasRef.current, 
      serviciosRef.current,
      statsRef.current
    ].filter(Boolean);

    if (!targets.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Productos', value: '5,247+', color: '#F60C14' },
    { label: 'Marcas', value: '89+', color: '#F60C14' },
    { label: 'Envíos', value: '24,561+', color: '#F60C14' },
    { label: 'Satisfechos', value: '98.7%', color: '#F60C14' }
  ];

  const servicios = [
    { icon: '🚚', title: 'Delivery Express', desc: 'Entrega en 24-48h a todo el país' },
    { icon: '🛠️', title: 'Taller Especializado', desc: 'Mecánicos certificados 24/7' },
    { icon: '💳', title: 'Financiación', desc: 'Hasta 12 cuotas sin intereses' },
    { icon: '📞', title: 'Asesoría Personalizada', desc: 'Llamanos y te ayudamos' }
  ];

  return (
    <>
      <Header />
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Todo para tu Moto al <span className="highlight">Mejor Precio</span></h1>
            <p>Accesorios, repuestos y equipos de calidad premium. Envíos express a todo el país.</p>
            <div className="hero-buttons">
              <button className="btn-primary-large">Ver Catálogo Completo</button>
              <button className="btn-secondary">Ofertas del Día</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">🏍️</div>
            <div className="floating-card delay-1">⚙️</div>
            <div className="floating-card delay-2">🛡️</div>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS POPULARES */}
      <section className="categorias-section" ref={categoriasRef}>
        <div className="container">
          <h2 className="section-title">Categorías Populares</h2>
          <div className="categorias-grid">
            {['Cascos', 'Guantes', 'Ropa', 'Repuestos', 'Accesorios', 'Neumáticos'].map(cat => (
              <div key={cat} className="categoria-card">
                <div className="cat-icon">🏍️</div>
                <h4>{cat}</h4>
                <span className="cat-count">+{Math.floor(Math.random() * 500) + 100} productos</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number" style={{ '--accent-color': stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS Y CAROUSEL INFO */}
      <div className="main-container">
        <div className="carosel-layout">
          <aside className="carosel-info enhanced" ref={caroselInfoRef}>
            <div className="info-header">
              <img src="/RR Biker - SVG.svg" alt="Moto" className="carosel-icon" />
              <div className="badges">
                <span className="badge hot">🔥 Más Vendidos</span>
                <span className="badge new">✨ Nuevo</span>
              </div>
            </div>
            <h2>Accesorios <br /><span className="gradient-text">Premium</span></h2>
            <p>Encuentra accesorios y repuestos para tu moto con la mejor calidad. <strong>Delivery gratis</strong> + garantía de por vida.</p>
            <div className="features-list">
              <div className="feature"><span>🚚</span> Delivery Gratis</div>
              <div className="feature"><span>🛡️</span> 2 Años Garantía</div>
              <div className="feature"><span>💳</span> 12 Meses Sin Intereses</div>
            </div>
            <button className="btn-primary">Explorar Colección</button>
          </aside>

          <div className="carosel-box enhanced" ref={caroselBoxRef}>
            <div className="section-header">
              <h3>⭐ Productos Destacados</h3>
              <div className="scroll-indicator"></div>
            </div>
            <div className="productos-grid">
              <div className="producto-card premium">
                <div className="card-badge">50% OFF</div>
                <img src="/api/placeholder/320/240" alt="Casco" />
                <div className="producto-info">
                  <h4>Casco Full Face Carbon</h4>
                  <div className="price-container">
                    <span className="precio-new">$89.99</span>
                    <span className="precio-old">$179.99</span>
                  </div>
                  <div className="rating">★★★★★ (247)</div>
                </div>
              </div>
              <div className="producto-card">
                <div className="card-badge sale">SALE</div>
                <img src="/api/placeholder/320/240" alt="Guantes" />
                <div className="producto-info">
                  <h4>Guantes Pro Race</h4>
                  <div className="price-container">
                    <span className="precio-new">$39.99</span>
                  </div>
                  <div className="rating">★★★★☆ (156)</div>
                </div>
              </div>
              <div className="producto-card">
                <img src="/api/placeholder/320/240" alt="Batería" />
                <div className="producto-info">
                  <h4>Batería Lithium Pro</h4>
                  <div className="price-container">
                    <span className="precio-new">$79.99</span>
                  </div>
                  <div className="rating">★★★★★ (89)</div>
                </div>
              </div>
              <div className="producto-card">
                <div className="card-badge limited">LIMITADO</div>
                <img src="/api/placeholder/320/240" alt="Neumático" />
                <div className="producto-info">
                  <h4>Neumático Sport Max</h4>
                  <div className="price-container">
                    <span className="precio-new">$159.99</span>
                  </div>
                  <div className="rating">★★★★★ (423)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICIOS */}
      <section className="servicios-section" ref={serviciosRef}>
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="servicios-grid">
            {servicios.map((servicio, i) => (
              <div key={i} className="servicio-card">
                <div className="servicio-icon">{servicio.icon}</div>
                <h3>{servicio.title}</h3>
                <p>{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contacto-section">
        <div className="container">
          <h2 className="section-title">Contáctanos</h2>
          <div className="contacto-content">
            <div className="contacto-info">
              <div className="contacto-item">
                <span className="contacto-icon">📍</span>
                <div>
                  <h4>Guacara, Carabobo</h4>
                  <p>Av. Principal #123, Zona Industrial</p>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-icon">📞</span>
                <div>
                  <h4>+58 424-123-4567</h4>
                  <p>Llámanos ahora mismo</p>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-icon">✉️</span>
                <div>
                  <h4>ventas@rrbiker.com</h4>
                  <p>Respuesta en menos de 2h</p>
                </div>
              </div>
              <div className="contacto-item">
                <span className="contacto-icon">🕒</span>
                <div>
                  <h4>Horario</h4>
                  <p>Lun-Vie 8AM-7PM | Sáb 9AM-5PM</p>
                </div>
              </div>
            </div>
            <div className="contacto-form">
              <h3>Envíanos un Mensaje</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Tu nombre" />
                <input type="tel" placeholder="Tu teléfono" />
                <textarea placeholder="Cuéntanos qué necesitas..."></textarea>
                <button type="submit" className="btn-primary">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENTE DE WHATSAPP FLOTANTE */}
      <Whatsapp />
      <Footer />
    </>
  );
};

export default Inicio;