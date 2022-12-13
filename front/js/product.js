// RECUPERER LES PARAMETRES URL //
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
    console.error("Err")
})

// AFFICHER LES DONNEES //
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
// Add colors // 
    let optionDiv = document.querySelector("#colors")
    let colorData = product.colors
    for(color of colorData) {
        let option = document.createElement("option")
        option.setAttribute("value", color)
        option.textContent = color

        optionDiv.appendChild(option)
    }       
}

// AJOUT AU LOCAL STORAGE //
let cart = document.querySelector("#addToCart")
cart.addEventListener('click', products)

function products(){
    let color = document.querySelector("#colors").value
    let qtty = document.querySelector("#quantity").value 
    let name = document.querySelector("#title").textContent
    let productKey = product_id + ";" + color
    
    if (localStorage.getItem(productKey)){
        let quantiteInitiale = localStorage.getItem(productKey)
        let quantiteAjoutee = parseInt(quantiteInitiale) + parseInt(qtty)
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
        localStorage.setItem(productKey, qtty)
        alert(`Article: ${name} ${color} ${qtty} ajouté au panier`)
        return true
    }
}