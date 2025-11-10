const URL = import.meta.env.VITE_API_URL
const username = document.getElementById("username")
const password = document.getElementById("password")
// username y password son un input.
const boton = document.getElementById("obtener")
// "obtener" es un botón.
const ATO = localStorage.getItem("ATO")

if (ATO) {
    window.location.href = '/'

}
// lo que hace este if es verificar si tenemos ATO o no. '/' -> refiere a que me manda la pagina mas alta. Por ejemplo, te logueas y te manda a location de la pagina de inicio (index)
// en este if también podríamos agregar cuanto tiempo de validez tiene el token. Si el token existe y es válido redirijirá al usuario a la pagina que corresponda, en este caso '/'


boton.onclick = () => {
    const body = JSON.stringify({ username: username.value, password: password.value }) //información que vamos a mandar. El stringify es para comunicar al backend en un formato JSON y para no cometer conflictos (el backend puede que este en otro lenguaje) se manda en string.
    fetch(`${URL}/auth`, { //el auth es el nombre del recurso. Nos proporciona recursos sobre login. /task sería de tareas.
        method: 'POST', 
        // get -> para obtener 
        // post -> para crear
        // patch -> para editar / objeto parcial.
        // put -> para editar / todo el objeto.
        // delete -> en vez de borrar algo del registro lo marco como borrado -> se utiliza para que quede el dato exclusivamente para el backend y no para el front osea no para el usuario. Suele utilizarse para datos de importancia ej -> bancos.
        body,
        headers: {
            "Content-Type": "application/json" //con el content type se le avisa al servidor que tipo de contenido le estamos mandando, le solicitamos que entienda mi mensaje en JSON.
        }
    })
        .then((response) => response.json()) //el then es el proceso inverso al stringify, convierto el formato JSON en un objeto de javascript, como es una promesa puedo ir haciendolo por partes, el then que le sigue tendrá una función "return" -> de respuesta, si en algún momento irá al catch.
        .then((json) => {
            console.log(json)

            if (json.ATO) {

                localStorage.setItem("ATO", json.ATO) //se guarda si el ATO fue recibido. (pero se guarda sólo de forma local -> el localStorage permanece si apago la computadora o navego en otras webs)

            }

        }).catch((err) => {  //El catch agarra el error y lo maneja de alguna forma. se realizó una función anónima (()) =>

            const { message } = err 
            // acá el catch informa al usuario de que falló algo y qué fallo.

            console.log(message)


        }

        )
}

// export function hola () {
// console.log("hola")
// }



