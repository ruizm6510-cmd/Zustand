import { useCarritoStore } from '../store/useCarritoStore'

function Carrito() {
  const items = useCarritoStore((state) => state.items)
  const disminuirProducto = useCarritoStore((state) => state.disminuirProducto)
  const agregarProducto = useCarritoStore((state) => state.agregarProducto)
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto)
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito)

  const total = items.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  )

  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Carrito</h2>
        <p className="vacio">Tu carrito está vacío</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Carrito</h2>
      {items.map((item) => {
        // Calculamos el subtotal por producto
        const subtotal = item.precio * item.cantidad

        return (
          <div key={item.id} className="fila">
            <div>
              <p className="fila-nombre">{item.nombre}</p>
              <p className="fila-detalle">
                {item.cantidad} x ${item.precio.toLocaleString('es-CO')} = <strong>${subtotal.toLocaleString('es-CO')}</strong>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button
                className="btn btn-secundario"
                onClick={() => disminuirProducto(item.id)}
              >
                −
              </button>
              <button
                className="btn btn-secundario"
                onClick={() => agregarProducto(item)}
              >
                +
              </button>
              <button
                className="btn btn-secundario"
                onClick={() => eliminarProducto(item.id)}
              >
                Quitar
              </button>
            </div>
          </div>
        )
      })}
      <div className="total">
        <span>Total</span>
        <strong>${total.toLocaleString('es-CO')}</strong>
      </div>
      <button
        className="btn btn-secundario btn-bloque"
        onClick={vaciarCarrito}
      >
        Vaciar carrito
      </button>
    </section>
  )
}

export default Carrito