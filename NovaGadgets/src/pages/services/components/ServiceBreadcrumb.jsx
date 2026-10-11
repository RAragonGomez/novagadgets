const ServiceBreadcrumb = ({ servicio }) => (
    <nav className="servicios__breadcrumb" aria-label="Migas de pan">
        <a href="/">Inicio</a>
        <span aria-hidden="true">/</span>
        {servicio ? (
            <>
                <a href="/servicios">Servicios</a>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{servicio.nombre}</span>
            </>
        ) : (
            <span aria-current="page">Servicios</span>
        )}
    </nav>
)

export default ServiceBreadcrumb
