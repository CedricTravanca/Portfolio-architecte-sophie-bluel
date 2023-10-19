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

//nous parcourons les différentes catégories présentes dans l'API afin de pouvoir choisir la catégorie voulu lors de l'ajout d'une nouvelle image
function addCategorieToSelect() {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            for (let id in data) {
                let category = data[id]
                console.log(category.name)
//création des différentes options de catégories à choisir 
                let options = document.createElement("option")

                options.textContent = category.name
                options.value = category.id
                inputCategorie = document.getElementById("categorie")
                inputCategorie.appendChild(options)
            }
        })
}

function showWorks() {
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
}

//Cette fonction permet d'ouvrir la boite modal et la mise en place des options qui l'accompagnent
const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.setAttribute("aria-modal", "true")
    target.removeAttribute("aria-hidden")
    modal = target
    modal.addEventListener("click",closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

}

//Cette fonction permet de fermet la boite modal et la suppression des options qui l'accompagnent
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click",closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

//fermeture de la modal en cas de pression sur la touche ESC du clavier
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal2(e)
        closeModal(e)
    }
})

//ouverture de la modal2 et des options qui l'accompagnent 
const openModal2 = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.setAttribute("aria-modal", "true")
    target.removeAttribute("aria-hidden")
    modal2 = target
    modal2.addEventListener("click",closeModal2)
    modal2.querySelector(".js-modal-close").addEventListener("click", closeModal2)
    modal2.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    checkForm()
}

//fermeture de la boite modal2 et la suppression des options qui l'accompagnent
const closeModal2 = function (e) {
    modal2 = document.getElementById("modal2")
    if (modal2 === null) return
    modal2.style.display = "none"
    modal2.setAttribute("aria-hidden", "true")
    modal2.removeAttribute("aria-modal")
    modal2.addEventListener("click",closeModal2)
    modal2.querySelector(".js-modal-close").removeEventListener("click", closeModal2)
    modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal2 = null
    hidePreview()
}

//s'assurer que tout les champs soient vides en cas de retour de la modal2 sur la modal1 pour revenir de nouveau sur la modal2
function clearModal2() {
    if (document.getElementById("titre").value != '' || document.getElementById("categorie").value != '' || document.getElementById("id-input").value != ''){
        document.getElementById("categorie").value = ''
        document.getElementById("titre").value=''
        document.getElementById("id-input").value = ''
    }
}

//Supprimer une image en envoyant l'info à l'API
function deleteImg(event) {
    console.log(event.target.id)
    fetch(`http://localhost:5678/api/works/${event.target.id}`, {
        method: `DELETE`,
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("tokenIdentification") },
    }).then(() => {
        document.querySelector(".modal-img").innerHTML = "";
        document.querySelector(".gallery").innerHTML = "";
        showWorks()
        loadImgModal()
    })
}

//fonction permettant d'afficher dans la modal tout les travaux présents dans l'API
async function loadImgModal() {
    response = await fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {

            //on parcours la liste des éléments id présents dans data
            for (let id in data) {
                let object = data[id]

                //Création d'une balise figure qui contiendras l'image et sa description
                let figElement = document.createElement("figure")

                let imgElement = document.createElement("img")
                imgElement.src = object.imageUrl
                imgElement.alt = object.title

                //Création bouton poubelle sur les photos de la modal
                let poubelle = document.createElement('i')

                poubelle.className = "fa-solid fa-trash-can"
                poubelle.id = object.id

                //fonction deleteImg pour le click sur la corbeille
                figElement.appendChild(poubelle)
                poubelle.addEventListener("click", function (event) {
                    deleteImg(event)
                })

                let figCaptionElement = document.createElement("figCaption")
                figCaptionElement.textContent = object.title

                figElement.appendChild(imgElement)

                //l'ensemble des éléments crées dans figElement vont être placés dans la div modal-img et se nommerons travaux
                let travaux = document.querySelector(".modal-img")
                travaux.appendChild(figElement)
            }
        })
}

//fonction permettant d'envoyer les nouveaux projets à l'API
async function loadNewWorks() {
    let newImgCat = document.getElementById("categorie").value
    let newImgTitle = document.getElementById("titre").value
    let newImgImage = document.getElementById("id-input").files[0]
    const formData = new FormData()
    formData.append("image", newImgImage)
    formData.append("title", newImgTitle)
    formData.append("category", newImgCat)
    const response = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("tokenIdentification")
        },
        body: formData
    }).catch(err => console.log(err))
    //Nettoyer la gallerie ainsi que la modal, puis les recharger avec les données présentes dans l'API
    if (response.ok === true) {
        document.querySelector(".modal-img").innerHTML = "";
        document.querySelector(".gallery").innerHTML = "";
        showWorks()
        loadImgModal()
        closeModal2()
        alert("Le work à correctement été ajouté")

    } else {
        alert("Erreur lors de l'ajout d'un nouveau work")
        throw new Error("Une erreur est survenue")
    }
}

//affichage de la miniature de l'image choisis dans la modal2
function showPreview(event) {
    if (event.target.files.length > 0) {
        let src = URL.createObjectURL(event.target.files[0])
        let preview = document.getElementById("preview-new-image")
        preview.src = src
        preview.style.display = "block"
        let champAjoutImg = document.getElementById("btn-add-img")
        let champSize = document.querySelector(".max-size-img")
        champAjoutImg.style.display = "none"
        champSize.style.display = "none"
        let champLogo = document.querySelector(".fa-regular.fa-image")
        champLogo.style.display = "none"
    }
}

//Effacer l'affichage de la miniature en cas de retour ou de cloture de la modal2
function hidePreview() {
        let preview = document.getElementById("preview-new-image")
        preview.style.display = "none"
        let champAjoutImg = document.getElementById("btn-add-img")
        let champSize = document.querySelector(".max-size-img")
        champAjoutImg.style.display = "flex"
        champSize.style.display = "flex"
        let champLogo = document.querySelector(".fa-regular.fa-image")
        champLogo.style.display = "flex"
}

//Permet de verifier si tout les champs du formulaire sont remplis.
function checkForm() {
    let newImgCat = document.getElementById("categorie").value
    let newImgTitle = document.getElementById("titre").value
    let newImgImage = document.getElementById("id-input").value

    btnValiderNouvelleImg = document.getElementById("valider-nouvelle-img")
    // Si les champs sont remplis, le bouton de validation s'active
    if (newImgTitle !== '' && newImgCat !== '' && newImgImage !== '') {
        btnValiderNouvelleImg.disabled = false;
    }
    //si un champ n'est pas remplis, le bouton de validation ne s'active pas
    else {
        btnValiderNouvelleImg.disabled = true;
    }
}
