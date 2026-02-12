import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="rr-footer">
      <div className="footer-container">

        {/* Logo / Nombre */}
        <div className="footer-col">
          <h2 className="footer-logo">RR BIKER</h2>
          <p className="footer-text">
            Servicio y repuestos para motos con calidad, rapidez y confianza.
          </p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3 className="footer-title">Enlaces</h3>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-col">
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">📍 Venezuela</p>
          <p className="footer-text">📞 +58 424 123 4567</p>
          <p className="footer-text">✉️ contacto@rrbiker.com</p>
        </div>

        {/* Redes */}
        <div className="footer-col">
          <h3 className="footer-title">Síguenos</h3>
          <div className="footer-socials">
            <a href="#" className="social-btn">FB</a>
            <a href="#" className="social-btn">IG</a>
            <a href="#" className="social-btn">YT</a>
          </div>
        </div>

      </div>

      {/* Línea final */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RR BIKER - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
