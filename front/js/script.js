console.log('ça marche');
fetch("http://localhost:3000/api/products")
  .then(function (res) {
      return res.json();
    })
  .then((data) => createH3(data))


  function createH3 (name) {

  console.log(name) 
   const h3 = document.createElement("h3")
    h3.textContent = name.name
    return h3
  };