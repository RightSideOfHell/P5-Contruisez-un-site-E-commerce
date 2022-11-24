//récupérer les paramètres URL 
let str = window.location.search
let urlParam = new URLSearchParams(str)
let product_id = urlParam.get('id')


fetch(`http://localhost:3000/api/products/${product_id}`)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    showProducts(value)
})
.catch(function(error) {
    console.log("Err")
})

//Afficher les données
function showProducts(product) {
    let presentationImg = document.querySelector(".item__img")
        let image = document.createElement("img");
        image.src = product.imageUrl
        image.alt = product.altTxt
        presentationImg.appendChild(image);
    let presentationTitle = document.querySelector("#title")
        presentationTitle.textContent = product.name
    let presentationPrice = document.querySelector("#price")
        presentationPrice.textContent = product.price
    let presentationDescription = document.querySelector("#description")
        presentationDescription.textContent = product.description
//Add colors// 
    let optionDiv = document.querySelector("#colors")
    let colorData = product.colors
    for(color of colorData) {
        let option = document.createElement("option")
        option.setAttribute("value", color)
        option.textContent = color

        optionDiv.appendChild(option)
    }       
}

//local storage
let cart = document.querySelector("#addToCart")
cart.addEventListener('click', products)

function products(){
    let color = document.querySelector("#colors").value
    let qtty = document.querySelector("#quantity").value 
    let name = document.querySelector("#title").textContent
    let productKey = product_id + color
    let liste = []
    let product = {
        id: product_id,
        colors: color,
        quantité: qtty,
        }
    
    if (localStorage.getItem(productKey)){
        let quantiteInitiale = localStorage.getItem(productKey)
        let quantiteAjoutee = parseInt(quantiteInitiale) + parseInt(qtty)
        product = {
            id: product_id,
            colors: color,
            quantité: quantiteAjoutee,
        }
        liste.push(product)
        jsonProduct = JSON.stringify(liste)
        localStorage.setItem(productKey, quantiteAjoutee)
        alert(`Articles: ${name} ${color} ${quantiteAjoutee} ajoutés au panier`)
        return true
    } else if (color === ""){
        alert("veuillez sélectionner une couleur")
        return false
    } else if (qtty < 1) {
        alert("veuillez sélectionner un nombre d'article")
        return false
    } else {
        liste.push(product)
        jsonProduct = JSON.stringify(liste)
        localStorage.setItem(productKey, qtty)
        alert(`Article: ${name} ${color} ${qtty} ajouté au panier`)
        return true
    }
}

//productKey, qtty
//productKey, quantiteAjoutee