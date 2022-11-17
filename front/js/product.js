//récupérer les paramètres URL 
let str = window.location.search
let urlParam = new URLSearchParams(str)
let product_id = urlParam.get('id')
    //console.log(product_id)


fetch(`http://localhost:3000/api/products/${product_id}`)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    showProducts(value)
    //console.log("Sucess:", value);
})


//Afficher les données
function showProducts(product) {
    let presentationImg = document.querySelector(".item__img")
        let image = document.createElement("img");
        image.src = product.imageUrl
        image.alt = product.altTxt
        presentationImg.appendChild(image);
    let presentationTitle = document.querySelector("#title")
        presentationTitle.textContent= product.name
    let presentationPrice = document.querySelector("#price")
        presentationPrice.textContent= product.price
    let presentationDescription = document.querySelector("#description")
        presentationDescription.textContent= product.description
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

let addToCart = document.querySelector("#addToCart")
function addProductToCart(){
    addToCart.addEventListener('click', () => {
        let color = document.querySelector("#colors").value
        let qtty = document.querySelector("#quantity").value 
        let productArray = [product_id, color, qtty ]
        localStorage.setItem('panier', productArray)
    })
}
