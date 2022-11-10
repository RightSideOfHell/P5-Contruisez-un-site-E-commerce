//récupérer les paramètres URL 
let str = window.location.search
let urlParam = new URLSearchParams(str)
let product_id = urlParam.get('id')
    console.log(product_id)


fetch(`http://localhost:3000/api/products?id=${product_id}`)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    showProducts(value)
    console.log("Sucess:", value);
})


//Afficher les données  

/*function showProducts(products){
    for (product of products) {
        let presentationImg = document.querySelector(".item__img")
        let image = document.createElement("img");
        image.src = `${product.imageUrl}`
        image.alt = `${product.altTxt}`;
        presentationImg.appendChild(image);
        let presentationTitle = document.querySelector("#title")
        presentationTitle.textContent= product.name
        let presentationPrice = document.querySelector("#price")
        presentationPrice.textContent= `${product.price}`
        let presentationDescription = document.querySelector("#description")
        presentationDescription.textContent= product.description
console.log(product.imageUrl)
console.log(product.name)
    }
}*/

/*function showProducts(product) {
    let presentationImg = document.querySelector(".item__img");
    let image = document.createElement("img");
    presentationImg.appendChild(image);
    //image.src = product.imageUrl;
}*/