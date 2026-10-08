import Encabezado from './components/encabezado'
import ListaProductos from './components/listaProductos'
import Carrito from './components/carrito'

function App() {
  return (
    <div className="app">
      <Encabezado />
      <main className="contenido">
        <ListaProductos />
        <Carrito />
      </main>
    </div>
  )
}

export default App