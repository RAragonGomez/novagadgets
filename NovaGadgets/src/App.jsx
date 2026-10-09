import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Inicio from './pages/home/Inicio'
import './App.css'

const App = () => {
  return(
    <div className="app">
      <Header />
      <main className="app__contenido">
        <Inicio />
      </main>
      <Footer />
    </div>
  )
}

export default App
