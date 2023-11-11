import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// createBrowserRouter -> Definir un router por medio de objetos
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './components/Layout'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarCliente, { loader as editarClienteLoader } from './pages/EditarCliente'


const router = createBrowserRouter([
  // Rutas que van mediante un objeto
  {
    path: '/', // Lo que se cargará nada más se abra la página
    element: <Layout />,
    children:[
      {
        index: true, // Hace que en la página principal tome el layout, y ponga un elemento, para que ponga algo, debajo del titulo también
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>,
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        /* action: editarClienteAction, */
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
