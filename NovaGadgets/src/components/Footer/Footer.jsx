import './Footer.css'
import logo from '../../assets/brand/nova-gadgets-horizontal.svg'

const Footer = () => {
    const anio = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="contenedor footer__contenido">
                <div className="footer__marca">
                    <a href="/" className="footer__logo">
                        <img src={logo} alt="NovaGadgets - Inicio" width="140" height="32" />
                    </a>
                    <p>© {anio} NovaGadgets</p>
                </div>

                <nav className="footer__menu" aria-label="Navegación del pie de página">
                    <a href="/">Inicio</a>
                    <a href="/tienda">Tienda</a>
                    <a href="/servicios">Servicios</a>
                    <a href="/arma-tu-pc">Arma tu PC</a>
                    <a href="/nosotros">Nosotros</a>
                    <a href="/contacto">Contacto</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
