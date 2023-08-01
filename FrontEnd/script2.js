let myMail = "cedric.travanca@gmail.com"
let myPassword = "Ticketentree"

function checkIt() {
    let user = document.getElementById("e-mail").value
    let password = document.getElementById("mot-de-passe").value

// On empêche le rechargement de la page
    let btnconnecter = document.getElementById("btn-submit")
    btnconnecter.addEventListener("submit", (event) => {
    event.preventDefault()
    })
    
if (user == myMail && password == myPassword) {
    console.log("Acces autorisé");
} else {
    console.log("E-mail ou mot de passe incorrecte");
}
}

