//nous définissions que nous ne sommes pas connecté
let isConnect = false
console.log(isConnect)

// si le token n'est pas vide, nous pouvons acceder à la page
console.log(sessionStorage.getItem("tokenIdentification"))
if (sessionStorage.getItem("tokenIdentification") != null) {
    isConnect = true
}

// création boutton filtre "tous"
const sectFiltre = document.querySelector(".filters")
const btnTrierTous = document.createElement("button")
btnTrierTous.innerText = "Tous"
btnTrierTous.id = "btn-tous"
btnTrierTous.value = "all"
btnTrierTous.classList = "active"
sectFiltre.appendChild(btnTrierTous)



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

showWorks()

//Bandeau noir du mode edition qui disparait si nous ne somme pas enregistrés
headband = document.querySelector(".black-headband")
headband.style.display = "none"

//Bouton modifier des projets qui disparait si nous ne somme pas enregistrés ce qui fait que la modal est fermée
btnModif = document.getElementById("open-modal")
btnModif.style.display = "none"
//La deuxieme modal est fermée
btnOpenModal2 = document.getElementById("modal2")
btnOpenModal2.style.display = "none"

//si nous sommes connectés, changement de certains parametres
if (isConnect == true) {
    //changer login en logout
    showLogout = document.getElementById("login")
    showLogout.textContent = "logout"
    logoutId = document.getElementById("login")
    logoutId.id = "logout"
    //effacer le storage du token si il y a un clic sur "Logout"
    deleteTokenStorage = document.getElementById("logout")
    deleteTokenStorage.addEventListener("click", function () {
        sessionStorage.removeItem("tokenIdentification")
        window.location.href = "http://127.0.0.1:5500/index.html"
    })
//Le bandeau noir du mode édition apparait si nous sommes connectés et les filtres disparraissent
    headband.style.display = "flex"
    btnModif.style.display = "inline-block"
    filters = document.querySelector(".filters")
    filters.style.display = "none"

} else {
    //si nous ne sommes pas connectés, le bouton de modification n'apparait pas
    btnModif.style.display = "none"
}

let modal = null

const stopPropagation = function (e) {
    e.stopPropagation()
}

//ouverture de la modal lors du click sur le bouton "modifier" de la page principal
let clickModal = document.querySelector(".js-modal")
clickModal.addEventListener("click", openModal)



let modal2 = null

//lors du click sur "ajouter une photo" la modal2 s'ouvre et avec tout les champs vides
let clickModal2 = document.getElementById("open-modal2")
clickModal2.addEventListener("click", openModal2)
clickModal2.addEventListener("click", clearModal2)

//lors du clic sur la fleche de retour de la modal2, retour sur la modal
let backToModal = document.querySelector(".fa-arrow-left")
backToModal.addEventListener("click", closeModal2)

addCategorieToSelect()

loadImgModal()

//afficher les nouveaux travaux après validation, sans recharger la page
let btnValiderNouvelleImg = document.getElementById("form")
btnValiderNouvelleImg.addEventListener("submit", function (event) {
    event.preventDefault()
    loadNewWorks()
})

//selection des 3 champs pour le nouveau work 
let newImgTitle = document.getElementById("titre")
let newImgCat = document.getElementById("categorie")
let newImgImage = document.getElementById("id-input")

//a chaque changement nous verifions si un champ est vide dans le formulaire
newImgTitle.addEventListener("change", checkForm)
newImgCat.addEventListener("change", checkForm)
newImgImage.addEventListener("change", checkForm)



