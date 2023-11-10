export async function ObtenerClientes() {
  /* VITE_API_URL -> Variable de entorno, que en producción tiene un valor y en desarrollo otro diferenteo */
  const respuesta = await fetch(import.meta.env.VITE_API_URL)
  const resultado = await respuesta.json()
  
  return resultado;
}
