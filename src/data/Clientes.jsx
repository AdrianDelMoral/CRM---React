export async function ObtenerClientes() {
  const respuesta = await fetch(import.meta.env.VITE_API_URL) /* VITE_API_URL -> Variable de entorno, que en producción tiene un valor y en desarrollo otro diferenteo */
  const resultado = await respuesta.json()
  
  return resultado;
}
