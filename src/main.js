// import {hola} from "./login.js"

const URL = import.meta.env.VITE_API_URL 
// hola()
const obtener = document.getElementById("obtener")
const tareas = document.getElementById("tareas")
const ATO = localStorage.getItem("ATO")
// autorización es que el sistema pueda determinar que soy yo, y el permiso es que el sistema sabiendo que soy yo luego determina si tengo permisos para algo o no. El ATO sirve para que el sistema pueda autorizarme, osea que me reconozca.
// el token puede estar guardado en el local-storage. Al abrir nuestro archivo es importante revisar si tenemos el token o no. Revisar si hay ATO o no. -> si no hay un ATO me redirige al /login.

function crearTarjeta(title, completed) {
  const div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `<span>${title}</span> <span class="completado">${completed ? "SI" : "NO"}</span>`
  div.getElementsByClassName("completado")[0]
  //el [0] -> es para acceder al primero de los elementos del array, el array es una lista ordenada, como esta ordenada yo puedo acceder a algun elemento que lo componen, se arranca con el número 0, y luego 1, 2, 3 etc. Depende del elemento que busco acceder de ese array.
  const completado = div.getElementsByClassName("completado")[0]
  completado.onclick = () => {
    console.log(holapapu)
  }
  return div
}

function obtenerTareasPaginadas(page = 0, take = 5) {
  fetch(`${URL}/tasks?page=${page}&take=${take}`, {
  // el fetch tiene la URL que declaramos en una variable, (el fetch es una promesa) el task es el recurso que buscamos acceder osea "tareas"
    method: "GET",
    // metodos: get, put, git, patch.
    headers: {
      "Content-Type": "application/json",
      // le decimos a la computadora lo que le estamos mandando y el "type" sería el tipo ej json, jpg, etc.
      "Authorization": ATO 
      //se utiliza la variable "ATO" . Puede haber un ATO, una key, va algo secreto.
    }
  })
  // las líneas 31-40 se realiza una operación de la promesa con la finalidad de transformar el codificado json a javascript
    .then((a) => a.json()) 
    // acá sería la respuesta (retorno) de las lineas 31-40.
    .then(json => {
      // lo que toma un then lo retorna en el siguiente then.
      
      console.log(json)
      json.data.forEach(element => {
        const card = crearTarjeta(element.title, element.completed)
        tareas.appendChild(card)
        // append -> agrega al final de los hijos.
        // ejemplos distintos: 
      });
      const cantPages = Math.ceil(json.total_result / take)
    });
}

function crearComponentePaginado(cantPages, page) {
  for (let i = 0; i < cantPages; i++) {
    crearboton(i)
  }
}

if (!ATO) { // Si el usuario no se encuentra logueado la página se mantendrá en "login" para que inicie sesión.
  // el "!" se refiere a una negación, por eso !ATO (si no hay ATO)
  window.location.href = "login"
  // el window.location.href sirve para la redirección. el .href me redirije a la página /login en este caso. Rutas relativas es poner ej: ./login 
} else {

  obtenerTareasPaginadas()

}


// comandos de consola: ls -> para listar carpetas. cd -> abrir una carpeta. por ej -> se utiliza para redireccionar archivos, imagenes, etc. Sirve para hacer scripts. Hay comandos también para buscar textos, revisar peso, revisar últimas modificaciones.
