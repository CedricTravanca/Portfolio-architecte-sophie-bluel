    const sectFiltre = document.querySelector(".filters") 

const btnTrierTous = document.createElement("button")
btnTrierTous.innerText = "Tous"
btnTrierTous.id = "btn-tous"
btnTrierTous.classList = "active"
sectFiltre.appendChild(btnTrierTous)

const btnTrierObjets = document.createElement("button")
btnTrierObjets.innerText = "Objets"
btnTrierObjets.id = "btn-objets"
sectFiltre.appendChild(btnTrierObjets)

const btnTrierAppartements = document.createElement("button")
btnTrierAppartements.innerText = "Appartements"
btnTrierAppartements.id = "btn-appartements"
sectFiltre.appendChild(btnTrierAppartements)



const btnTrierHr = document.createElement("button")
btnTrierHr.innerText = "Hôtels & restaurants"
btnTrierHr.id = "btn-hr"
sectFiltre.appendChild(btnTrierHr)




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





// Récupération des travaux et mise au format Json
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then (data => {

        for(let line in data){
            let object = data[line]
            let categorie = object.category.name
//            console.log(categorie)

       let trierObjets = document.getElementById("btn-objets")
       trierObjets.addEventListener("click", function(){
        
        if (categorie === btnTrierObjets.innerText){
            console.log("ici les objets")
        } else {
         (categorie === btnTrierAppartements.innerText)
            console.log("ici les appartements")
        } /*else {
        if (categorie === btnTrierHr.innerText){
            console.log(object.title)
        } */
        
        })
        
        /*
    })
    */ 
        }
        /* recuperation des différents boutons de filtres

        let filterTous = document.getElementById("btn-tous")
        let filterObjets = document.getElementById("btn-objets")
        let filterAppartements = document.getElementById("btn-appartements")
        let filterHotelsRestaurants = document.getElementById("btn-hr")
        */
       
        let filters = document.querySelectorAll(".filters button")
        
        filters.forEach((filter)=> {
            filter.addEventListener("click" , () => {
                filters.forEach((filter) => {
                    filter.classList.remove("active")
                })
                filter.classList.add("active")
            })
        })
    })


 /*   //on parcours la liste des éléments id présents dans data
let btnTrierTous = document.getElementById("btn-tous")
        btnTrierTous.addEventListener("click",function(){
        console.log("hop la")    
        })

*/
  

    
/*
//nous appelons les catégories via fetch afin de les utiliser pour nos filtres
fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then (data => {
        console.log(data)
        
        for (let line= 0; line < data.length; line++){
            let lines= data[line]
            console.log(lines)
            
            let categorie = lines.name
            console.log(categorie)
            
        }
    })
*/        

//let travauxFilters = object.filter(function(element,id ){

//console.log(element,id)
//})
//const filtercategories = 
//const filtre = document.getElementById('btn-tous')
//console.log(filtre)


 //   filtreTous.addEventListener("click", () => {
 //       console.log("voila")
 //  })
