// import {hola} from "./login.js"

const URL = import.meta.env.VITE_API_URL
// hola()
const obtener = document.getElementById("obtener")
const tareas = document.getElementById("tareas")

const ATO = localStorage.getItem("ATO")






function crearTarjeta(title, completed) {
  const div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `<span>${title}</span> <span>${completed ? "SI" : "NO"}</span>`
  return div
}

function obtenerTareasPaginadas(page = 0, take = 5) {
  fetch(`${URL}/tasks?page=${page}&take=${take}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": ATO //se utiliza la variable "ATO"
    }
  })
    .then((a) => a.json())
    .then(json => {
      console.log(json)
      json.data.forEach(element => {
        const card = crearTarjeta(element.title, element.completed)
        tareas.appendChild(card)
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

} else {

  obtenerTareasPaginadas()

}



