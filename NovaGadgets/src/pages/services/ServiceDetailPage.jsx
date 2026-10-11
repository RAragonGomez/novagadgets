import { servicios } from '../../data/servicios'
import ServiceBreadcrumb from './components/ServiceBreadcrumb'
import ServiceForm from './components/ServiceForm'
import './services.css'

const ServiceDetailPage = ({ servicio }) => (
    <div className="contenedor servicios">
        <ServiceBreadcrumb servicio={servicio} />
        <header className="servicios__encabezado">
            <h1>{servicio.nombre}</h1>
            <p>{servicio.resumen}</p>
        </header>

        <div className="servicios__distribucion">
            <main className="servicios__detalle">
                <img className="servicios__detalle-imagen" src={servicio.imagen} alt={`Servicio de ${servicio.nombre.toLowerCase()}`} />
                <p>{servicio.detalle}</p>
                <h2>¿En qué podemos ayudarte?</h2>
                <ul>
                    {servicio.puntos.map((punto) => <li key={punto}>{punto}</li>)}
                </ul>
                <p className="servicios__detalle-nota">El alcance, precio y tiempo de atención se coordinan después de revisar tu consulta.</p>
                <a className="servicios__volver" href="/servicios">← Volver a todos los servicios</a>
            </main>
            <ServiceForm servicioInicial={servicio.slug} />
        </div>
    </div>
)

export default ServiceDetailPage
