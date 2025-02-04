// si le token n'est pas vide, nous pouvons acceder à la page
if (sessionStorage.getItem("tokenIdentification") != null) {
    window.location.href = "http://127.0.0.1:5500"
}

// On empêche le rechargement de la page
let formulaire = document.getElementById("form")
formulaire.addEventListener("submit", (event) => {
    event.preventDefault()

    // Nous définissions les valeurs de l'identifiant et du mdp.
    let user = document.getElementById("e-mail").value
    let password = document.getElementById("mot-de-passe").value
    console.log(user, password)

    // Nous envoyons à l'api les infos utilisateur et mdp pour verification
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": user,
            "password": password
        })

    }).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)

        // si dans l'API nous trouvons des données pour le token, alors nous l'enregistrons dans sessionStorage
            if (data.token != null) {
                sessionStorage.setItem("tokenIdentification", data.token)
                window.location.href = "http://127.0.0.1:5500"
                console.log(data.token)
            }
            else {
                alert("Identifiant ou mot de passe incorrect")
            }
        })
    })
})
