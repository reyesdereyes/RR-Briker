import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="rr-footer">
      <div className="footer-container">

        {/* Logo / Branding */}
        <div className="footer-col branding">
          <h2 className="footer-logo">RR<span> BIKER</span></h2>
          <p className="footer-text">
            Pasión por la excelencia en cada repuesto. Elevamos el estándar de tu ruta con calidad premium.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn ig" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-btn tk" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            <a href="#" className="social-btn ws" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="footer-col">
          <h3 className="footer-title">Explorar</h3>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Catálogo</a></li>
            <li><a href="/servicios">Taller Especializado</a></li>
            <li><a href="/contacto">Ubicación</a></li>
          </ul>
        </div>

        {/* Contacto Directo */}
        <div className="footer-col">
          <h3 className="footer-title">Atención</h3>
          <div className="contact-info">
            <p className="footer-text"><i className="fas fa-map-marker-alt"></i> Guacara, Venezuela</p>
            <p className="footer-text"><i className="fas fa-phone-alt"></i> +58 424 123 4567</p>
            <p className="footer-text"><i className="fas fa-envelope"></i> ventas@rrbiker.com</p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="bottom-container">
          <p>© {new Date().getFullYear()} RR BIKER - Built for the road.</p>
          <div className="bottom-line"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;