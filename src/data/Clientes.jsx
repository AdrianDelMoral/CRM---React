export async function ObtenerClientes() {
  /* VITE_API_URL -> Variable de entorno, que en producción tiene un valor y en desarrollo otro diferenteo */
  const respuesta = await fetch(import.meta.env.VITE_API_URL)
  const resultado = await respuesta.json()
  
  return resultado;
}

export async function ObtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
  const resultado = await respuesta.json()
  
  return resultado;
}

export async function agregarCliente(datos) {

  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(datos), // datos que enviamos HACIA el servidor
      headers: {
        'Content-Type': 'application/json',
      }
    })
    await respuesta.json
  } catch (error) {
    console.log(error);
  }

  return null
}
