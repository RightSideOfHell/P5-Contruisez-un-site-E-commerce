//let liste = localStorage.getItem(producKey)
//productKey = JSON.parse(liste);


let cartItems = document.getElementById("#cart_items")
function showCartItems() {
    //for (X of XX) {
        let article = document.createElement("article")
        article.className = "cart__item";
        article.setAttribute("data-id", /*product_id*/ );
        article.setAttribute("data-color", /*product.color*/);
        cartItems.appendChild(article);
            let divIMG = document.createElement("div")
            divIMG.className = "cart__item__img"
            article.appendChild(divIMG)
                let imgSRC = document.createElement("img")
                imgSRC.src = "../images/" /*product.imageUrl;"*/
                imgSRC.alt = product.altTxt
                divIMG.appendChild(imgSRC)
            let divCartItemContent = document.createElement("div")
            divCartItemContent.className = "cart__item__content"
            article.appendChild(divCartItemContent)
                let divCartItemDescription = document.createElement("div")
                divCartItemDescription.className = "cart__item__content__description"
                divCartItemContent.appendChild(divCartItemDescription)
                    let titre = document.createElement("h2")
                    titre.textContent = //product.name
                    divCartItemDescription.appendChild(titre)
                    let couleur = document.createElement("p")
                    couleur.textContent = "couleur" + //product.color
                    divCartItemDescription.appendChild(couleur)
                    let prix = document.createElement("p")
                    prix.textContent = //APPELER le prix (?) prob faire une fction
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
                        qttyInput.value = //produit.quantity;
                        divCartItemQtty.appendChild(qttyInput);
                    let divDelete = document.createElement("div")
                    divDelete.className = "cart__item__content__settings__delete"
                    divCartItemSettings.appendChild(divDelete)
                        let deleteItem = document.createElement("p")
                        deleteItem.className = "deleteItem"
                        deleteItem.textContent = "Supprimer"
                        divDelete.appendChild(deleteItem)
    //}
}

/*
function deleteArticle () {
    deleteItem.addEventListener('click', product){
        XXX.remove
    }
}*/