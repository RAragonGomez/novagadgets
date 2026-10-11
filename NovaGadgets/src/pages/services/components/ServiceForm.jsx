import { useState } from 'react'
import { servicios, WHATSAPP_NEGOCIO } from '../../../data/servicios'

const ServiceForm = ({ servicioInicial = '' }) => {
    const [formulario, setFormulario] = useState({
        servicio: servicioInicial,
        equipo: '',
        nombre: '',
        contacto: '',
        problema: '',
    })
    const [aviso, setAviso] = useState('')

    const actualizar = (evento) => {
        setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
        setAviso('')
    }

    const consultarPorWhatsApp = (evento) => {
        evento.preventDefault()

        if (!/^\d{10,15}$/.test(WHATSAPP_NEGOCIO)) {
            setAviso('Falta configurar el número de WhatsApp del negocio en src/data/servicios.js.')
            return
        }

        const nombreServicio = servicios.find(({ slug }) => slug === formulario.servicio)?.nombre || 'Por definir'
        const mensaje = [
            'Hola, quiero consultar sobre un servicio técnico.',
            `Servicio: ${nombreServicio}`,
            `Equipo: ${formulario.equipo}`,
            `Nombre: ${formulario.nombre}`,
            `Contacto: ${formulario.contacto}`,
            `Problema: ${formulario.problema}`,
        ].join('\n')

        window.open(`https://wa.me/${WHATSAPP_NEGOCIO}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer')
    }

    return (
        <aside className="servicios__consulta" aria-labelledby="consulta-equipo-titulo">
            <h2 id="consulta-equipo-titulo">Consulta sobre tu equipo</h2>
            <p className="servicios__consulta-intro">Completa los datos y coordina con un asesor.</p>
            <form className="servicios__formulario" onSubmit={consultarPorWhatsApp}>
                <label htmlFor="consulta-servicio">Servicio</label>
                <select id="consulta-servicio" name="servicio" value={formulario.servicio} onChange={actualizar} required>
                    <option value="">Selecciona un servicio</option>
                    {servicios.map((servicio) => (
                        <option key={servicio.slug} value={servicio.slug}>{servicio.nombre}</option>
                    ))}
                </select>

                <label htmlFor="consulta-equipo">Tipo de equipo</label>
                <select id="consulta-equipo" name="equipo" value={formulario.equipo} onChange={actualizar} required>
                    <option value="">Selecciona tu equipo</option>
                    <option value="PC de escritorio">PC de escritorio</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Otro equipo">Otro equipo</option>
                </select>

                <label htmlFor="consulta-nombre">Nombre</label>
                <input id="consulta-nombre" name="nombre" value={formulario.nombre} onChange={actualizar} placeholder="Tu nombre" autoComplete="name" required />

                <label htmlFor="consulta-contacto">Teléfono o correo</label>
                <input id="consulta-contacto" name="contacto" value={formulario.contacto} onChange={actualizar} placeholder="Un dato de contacto" autoComplete="email" required />

                <label htmlFor="consulta-problema">¿Qué problema presenta?</label>
                <textarea id="consulta-problema" name="problema" value={formulario.problema} onChange={actualizar} placeholder="Describe el problema" rows="4" required />

                <button className="servicios__boton-whatsapp" type="submit">Consultar por WhatsApp</button>
                <p className="servicios__nota-whatsapp">Se abrirá WhatsApp con tu consulta. Podrás revisar el mensaje antes de enviarlo.</p>
                <p className="servicios__aviso" role="status">{aviso}</p>
            </form>
        </aside>
    )
}

export default ServiceForm
