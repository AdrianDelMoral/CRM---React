import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { ObtenerCliente, actualizarCliente } from "../data/Clientes"
import Formulario from "../components/Formulario"
import Error
 from "../components/Error"
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

export async function action({request, params}) {
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')
  
  // Validación
  const errores = []

  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son Obligatorios')
  }
  
  // Validar que el email tenga un formato válido
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)) {
    errores.push('El email no es Válido')
  }

  // Retornar datos si hay errores
  if(Object.keys(errores).length) {
    // console.log('Si hay errores');
    // console.log(Object.keys(errores)); // Si hay errores, nos devolverá un array de 0 ya que no hay nada escrito aún
    return errores
  }
  
  // Actualizar el cliente
  await actualizarCliente(params.clienteId, datos)
  return redirect('/')
}

function EditarCliente() {
  
  const navigate = useNavigate()
  // recibe la información del cliente para poder rellenar el formulario y editar
  const cliente = useLoaderData()

  const errores = useActionData()
  
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

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method='post'
          noValidate
        >
          <Formulario cliente={cliente}/>
          
          <input 
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente