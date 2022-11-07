fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    addProducts(value)
    console.log("sucess:", value);
  });


let section = document.querySelector("#items");

function addProducts(products){
  for (product of products) {
    let newSection = document.createElement('a');
        newSection.setAttribute("href", "=./product.html?id=${product._id}");
        section.appendChild(newSection);
    let Article = document.createElement("article");
        newSection.appendChild(Article);
    let image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.altTxt;
        Article.appendChild(image);
    let title = document.createElement("h3");
        title.classList.add("productName");
        title.textContent = product.name;
        Article.appendChild(title);
    let text = document.createElement("p");
        text.classList.add("productDescription");
        text.textContent = product.description;
        Article.appendChild(text)
  }
}