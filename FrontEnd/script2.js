console.log("coucou")
// On empêche le rechargement de la page
let formulaire = document.getElementById("form")
formulaire.addEventListener("submit", (event) => {
    event.preventDefault()
    let user = document.getElementById("e-mail").value
    let password = document.getElementById("mot-de-passe").value
    console.log(user, password)
    
    fetch("http://localhost:5678/api/users/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": user,
            "password": password
        })
    })
})


