// si le token n'est pas vide, nous pouvons acceder à la page
if(localStorage.getItem("tokenIdentification") != null) {
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
    fetch("http://localhost:5678/api/users/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": user,
            "password": password
        })
    
}).then((response)=>{
    console.log(response)
    response.json().then((data)=>{
        console.log(data)
        
        if(data.token != null){
            localStorage.setItem("tokenIdentification",data.token)
            window.location.href = "http://127.0.0.1:5500" 
            
            headband = document.querySelector(".black-headband")
            headband.style.display = "flex"

            let modal = null

            const openModal = function(e) {
                e.preventDefault()
                const target = document.querySelector(e.target.getAttribute("href"))
                target.style.display = null
                target.setAttribute("aria-modal", "true")
                target.removeAttribute("aria-hidden")
                modal = target
                modal.addEventListener("click", closeModal)
                modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
                modal.querySelector(".js-modal-stop").addEventListener("click", closeModal)
            }
            
            const closeModal = function(e) {
                if (modal === null) return
                e.preventDefault()
                modal.style.display = "none"
                modal.setAttribute("aria-hidden", "true")
                modal.removeAttribute("aria-modal")
                modal.removeEventListener("click", closeModal)
                modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
                modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
                modal = null
            }

            const stopPropagation = function (e) {
                e.stopPropagation()
            }

            let clickModal = document.querySelector(".js-modal")
            clickModal.addEventListener("click",openModal)
            
            window.addEventListener("keydown", function (e) {
                if (e.key === "Escape" || e.key === "Esc"){
                    closeModal(e)
                }
            })
            }
            
          
            
        else {
            alert ("Identifiant ou mot de passe incorrect")
        }

    })
})

})