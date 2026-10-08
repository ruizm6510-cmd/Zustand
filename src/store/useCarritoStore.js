import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCarritoStore = create(
  persist(
    (set) => ({
      items: [],
      productosAPI: [], // Aquí guardaremos los productos que vienen de la API
      cargando: false,  // Para saber si se están cargando los datos

      // Acción para obtener los productos desde la API de Fake Store
      obtenerProductosAPI: async () => {
        set({ cargando: true })
        try {
          const respuesta = await fetch('https://fakestoreapi.com/products')
          const datos = await respuesta.json()
          
          // Adaptamos las propiedades de la API (title -> nombre, price -> precio)
          const productosAdaptados = datos.map((prod) => ({
            id: prod.id,
            nombre: prod.title,
            precio: Math.round(prod.price * 4000), // Convertimos a pesos colombianos aprox o dejamos el precio original
          }))

          set({ productosAPI: productosAdaptados, cargando: false })
        } catch (error) {
          console.error('Error al cargar la API:', error)
          set({ cargando: false })
        }
      },

      agregarProducto: (producto) =>
        set((state) => {
          const existe = state.items.find((item) => item.id === producto.id)
          if (existe) {
            return {
              items: state.items.map((item) =>
                item.id === producto.id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              ),
            }
          }
          return { items: [...state.items, { ...producto, cantidad: 1 }] }
        }),

      disminuirProducto: (id) =>
        set((state) => {
          const itemEncontrado = state.items.find((item) => item.id === id)
          if (itemEncontrado && itemEncontrado.cantidad === 1) {
            return {
              items: state.items.filter((item) => item.id !== id),
            }
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ),
          }
        }),

      eliminarProducto: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      vaciarCarrito: () => set({ items: [] }),
    }),
    {
      name: 'carrito-storage',
    }
  )
)