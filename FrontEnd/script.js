// Récupération des travaux et mise au format Json
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then (data => {
        console.log(data)

//on parcours la liste des éléments id présents dans data
    for(let id in data){
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

//nous appelons les catégories via fetch afin de les utiliser pour nos filtres
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then (data => {
        console.log(data)
        
        for (let line= 0; line < data.length; line++){
            let lines= data[line]
            console.log(lines)
        }
    })
        

//let travauxFilters = object.filter(function(element,id ){

//console.log(element,id)
//})
//const filtercategories = 
//const filtre = document.getElementById('btn-tous')
//console.log(filtre)


 //   filtreTous.addEventListener("click", () => {
 //       console.log("voila")
 //  })















    /*
//Récupération des catégories et mise au format Json (non necessaire pour le moment)
fetch("http://localhost:5678/api/categories")
    .then(categories => categories.json())
    .then(result => {
        console.log(result)
    })
*/


