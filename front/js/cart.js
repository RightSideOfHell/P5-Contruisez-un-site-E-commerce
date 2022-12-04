// RECUPERER LES DONNEES DU LS + CONTACT DE L'API //
for (let i = 0; i < localStorage.length; i++){
    let idItem = (localStorage.key(i));
    let idsplit = idItem.split(';')[0];
    let colorSplit = idItem.split(';')[1];
    const product = {
        id: idsplit,
        color: colorSplit,
        quantity: (localStorage.getItem(idItem))
    };
    urls = product.id

    fetch(`http://localhost:3000/api/products/`+urls)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        showCartItems(value, product)
        totalPrice()
        totalQuantity()
        //updateQuantity(product)
        deleteItem()
        checkLocalStorage()
    
    })
    .catch(function(error) {
        console.error("Err")
    })
};

// INSERER LE HTML POUR CHAQUE ELEMENT DU PANIER //
let cartItems = document.getElementById("cart__items")
async function showCartItems(value, product) {
    let article = document.createElement("article")
    article.className = "cart__item";
    article.setAttribute("data-id", product.id); 
    article.setAttribute("data-color", product.color);
    cartItems.appendChild(article);
    let divIMG = document.createElement("div")
    divIMG.className = "cart__item__img"
    article.appendChild(divIMG)
    let imgSRC = document.createElement("img")
    imgSRC.src = value.imageUrl;
    imgSRC.alt = value.altTxt
    divIMG.appendChild(imgSRC)
    let divCartItemContent = document.createElement("div")
    divCartItemContent.className = "cart__item__content"
    article.appendChild(divCartItemContent)
    let divCartItemDescription = document.createElement("div")
    divCartItemDescription.className = "cart__item__content__description"
    divCartItemContent.appendChild(divCartItemDescription)
    let titre = document.createElement("h2")
    titre.textContent = value.name
    divCartItemDescription.appendChild(titre)
    let couleur = document.createElement("p")
    couleur.textContent = "couleur " + product.color
    divCartItemDescription.appendChild(couleur)
    let prix = document.createElement("p")
    prix.textContent = value.price
    divCartItemDescription.appendChild(prix)
    let divCartItemSettings = document.createElement("div")
    divCartItemSettings.className = "cart__item__content__settings"
    divCartItemContent.appendChild(divCartItemSettings)
    let divCartItemQtty = document.createElement("div")
    divCartItemQtty.className = "cart__item__content__settings__quantity"
    divCartItemSettings.appendChild(divCartItemQtty)
    let quantity = document.createElement("p")
    quantity.textContent = "Qté :"
    divCartItemQtty.appendChild(quantity)
    let qttyInput = document.createElement("input")
    qttyInput.className = 'itemQuantity';
    qttyInput.setAttribute('type', 'number');
    qttyInput.setAttribute('name', 'itemQuantity');
    qttyInput.setAttribute('min', '1');
    qttyInput.setAttribute('max', '100');
    qttyInput.value = product.quantity;
    divCartItemQtty.appendChild(qttyInput);
    let divDelete = document.createElement("div")
    divDelete.className = "cart__item__content__settings__delete"
    divCartItemSettings.appendChild(divDelete)
    let deleteItem = document.createElement("p")
    deleteItem.className = "deleteItem"
    deleteItem.textContent = "Supprimer"
    divDelete.appendChild(deleteItem)
}

// TOTAL PRICE //     
function totalPrice() {
    let quantities = document.querySelectorAll(".itemQuantity");
    let prices = document.querySelectorAll(".cart__item__content__description");
    let total = 0;
    for (let i= 0; i < prices.length; i++) {
        total += parseInt(prices[i].lastElementChild.textContent) * quantities[i].value;  
    }
    document.getElementById("totalPrice").textContent = total;
}

// TOTAL QUANTITY//
function totalQuantity(){
    let quantityInput = document.querySelectorAll(".itemQuantity");
    let totalQuantity = 0
    for (let i=0; i < quantityInput.length; i++){
        totalQuantity += parseInt(quantityInput[i].value)
    }
    document.getElementById("totalQuantity").textContent = totalQuantity
}

/*
// UPDATE QUANTITY //
function updateQuantity(product){
    let oldQuantity = product.quantity
    let quantityInput = document.querySelectorAll(".itemQuantity");
    console.log(quantityInput)
    quantityInput.forEach((article) => {
        article.addEventListener('change', (e) => {
            let productId = e.target.closest(".cart__item").dataset.id;
            let productColor = e.target.closest(".cart__item").dataset.color;
            let productKey = productId + ";" + productColor

            if (quantityInput != oldQuantity) {
                let newquantity = parseInt(productKey.valueAsNumber)
                console.log(typeof newquantity)
                console.log(newquantity)
                localStorage.setItem(productKey, newquantity)
            } else if (quantityInput < 1) {
                deleteItem()
            }
        })
    });
}
*/

// DELETE ITEM //
function deleteItem() {
    let deleteBtn = document.querySelectorAll(".deleteItem")
    deleteBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let productId = e.target.closest(".cart__item").dataset.id;
            let productColor = e.target.closest(".cart__item").dataset.color;
            let productKey = productId + ";" + productColor
            let deleteItem = e.target.closest(".cart__item");

            deleteItem.remove()
            localStorage.removeItem(productKey)

            totalPrice()
            totalQuantity()
            checkLocalStorage()
        })
    })
}

// CHECK SI LOCAL STORAGE EST VIDE //
function checkLocalStorage() {
    let checkLS = localStorage.length
    let title = document.querySelector("h1")
    if (checkLS < 1 ){
        title.textContent = "Votre panier est vide";
        return true
    }
}checkLocalStorage()
