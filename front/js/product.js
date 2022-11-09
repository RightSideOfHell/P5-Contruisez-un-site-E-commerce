//récupérer les paramètres URL 
function getParameter (parameterId){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterId);
}

fetch("http://localhost:3000/api/products?id=${id}")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        showProducts(value)
        console.log("Sucess:", value);
    });



function showProducts(products){
    for (product of products) {
        let presentationImg = document.querySelector(".item__img")
        const structureImg = `<img src="../images/logo.png" alt="Photographie d'un canapé">`
        presentationImg.innerHTML = structureImg
        let presentationTitle = document.querySelector("#title")
        presentationTitle.textContent= product.name
        let presentationPrice = document.querySelector("#price")
        presentationPrice.textContent= product.price
        let presentationDescription = document.querySelector("#description")
        presentationDescription.textContent= product.description


    }
}
