import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Inicio from './pages/home/Inicio'
import Tienda from './pages/store/Tienda'
import AboutPage from './pages/about/AboutPage'
import AccountPage from './pages/account/AccountPage'
import CreateAccountPage from './pages/account/CreateAccountPage'
import AccountSettingsPage from './pages/account/AccountSettingsPage'
import ServicesPage from './pages/services/ServicesPage'
import ServiceDetailPage from './pages/services/ServiceDetailPage'
import { servicios } from './data/servicios'
import { obtenerUsuarioActual } from './services'
import './App.css'

const CuentaProtegida = ({ vista }) => {
  const [usuario] = useState(() => obtenerUsuarioActual())

  useEffect(() => {
    if (!usuario) window.location.replace('/account')
  }, [usuario])

  return usuario ? <AccountSettingsPage vista={vista} usuario={usuario} /> : null
}

const App = () => {
  // Vista provisional hasta integrar las rutas de la SPA.
  const rutaActual = window.location.pathname.replace(/\/+$/, '') || '/'
  const esTienda = rutaActual === '/tienda'
  const esNosotros = rutaActual === '/nosotros'
  const esCuenta = rutaActual === '/account'
  const esCrearCuenta = rutaActual === '/account/crear-cuenta'
  const esDatosPersonales = rutaActual === '/account/datos-personales'
  const esSeguridad = rutaActual === '/account/seguridad'
  const esRutaServicios = rutaActual === '/servicios' || rutaActual.startsWith('/servicios/')
  const servicioActual = servicios.find((servicio) => rutaActual === `/servicios/${servicio.slug}`)

  return(
    <div className="app">
      <Header />
      <main className="app__contenido">
        {esTienda ? <Tienda />
          : esNosotros ? <AboutPage />
            : esDatosPersonales ? <CuentaProtegida vista="personal" />
              : esSeguridad ? <CuentaProtegida vista="seguridad" />
                : esCrearCuenta ? <CreateAccountPage />
                  : esCuenta ? <AccountPage />
                : servicioActual ? <ServiceDetailPage servicio={servicioActual} />
                  : esRutaServicios ? <ServicesPage />
                    : <Inicio />}
      </main>
      <Footer />
    </div>
  )
}

export default App

