var inputName = document.getElementById("productName");
var inputPrice = document.getElementById("productOldPrice");
var inputPriceNew = document.getElementById("productNewPrice");
var inputDes = document.getElementById("productDescription");
var inputCount = document.getElementById("productCount");
var inputImg = document.getElementById("productImg");

var productContainer = [];

if (localStorage.getItem("ourProducts") != null) {
  productContainer = JSON.parse(localStorage.getItem("ourProducts"));
  showProducts();
}
// Global variables
var flagAdd = true;
var idProduct = null;

function addProduct() {
  var inputOnSale = document.querySelector('input[name="radio"]:checked');
  var stock = "";

  if (inputOnSale && inputOnSale.value === "out") {
    stock = `<div class="out-stock">Out Of Stock</div>`;
  }

  // Validate image input
  var imgValue;
  if (inputImg.files[0]) {
    imgValue = inputImg.files[0].name;
  } else if (!flagAdd) {
    // Keep the old image on update if no new image is uploaded
    imgValue = productContainer[idProduct].img;
  } else {
    alert("Please upload a product image.");
    return;
  }

  var product = {
    name: inputName.value,
    price: inputPrice.value,
    priceNew: inputPriceNew.value,
    description: inputDes.value,
    count: inputCount.value,
    stock: stock,
    img: imgValue,
  };

  // Validate form inputs
  if (
    inputName.value &&
    inputPriceNew.value &&
    inputDes.value &&
    inputPrice.value
  ) {
    if (flagAdd) {
      productContainer.push(product);
    } else {
      productContainer[idProduct] = product;
      flagAdd = true;
      document.getElementById("addProduct").innerHTML = "<b>Add Product</b>";
    }
    localStorage.setItem("ourProducts", JSON.stringify(productContainer));

    showProducts();
    clearInputs();

    if (inputOnSale) {
      inputOnSale.checked = false;
    }
  } else {
    window.alert("Please fill all required fields.");
  }
}

function showProducts() {
  var myIndex = 1;
  var content = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].count > 1) {
      content += `
      <div class="col-lg-3 col-md-6 col-sm-6 row212 mb-3 p-1 ">
        <div class="card card-item "card-item" card-res">
          <div class="img-card">
            <img src="${
              productContainer[i].img
            }" class="card-img-top" alt="Product Image"/>
            ${productContainer[i].stock}
          </div>
          <div class="card-body ">
            <h5 class="card-title">${productContainer[i].name}</h5>
             <span class="text-danger counter"><b><i class="fa-solid fa-cart-shopping"></i>${
               productContainer[i].count
             }</b></span>
            <p class="card-price">
              <span class="s-old">$${
                productContainer[i].price * productContainer[i].count
              }</span>
              <span class="s-new">$${
                productContainer[i].priceNew * productContainer[i].count
              }</span>
            </p>
           
            <p class="card-text">${productContainer[i].description}</p>
             <div class="btn-card">
            <button onclick="deleteProduct(${i})" class="btn btn-danger b-1">Delete</button>
            <button onclick="updateProduct(${i})" class="btn btn-warning b-2">Update</button>
             </div>
              <div class="icons hid">
                  <span class="icon-1"><i class="fa-regular fa-heart"></i></span>
                  <span class="vr vr-blurry" style="height: 10px;"></span>
                  <span class="icon-2"><i class="fa-solid fa-cart-shopping"></i></span>
                </div>
          </div>
        </div>
      </div>
      `;
    } else {
      content += `
      <div class="col-lg-3 col-md-6 col-sm-6 row212 mb-3 p-2 ">
        <div class="card card-item "card-item"  card-res">
                 

          <div class="img-card">
            <img src="${productContainer[i].img}" class="card-img-top" alt="Product Image"/>
                ${productContainer[i].stock}
          </div>
          <div class="card-body ">
            <h5 class="card-title">${productContainer[i].name}</h5>
             <span class="text-danger counter"><b>
             <i class="fa-solid fa-cart-shopping"></i>${myIndex}
             </b></span>
            <p class="card-price">
              <span class="s-old"><span class="symbol">$</span>${productContainer[i].price}</span>
              <span class="s-new"><span class="symbol">$</span>${productContainer[i].priceNew}</span>
            </p>
           
            <p class="card-text">${productContainer[i].description}</p>
             <div class="btn-card">
            <button onclick="deleteProduct(${i})" class="btn btn-danger b-1">Delete</button>
            <button onclick="updateProduct(${i})" class="btn btn-warning b-2">Update</button>
             </div>
              <div class="icons hid">
                  <span class="icon-1"><i class="fa-regular fa-heart"></i></span>
                  <span class="vr vr-blurry" style="height: 10px;"></span>
                  <span class="icon-2"><i class="fa-solid fa-cart-shopping"></i></span>
                </div>
          </div>
        </div>
      </div>
      `;
    }
  }

  document.getElementById("theRow").innerHTML = content;
}

function clearInputs() {
  inputName.value = "";
  inputPrice.value = "";
  inputDes.value = "";
  inputCount.value = "";
  inputPriceNew.value = "";
  inputImg.value = null;
}

function deleteAll() {
  productContainer.splice(0);
  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  showProducts();
}

function deleteProduct(indexOfItem) {
  var counter = productContainer[indexOfItem].count;

  if (counter <= 1) {
    productContainer.splice(indexOfItem, 1);
  } else {
    productContainer[indexOfItem].count = counter - 1;
  }

  localStorage.setItem("ourProducts", JSON.stringify(productContainer));
  showProducts();
}

function updateProduct(indexOfItem) {
  inputName.value = productContainer[indexOfItem].name;
  inputPrice.value = productContainer[indexOfItem].price;
  inputPriceNew.value = productContainer[indexOfItem].priceNew;
  inputDes.value = productContainer[indexOfItem].description;
  inputCount.value = productContainer[indexOfItem].count;
  flagAdd = false;
  idProduct = indexOfItem;
  document.getElementById("addProduct").innerHTML = "<b>Update Product</b>";
}


