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
let cart = document.querySelector("#addToCart")
cart.addEventListener('click', products)

function products(){
    let color = document.querySelector("#colors").value
    let qtty = document.querySelector("#quantity").value 
    let product = [product_id, color, qtty]
    let productKey = product_id + color

    if(localStorage.getItem(productKey)){
        let quantiteInitiale = localStorage.getItem(productKey)
        let quantiteAdded = parseInt(quantiteInitiale) + parseInt(qtty)
        localStorage.setItem(product_id + color, quantiteAdded)
    } else {
        localStorage.setItem(product_id + color, qtty)
    }
}

//if product already here: XX -> else if id but no color: XXX -> else if id + color but no qty: XXXX  -> else: localstorage id + color + qtty





/*    
setItems(product)
    //let productNumbers = localStorage.getItem(product)
    //productNumbers = parseInt(productNumbers)

function setItems(product){
    let quantiteInitiale = JSON.parse(localStorage.getItem(productKey))
    console.log("base", quantiteInitiale)
    console.log(typeof quantiteInitiale)
}

if(localStorage.getItem(productKey)){
    let quantiteAjoute = quantiteInitiale[0].value
    console.log("quantité ajouté", quantiteAjoute)

}
*/

/*
    let currentqtty = localStorage.setItem(product_id + color, qtty)
    console.log("currentqtty", currentqtty)
    let newcurrentqtty = parseInt(currentqtty + baseqtty)
    console.log("final qtty", newcurrentqtty)
    console.log(typeof newcurrentqtty)
    if (productNumbers) {
        localStorage.setItem(product_id + color, newcurrentqtty) //+ l'anciennce value)
    }else {
        localStorage.setItem(product_id + color, qtty)
    }

*/
/*
    //let parsedProduct = parseInt(product)
    //console.log(typeof parsedProduct)

checkItem(product)

let baseqtty = localStorage.getItem(qtty)
    console.log("base", product[2])


/*
function checkItem(product) {
    let item = localStorage.getItem(parsedProduct)
    console.log("item", item)
}
*/
/*
    //let productNumbers = localStorage.getItem(product)
    //newProductNumbers = parseInt(productNumbers)
    //console.log(newProductNumbers)
    //console.log(typeof newProductNumbers)

    let baseqtty = localStorage.getItem(qtty)
    console.log("base", product[2])
    let currentqtty = localStorage.setItem(product_id + color, qtty)
    console.log("currentqtty", currentqtty)
    let newcurrentqtty = parseInt(currentqtty + baseqtty)
    console.log("final qtty", newcurrentqtty)
    console.log(typeof newcurrentqtty)
    if (productNumbers) {
        localStorage.setItem(product_id + color, newcurrentqtty) //+ l'anciennce value)
    }else {
        localStorage.setItem(product_id + color, qtty)
    }
*/


    //let returnedProduct = JSON.parse(localStorage.getItem(tessst))
    //console.log("pls work?", returnedProduct)



/*    
function returnProduct() {
    let productNumbers = localStorage.getItem('returnProduct')
    localStorage.setItem(productArray[0] + productArray[1], productArray[2])
    let basket = JSON.parse(localStorage.getItem(seToLocal))
    return (basket)
}

    //localStorage.setItem(productArray[0] + productArray[1], productArray[2])


    localStorage.setItem(productArray[0] + productArray[1], productArray[2])
    productArray = parseInt(productArray)
    console.log(typeof productArray)
    if (productArray){
        localStorage.setItem(productArray[0] + productArray[1], productArray[2] +1)
    }else {
        localStorage.setItem(productArray[0] + productArray[1], productArray[2])
    }   

    
    function cartNumbers() {
        let basket = JSON.parse(localStorage.getItem(addToCart))
        return (basket)
        console.log(basket)
    }  
*/
