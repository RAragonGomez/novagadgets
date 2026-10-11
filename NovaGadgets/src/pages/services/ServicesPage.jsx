import { servicios } from '../../data/servicios'
import ServiceBreadcrumb from './components/ServiceBreadcrumb'
import ServiceForm from './components/ServiceForm'
import './services.css'

const ServicesPage = () => (
    <div className="contenedor servicios">
        <ServiceBreadcrumb />
        <header className="servicios__encabezado">
            <h1>Servicios técnicos</h1>
            <p>Atención para computadoras de escritorio y laptops.</p>
        </header>

        <div className="servicios__distribucion">
            <div className="servicios__principal">
                <div className="servicios__lista">
                    {servicios.map((servicio) => (
                        <article className="servicios__tarjeta" key={servicio.slug}>
                            <img src={servicio.imagen} alt="" width="160" height="120" loading="lazy" />
                            <div className="servicios__tarjeta-contenido">
                                <h2>{servicio.nombre}</h2>
                                <p>{servicio.resumen}</p>
                                <ul>
                                    {servicio.puntos.map((punto) => <li key={punto}>{punto}</li>)}
                                </ul>
                            </div>
                            <a className="servicios__detalle-link" href={`/servicios/${servicio.slug}`}>Ver detalle</a>
                        </article>
                    ))}
                </div>

                <section className="servicios__antes" aria-labelledby="servicios-antes-titulo">
                    <h2 id="servicios-antes-titulo">Antes de solicitar un servicio</h2>
                    <p>Describe el problema y el modelo de tu equipo.</p>
                    <p>El asesor confirmará el precio y el tiempo de atención al revisar tu consulta.</p>
                </section>
            </div>
            <ServiceForm />
        </div>
    </div>
)

export default ServicesPage
