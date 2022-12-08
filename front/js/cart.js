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
        checkLocalStorage()
        showCartItems(value, product)
        totalPrice()
        totalQuantity()
        updateQuantity(product)
        deleteItem()
    
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


/************************************************** OPTIONS DU PANIER **************************************************/

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


// UPDATE QUANTITY //
function updateQuantity(product){
    let oldQuantity = product.quantity
    let quantityInput = document.querySelectorAll(".itemQuantity");

    quantityInput.forEach((article) => {
        article.addEventListener('change', (e) => {
            let productId = e.target.closest(".cart__item").dataset.id;
            let productColor = e.target.closest(".cart__item").dataset.color;
            let productKey = productId + ";" + productColor

            if (quantityInput != oldQuantity) {
                let newquantity = parseInt(e.target.value)
                localStorage.setItem(productKey, newquantity)
            }

            totalPrice()
            totalQuantity()
        })
    });
}


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

// LOCAL STORAGE EST VIDE APRES SUPPRESSIONS //
function checkLocalStorage() {
    let checkLS = localStorage.length
    let title = document.querySelector("h1")
    if (checkLS < 1 ){
        title.textContent = "Votre panier est vide";
        return true
    }
}

/************************************************** FORMULAIRE **************************************************/

// CHECK FORM: PRENOM + MSG D'ERREUR//
let form = document.querySelector(".cart__order__form")
form.firstName.addEventListener('change', function(){
    validFirstName(this)
})
const validFirstName = function(inputFirstName) {
    let firstNameREGEX = new RegExp ("^[a-zA-Z]{1}([^0-9°²!¡?;@#(){}|~<>&+=¤£§$*%_]+)$");
    let errorMsg = document.querySelector("#firstNameErrorMsg")
    if(firstNameREGEX.test(inputFirstName.value)){
        errorMsg.innerHTML = 'Prénom valide'
        return true
    } else {
        errorMsg.innerHTML = 'Prénom non valide: Au moins 2 lettres et ne doit contenir ni caractères spéciaux, ni chiffres'
        return false
    }
}

// CHECK FORM: NOM + MSG D'ERREUR//
form.lastName.addEventListener('change', function(){
    validLastName(this)
})
const validLastName = function(inputlastName) {
    let lastNameREGEX = new RegExp ("^[a-zA-Z]{1,2}([^0-9°²!¡?;@#(){}|~<>&+=¤£§$*%_]+)$");
    let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
    if(lastNameREGEX.test(inputlastName.value)){
        lastNameErrorMsg.innerHTML = "Nom valide"
        return true
    } else {
        lastNameErrorMsg.innerHTML = "Nom non valide: Au moins 2 lettres et ne doit contenir ni caractères spéciaux, ni chiffres"
        return false
    }
}

// CHECK FORM: VILLE + MSG D'ERREUR//
form.city.addEventListener('change', function(){
    validCity(this)
})
const validCity = function(inputcity) {
    let cityREGEX = new RegExp ("^[a-zA-Z]{1,2}([^0-9°²!¡?;@#(){}|~<>&+=¤£§$*%_]+)$");
    let cityErrorMsg = document.querySelector("#cityErrorMsg")
    if(cityREGEX.test(inputcity.value)){
        cityErrorMsg.innerHTML = "Nom de ville valide"
        return true
    } else {
        cityErrorMsg.innerHTML = "Ville non valide: Au moins 2 lettres et ne doit contenir ni caractères spéciaux, ni chiffres"
        return false
    }
}

// CHECK FORM: ADRESSE + MSG D'ERREUR//
form.address.addEventListener('change', function(){
    validAddress(this)
})
const validAddress = function(inputaddress) {
    let addressREGEX = new RegExp ("[^°²!¡?;@#(){}|~<>&+=¤£§$*%][A-Za-z0-9]{6}$");
    let addressErrorMsg = document.querySelector("#addressErrorMsg")
    if(addressREGEX.test(inputaddress.value)){
        addressErrorMsg.innerHTML = "Adresse valide"
        return true
    } else {
        addressErrorMsg.innerHTML = "example: 10 quai de la charente"
        return false
    }
}

// CHECK FORM: EMAIL + MSG D'ERREUR//
form.email.addEventListener('change', function(){
    validEmail(this)
})
const validEmail = function(inputemail) {
    let emailREGEX = new RegExp ("^([a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10})$");
    let emailErrorMsg = document.querySelector("#emailErrorMsg")
    if(emailREGEX.test(inputemail.value)){
        emailErrorMsg.innerHTML = "Email valide"
        return true
    } else {
        emailErrorMsg.innerHTML = "example: kanap123@nom.blabla"
        return false
    }
}


/********************************************* SOUMISSION DU FORMULAIRE *********************************************/






// ECOUTER LA SOUMISSION DU FORMULAIRE //
form.addEventListener('submit', function(e){
    e.preventDefault()
    if(validFirstName(form.firstName) && validLastName(form.lastName) && validCity(form.city) && validAddress(form.address) && validEmail(form.email)){
        let commande = localStorage
        let order ={
            contact: {
                prenom: document.getElementById("firstName").value,
                nom: document.getElementById("lastName").value,
                adresse: document.getElementById("address").value,
                ville: document.getElementById("city").value,
                adresseMail: document.getElementById("email").value,
            },
            orders: commande,
        }
        console.log(order)
        //form.submit()
    }
})

/*
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(order)
})
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    .catch(function(error) {
        console.error("Err")
    })

    */