import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// createBrowserRouter -> Definir un router por medio de objetos
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import NuevoCliente from './pages/NuevoCliente'
import { Index } from './pages/Index'


const router = createBrowserRouter([
  // Rutas que van mediante un objeto
  {
    path: '/', // Lo que se cargará nada más se abra la página
    element: <Layout />,
    children:[
      {
        index: true, // Hace que en la página principal tome el layout, y ponga un elemento, para que ponga algo, debajo del titulo también
        element: <Index/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
