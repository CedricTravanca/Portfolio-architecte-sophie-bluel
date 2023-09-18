//nous définissions que nous ne commes pas connecté
let isConnect = false
console.log(isConnect)

// si le token n'est pas vide, nous pouvons acceder à la page
if (localStorage.getItem("tokenIdentification") != "null") {
    //   window.location.href = "http://127.0.0.1:5500"
    isConnect = true
    console.log(isConnect)
} 

// création boutton "tous"
const sectFiltre = document.querySelector(".filters")
const btnTrierTous = document.createElement("button")
btnTrierTous.innerText = "Tous"
btnTrierTous.id = "btn-tous"
btnTrierTous.value = "all"
btnTrierTous.classList = "active"
sectFiltre.appendChild(btnTrierTous)

// fonction pour charger les travaux 
async function loadWorks() {
    response = await fetch("http://localhost:5678/api/works")
    works = await response.json()
    return works
}

// fonction pour charger les catégories
async function loadCategories() {
    response = await fetch("http://localhost:5678/api/categories")
    categories = await response.json()
    return categories
}


//nous appelons les catégories via fetch afin de les utiliser pour nos filtres
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {

        // parcourir les catégories pour les associer aux boutons de tri
        for (let id in data) {
            let category = data[id]

            //Création des boutons de tri via parcours de des infos des catégories appelées avec fetch 
            let button = document.createElement("button")
            button.value = category.id
            button.textContent = category.name
            //console.log(category.name)


            //Je place mes bouttons de filtres dans la div filters
            let categories = document.querySelector(".filters")
            categories.appendChild(button)
        }

        // application de css sur les bouttons de tri avec la fonction click
        let filters = document.querySelectorAll(".filters button")
        filters.forEach((filter) => {
            filter.addEventListener("click", () => {
                // désactivation/activation de la class "active"
                filters.forEach((filter) => {
                    filter.classList.remove("active")
                })
                filter.classList.add("active")

                // Vider gallery
                document.querySelector(".gallery").innerHTML = "";

                // Puis charger les travaux selon la catégorie cliquée
                loadWorks().then(works => {
                    for (let id in works) {
                        let work = works[id]
                        if (filter.value == "all") {
                            let figElement = document.createElement("figure")

                            let imgElement = document.createElement("img")
                            imgElement.src = work.imageUrl
                            imgElement.alt = work.title

                            let figCaptionElement = document.createElement("figCaption")
                            figCaptionElement.textContent = work.title

                            figElement.appendChild(imgElement)
                            figElement.appendChild(figCaptionElement)

                            //l'ensemble des éléments crées dans figElement vont être placés dans ma div gallery et se nommerons travaux
                            let travaux = document.querySelector(".gallery")
                            travaux.appendChild(figElement)

                        } else {
                            if (work.category.id == filter.value) {
                                let figElement = document.createElement("figure")

                                let imgElement = document.createElement("img")
                                imgElement.src = work.imageUrl
                                imgElement.alt = work.title

                                let figCaptionElement = document.createElement("figCaption")
                                figCaptionElement.textContent = work.title

                                figElement.appendChild(imgElement)
                                figElement.appendChild(figCaptionElement)

                                //l'ensemble des éléments crées dans figElement vont être placés dans ma div gallery et se nommerons travaux
                                let travaux = document.querySelector(".gallery")
                                travaux.appendChild(figElement)
                            }
                        }
                    }
                });

            })
        })

    })

// Récupération des travaux qui vont apparaitre sans avoir cliquer sur les boutons de tri
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        //on parcours la liste des éléments id présents dans data
        for (let id in data) {
            let object = data[id]

            //Création d'une balise figure qui contiendras l'image et sa description
            let figElement = document.createElement("figure")

            let imgElement = document.createElement("img")
            imgElement.src = object.imageUrl
            imgElement.alt = object.title

            let figCaptionElement = document.createElement("figCaption")
            figCaptionElement.textContent = object.title

            figElement.appendChild(imgElement)
            figElement.appendChild(figCaptionElement)

            //l'ensemble des éléments crées dans figElement vont être placés dans ma div gallery et se nommerons travaux
            let travaux = document.querySelector(".gallery")
            travaux.appendChild(figElement)
        }
    })


headband = document.querySelector(".black-headband")
headband.style.display = "none"

btnModif = document.getElementById("open-modal")
btnModif.style.display = "none"

if (isConnect == true) {
    console.log("connecté")
    /*showLogout = document.getElementById("login")
    showLogout.textContent = "logout"
    logoutId = document.getElementById("login")
    logoutId.id = "logout"
    deleteTokenStorage = document.getElementById("logout")
    deleteTokenStorage.addEventListener("click",localStorage.setItem("tokenIdentification", data.token))
    */
    headband.style.display = "flex"
    btnModif.style.display = "inline-block"
    filters = document.querySelector(".filters")
    filters.style.display = "none"

}

if (isConnect == false) {
    console.log("déconnecté")
    btnModif.style.display = "none"
}

let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.setAttribute("aria-modal", "true")
    target.removeAttribute("aria-hidden")
    modal = target
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

let clickModal = document.querySelector(".js-modal")
clickModal.addEventListener("click", openModal)

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

