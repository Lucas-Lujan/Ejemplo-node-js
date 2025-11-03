const URL = import.meta.env.API_URL

const obtener = document.getElementById("obtener")
const tareas = document.getElementById("tareas")


function crearTarjeta(title, completed) {
  const div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `<span>${title}</span> <span>${completed ? "SI" : "NO"}</span>`
  return div
}

function obtenerTareasPaginadas (page=0,take=5) {
  fetch(`${URL}/tasks?page=${page}&take=${take}`)
    .then((response) => response.json())
    .then((json) => {
      json.data.forEach(element => {
        const card = crearTarjeta(element.title, element.completed)
        tareas.appendChild(card)
      });
    const cantPages= Math.ceil(json.total_result/take)
    });
}

function crearComponentePaginado (cantPages, page) {
  for (let i=0; i<cantPages; i++){
    crearboton (i)
  }
}

obtenerTareasPaginadas()