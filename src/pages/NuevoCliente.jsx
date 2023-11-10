// Permite navegar de forma programada, para que cuando se pulse un botón o después de pasar una validación poder navegar a otra página
import { useNavigate, Form, useActionData } from "react-router-dom"
import Formulario from '../components/Formulario'
import Error from "../components/Error"

export async function action({request}) {
  const formData = await request.formData()

  // debugear un formData -> console.log([...formData]);

  const datos = Object.fromEntries(formData)

  const email = formData.get('email')

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

}

function NuevoCliente() {

  // Action / useActionData -> cuando quieras obtener el resultado de un action
  const errores = useActionData()
  
  const navigate = useNavigate()

  // Nos dirá los errores que hay
  // console.log(errores);

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

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method='post'
          noValidate
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