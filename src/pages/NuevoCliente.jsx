// Permite navegar de forma programada, para que cuando se pulse un botón o después de pasar una validación poder navegar a otra página
import { useNavigate, Form } from "react-router-dom"
import Formulario from '../components/Formulario'

export async function action({request}) {
  const formData = await request.formData()

  // debugear un formData -> console.log([...formData]);

  const datos = Object.fromEntries(formData)

  console.log(datos);

  return null
}

function NuevoCliente() {
  
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Rellena todos los campos para registrar un nuevo Cliente</p>
      <div className="flex justify-end">
        <button 
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded"
          onClick={() => navigate('/')}  
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">

        <Form
          method='post'
        >
          <Formulario />
          
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

export default NuevoCliente