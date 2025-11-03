const URL = import.meta.env.VITE_API_URL
const username = document.getElementById("username")
const password = document.getElementById("password")
const boton = document.getElementById("obtener")

boton.onclick = () => {
    const body = JSON.stringify({ username: username.value, password: password.value })
    fetch(`${URL}/auth`, {
        method: 'POST',
        body,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            localStorage.setItem("ATO", json.ATO)
        });
}



