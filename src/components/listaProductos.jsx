import { useEffect } from 'react'
import { useCarritoStore } from '../store/useCarritoStore'

function ListaProductos() {
  const productosAPI = useCarritoStore((state) => state.productosAPI)
  const obtenerProductosAPI = useCarritoStore((state) => state.obtenerProductosAPI)
  const cargando = useCarritoStore((state) => state.cargando)
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)

  // Llamamos a la API cuando el componente se monta
  useEffect(() => {
    obtenerProductosAPI()
  }, [obtenerProductosAPI])

  if (cargando) {
    return (
      <section className="panel">
        <h2>Productos</h2>
        <p className="vacio">Cargando productos de la API...</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Productos</h2>
      {productosAPI.map((producto) => (
        <div key={producto.id} className="fila">
          <div style={{ maxWidth: '65%' }}>
            <p className="fila-nombre" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {producto.nombre}
            </p>
            <p className="fila-detalle">
              ${producto.precio.toLocaleString('es-CO')}
            </p>
          </div>
          <button
            className="btn btn-primario"
            onClick={() => agregarProducto(producto)}
          >
            Agregar
          </button>
        </div>
      ))}
    </section>
  )
}

export default ListaProductos