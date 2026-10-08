import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
  return(
    <div className="app">
      <Header />
      <main className="app__contenido">
        {/* Aquí colocaremos las pantallas del proyecto. */}
      </main>
      <Footer />
    </div>
  )
}

export default App
