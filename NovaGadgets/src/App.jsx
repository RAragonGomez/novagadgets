import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Inicio from './pages/home/Inicio'
import Tienda from './pages/store/Tienda'
import './App.css'

const App = () => {
  // Vista provisional hasta integrar las rutas de la SPA.
  const esTienda = window.location.pathname === '/tienda'

  return(
    <div className="app">
      <Header />
      <main className="app__contenido">
        {esTienda ? <Tienda /> : <Inicio />}
      </main>
      <Footer />
    </div>
  )
}

export default App
