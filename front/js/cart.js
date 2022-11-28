for (let i = 0; i < localStorage.length; i++){
    let idItem = (localStorage.key(i))
    let idsplit = idItem.split(';')[0];
    let colorSplit = idItem.split(';')[1]
    product = {
        id: idsplit,
        color: colorSplit,
        quantity: (localStorage.getItem(idItem))
    }
    fetch("http://localhost:3000/api/products/"+product.id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        showCartItems(value)
    })
    .catch(function(error) {
        console.error("Err")
    })
    console.log(product.id)
    
    console.log(product)
}




let cartItems = document.getElementById("cart__items")
async function showCartItems(products) {
    //for (product of products) {
        let article = document.createElement("article")
        article.className = "cart__item";
        article.setAttribute("data-id", product.id);   
        article.setAttribute("data-color", product.color);
        cartItems.appendChild(article);
            let divIMG = document.createElement("div")
            divIMG.className = "cart__item__img"
            article.appendChild(divIMG)
                let imgSRC = document.createElement("img")
                imgSRC.src = product.imageUrl;
                imgSRC.alt = product.altTxt
                divIMG.appendChild(imgSRC)
            let divCartItemContent = document.createElement("div")
            divCartItemContent.className = "cart__item__content"
            article.appendChild(divCartItemContent)
                let divCartItemDescription = document.createElement("div")
                divCartItemDescription.className = "cart__item__content__description"
                divCartItemContent.appendChild(divCartItemDescription)
                    let titre = document.createElement("h2")
                    titre.textContent = product.name
                    divCartItemDescription.appendChild(titre)
                    let couleur = document.createElement("p")
                    couleur.textContent = "couleur" + product.color
                    divCartItemDescription.appendChild(couleur)
                    let prix = document.createElement("p")
                    //prix.textContent = //APPELER le prix (?) prob faire une fction
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
   //}
        
}

/*
let btn2 = document.querySelector('.deleteItem')
btn2.addEventListener('click', () => {
    btn.remove();
})

/*
function deleteArticle () {
    deleteItem.addEventListener('click', product){
        XXX.remove
    }
}*/