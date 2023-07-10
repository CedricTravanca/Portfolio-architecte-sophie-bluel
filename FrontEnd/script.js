fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then (data => {
        console.log(data)

    for(let id in data){
        let object = data[id]
        
        let figElement = document.createElement("figure")

        let imgElement = document.createElement("img")
        imgElement.src = object.imageUrl
        imgElement.alt = object.title

        let figCaptionElement = document.createElement("figCaption")
        figCaptionElement.textContent = object.title

        figElement.appendChild(imgElement)
        figElement.appendChild(figCaptionElement)

        let travaux = document.querySelector(".gallery")
        travaux.appendChild(figElement)
    }
    })
