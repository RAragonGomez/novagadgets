import imagenMantenimiento from '../assets/images/services/mantenimiento.jpg'
import imagenSoftware from '../assets/images/services/instalacion-software.jpg'
import imagenDiagnostico from '../assets/images/services/diagnostico-reparacion.jpg'

// Escribe aquí el WhatsApp del negocio con código de país y solo dígitos.
// Ejemplo de formato para Perú: 51987654321
export const WHATSAPP_NEGOCIO = ''

export const servicios = [
    {
        slug: 'mantenimiento',
        nombre: 'Mantenimiento de equipos',
        resumen: 'Limpieza y revisión de hardware.',
        imagen: imagenMantenimiento,
        puntos: ['Limpieza interna y externa / pasta térmica', 'Revisión de componentes y rendimiento', 
            'Revisión de ventilación y temperaturas','Optimización y revisión del sistema'],
        detalle: 'Realizamos una revisión preventiva y limpieza para ayudar a que tu equipo se mantenga en buenas condiciones.',
    },
    {
        slug: 'instalacion-software',
        nombre: 'Instalación de software',
        resumen: 'Instalación y configuración de programas.',
        imagen: imagenSoftware,
        puntos: ['Sistema operativo y controladores', 'Configuración de los programas que necesitas',
            'Revisión del funcionamiento'
        ],
        detalle: 'Te ayudamos a dejar tu computadora lista para trabajar, estudiar o disfrutar tus aplicaciones favoritas.',
    },
    {
        slug: 'diagnostico-reparacion',
        nombre: 'Diagnóstico y reparación',
        resumen: 'Revisión de fallas de hardware y software.',
        imagen: imagenDiagnostico,
        puntos: ['Encendido, lentitud o sobrecalentamiento', 'Presupuesto después de la evaluación'],
        detalle: 'Revisamos los síntomas que presenta tu computadora para orientarte sobre la causa y los siguientes pasos.',
    },
]
