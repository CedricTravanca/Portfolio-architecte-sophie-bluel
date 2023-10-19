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

