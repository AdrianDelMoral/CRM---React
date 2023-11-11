import { ObtenerCliente } from "../data/Clientes"

export async function loader({params}) {
  const cliente = await ObtenerCliente(params.clienteId)
  
  if (Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'El Cliente no se ha Encontrado'
    })
  }

  return cliente  
}

function EditarCliente() {



  return (
    <div>EditarCliente</div>
  )
}

export default EditarCliente