import { Form, useNavigate, useLoaderData } from "react-router-dom"
import Formulario from "../components/Formulario"
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
  
  const navigate = useNavigate()
  
  // recibe la información del cliente para poder rellenar el formulario y editar
  const cliente = useLoaderData()
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">A continuación podrás editar los datos de un Cliente</p>

      <div className="flex justify-end">
        <button 
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded"
          onClick={() => navigate('/')}  
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">

        {/* {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)} */}

        <Form
          method='post'
          noValidate
        >
          <Formulario cliente={cliente}/>
          
          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente