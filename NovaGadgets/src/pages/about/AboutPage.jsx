import { useEffect, useRef } from 'react'
import './aboutPage.css'
import imagenEquipo from '../../assets/images/nova-equipo.png'

const valores = [
    { numero: '01', titulo: 'Honestidad', icono: '◇' },
    { numero: '02', titulo: 'Compromiso', icono: '⌘' },
    { numero: '03', titulo: 'Calidad', icono: '✳' },
    { numero: '04', titulo: 'Cercanía', icono: '↗' },
]

const pilares = [
    {
        numero: '01',
        titulo: 'Tecnología útil',
        descripcion: 'Elegimos equipos y componentes pensados para acompañarte en lo que haces todos los días.',
        icono: '◈',
    },
    {
        numero: '02',
        titulo: 'Asesoría clara',
        descripcion: 'Te ayudamos a entender tus opciones para que elijas con confianza y según tus necesidades.',
        icono: '⌘',
    },
    {
        numero: '03',
        titulo: 'Soporte cercano',
        descripcion: 'También estamos para ayudarte a mantener, mejorar y sacar más provecho de tu equipo.',
        icono: '↗',
    },
]

function AboutPage(){
    const imagenHistoriaRef = useRef(null)

    useEffect(() => {
        const imagen = imagenHistoriaRef.current

        if (!imagen || !('IntersectionObserver' in window)) return

        imagen.classList.add('nosotros__historia-imagen--revelar')

        const observador = new IntersectionObserver(([entrada]) => {
            if (entrada.isIntersecting) {
                imagen.classList.add('nosotros__historia-imagen--visible')
                observador.unobserve(imagen)
            }
        }, { threshold: 0.18 })

        observador.observe(imagen)
        return () => observador.disconnect()
    }, [])

    return <div className="contenedor nosotros">
        <section className="nosotros__hero" aria-labelledby="nosotros-titulo">
            <div className="nosotros__hero-copy">
                <p className="nosotros__eyebrow"><span aria-hidden="true" /> Conoce NovaGadgets</p>
                <h1 id="nosotros-titulo">La tecnología que te mueve, <span>a tu manera.</span></h1>
                <p className="nosotros__bajada">
                    Somos tu espacio para encontrar computadoras, componentes y soporte técnico.
                    Queremos que cada elección te acerque a lo que quieres crear, aprender o jugar.
                </p>
                <div className="nosotros__acciones">
                    <a className="boton boton--principal" href="/tienda">Explorar la tienda</a>
                    <a className="nosotros__enlace" href="/servicios">Conoce nuestros servicios <span aria-hidden="true">→</span></a>
                </div>
            </div>
            <div className="nosotros__hero-arte" aria-hidden="true">
                <div className="nosotros__orb nosotros__orb--uno" />
                <div className="nosotros__orb nosotros__orb--dos" />
                <div className="nosotros__monograma">NG</div>
                <span className="nosotros__chip nosotros__chip--uno">TECNOLOGÍA</span>
                <span className="nosotros__chip nosotros__chip--dos">A TU RITMO</span>
            </div>
        </section>

        <section className="nosotros__historia" aria-labelledby="nosotros-historia-titulo">
            <div className="nosotros__seccion-label"><span>01</span> Nuestra historia</div>
            <div className="nosotros__historia-copy">
                <h2 id="nosotros-historia-titulo">Una amistad, una pasión y una idea clara.</h2>
                <p>
                    Somos un grupo de jóvenes apasionados por la tecnología que decidió convertir su experiencia y
                    conocimientos en una tienda donde comprar una computadora sea sencillo, transparente y con asesoría real.
                </p>
                <p>
                    NOVA GADGETS nació de una amistad formada en las aulas de Cibertec. Compartíamos el interés por el hardware
                    y la idea de que la tecnología debería ser accesible para cualquier persona.
                </p>
                <p>
                    Con el tiempo comenzamos ayudando a familiares y amigos a reparar, actualizar y armar sus equipos. Esa
                    experiencia nos mostró que muchas personas necesitaban una asesoría honesta para elegir la computadora
                    adecuada sin complicarse con términos técnicos ni pagar de más.
                </p>
                <p>
                    Hoy seguimos trabajando con la misma filosofía: ofrecer productos confiables, un servicio técnico
                    responsable y una atención cercana para que cada cliente encuentre la solución que realmente necesita.
                </p>
            </div>
            <figure ref={imagenHistoriaRef} className="nosotros__historia-imagen">
                <img
                    src={imagenEquipo}
                    alt="Un grupo de jóvenes colabora en un taller de tecnología y armado de computadoras."
                    loading="lazy"
                    width="513"
                    height="288"
                />
            </figure>
        </section>

        <section className="nosotros__historia nosotros__historia--equipo" aria-labelledby="nosotros-equipo-titulo">
            <div className="nosotros__seccion-label"><span>02</span> Lo que creemos</div>
            <div className="nosotros__historia-copy">
                <h2 id="nosotros-equipo-titulo">Un buen equipo abre nuevas posibilidades.</h2>
                <p>
                    En NovaGadgets creemos que la tecnología debe sentirse accesible. Por eso reunimos
                    productos para distintos usos y presupuestos, junto con orientación para que puedas
                    encontrar la combinación adecuada para ti.
                </p>
                <p>
                    Desde elegir una laptop hasta armar una PC o pedir ayuda con el mantenimiento,
                    queremos hacer más sencillo cada paso de tu experiencia tecnológica.
                </p>
            </div>
        </section>

        <section className="nosotros__valores" aria-labelledby="nosotros-pilares-titulo">
            <div className="nosotros__valores-intro">
                <div className="nosotros__seccion-label"><span>03</span> Lo que nos guía</div>
                <h2 id="nosotros-pilares-titulo">Una experiencia pensada para ti.</h2>
                <p>Queremos que comprar tecnología sea más simple, desde la primera pregunta hasta tener tu equipo listo.</p>
            </div>
            <div className="nosotros__tarjetas">
                {pilares.map((valor) => (
                    <article className="nosotros__tarjeta" key={valor.numero}>
                        <div className="nosotros__tarjeta-top">
                            <span className="nosotros__tarjeta-numero">{valor.numero}</span>
                            <span className="nosotros__tarjeta-icono" aria-hidden="true">{valor.icono}</span>
                        </div>
                        <h3>{valor.titulo}</h3>
                        <p>{valor.descripcion}</p>
                    </article>
                ))}
            </div>
        </section>

        <section className="nosotros__proposito" aria-labelledby="nosotros-proposito-titulo">
            <div className="nosotros__proposito-intro">
                <div className="nosotros__seccion-label"><span>04</span> Nuestro propósito</div>
                <h2 id="nosotros-proposito-titulo">Lo que nos mueve hacia adelante.</h2>
            </div>
            <div className="nosotros__proposito-tarjetas">
                <article className="nosotros__proposito-tarjeta">
                    <span className="nosotros__proposito-etiqueta">Nuestra misión</span>
                    <h3>Hacer que la tecnología esté al alcance de todos.</h3>
                    <p>
                        Ofrecer equipos de cómputo, componentes y accesorios de calidad a precios competitivos,
                        complementados con servicios técnicos especializados que permitan a estudiantes, hogares
                        y pequeños negocios contar con soluciones tecnológicas confiables.
                    </p>
                </article>
                <article className="nosotros__proposito-tarjeta nosotros__proposito-tarjeta--vision">
                    <span className="nosotros__proposito-etiqueta">Nuestra visión</span>
                    <h3>Ser una tienda de confianza en Lima.</h3>
                    <p>
                        Ser la tienda de confianza en Lima para quienes buscan equipos confiables, asesoría honesta
                        y soluciones tecnológicas adaptadas a cada necesidad.
                    </p>
                </article>
            </div>
        </section>

        <section className="nosotros__nuestros-valores" aria-labelledby="nosotros-valores-titulo">
            <div className="nosotros__seccion-label"><span>05</span> Nuestra esencia</div>
            <h2 id="nosotros-valores-titulo">Nuestros valores</h2>
            <div className="nosotros__valores-lista">
                {valores.map((valor) => (
                    <article className="nosotros__valor" key={valor.numero}>
                        <span className="nosotros__valor-icono" aria-hidden="true">{valor.icono}</span>
                        <h3>{valor.titulo}</h3>
                    </article>
                ))}
            </div>
        </section>

        <section className="nosotros__cta" aria-labelledby="nosotros-cta-titulo">
            <div>
                <p className="nosotros__eyebrow"><span aria-hidden="true" /> Empecemos</p>
                <h2 id="nosotros-cta-titulo">¿Qué tienes en mente?</h2>
                <p>Explora el catálogo o conversemos sobre el equipo que necesitas.</p>
            </div>
            <div className="nosotros__cta-acciones">
                <a className="boton boton--principal" href="/tienda">Ver productos</a>
                <a className="boton boton--secundario" href="/contacto">Contáctanos</a>
            </div>
        </section>
    </div>
}

export default AboutPage
