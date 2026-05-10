


// CART 
let cart = [];

// ELEMENTS 

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const modalBody = document.getElementById("modalBody");
const themeToggle = document.getElementById("themeToggle");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");




// RENDER PRODUCTS 
function renderProducts(list = shop) {

  productContainer.innerHTML = list.map(p => `
    <div class="col-md-4">
      <div class="card product-card h-100">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <span class="badge-soft mb-2">${p.level}</span>
          <h5>${p.name}</h5>
          <p>${p.description}</p>
     
          <button class="btn btn-primary mt-auto"
          onclick="addToCart(${p.id})">
          Add to Cart</button>

        </div>
      </div>
    </div>
  `).join("");
}

function showDetails(id){
  const product = shop.find(item => item.id === id);
  modalBody.innerHTML = `
  <img src="${product.image}"
  class="img-fluid rounded mb-3">
  <h4>${product.name}</h4>
  <p>${product.description}</p>
  <p><strong>Category:>/strong> ${product.level}</p>
  `;

}
  //  ADD TO CART 
function addToCart(id) {
  const product = shop.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
if(existing){
  existing.qty += 1;
}else{
  cart.push({ ...product,qty: 1})
}
renderCart();
}

// REMOVE ITEM 
function removeItem(id){
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// CHANGE QTY 
function changeQty(id, type){
  const item = cart.find(p => p.id === id);
  if (!item) return;
  if (type === "inc"){
    item.qty++;
  }else{
    item.qty--;
    if(item.qty <= 0){
      cart = cart.filter(p => p.id !== id);
    }
  }
}

// RENDER CART 

function renderCart(){
  if (!cartItems) return;
  let total = 0;
  cartItema.innerHTML = cart.map(item => {
    total += item.qty * 10;
    return`
    
    <div class="d-flex align-items-center gap-3 border p-2 mb-2">
    <img src="${item.image}" width="70">
    <div>
    <h6>${item.name}</h6>
    <button onclick="changeQty(${item.id}, 'dec')">-</button>
    <span class="mx-2">${item.qty}</span>
    <button onclick="changeQty(${item.id}, 'inc')">+</button>
    </div>
    <button class="btn btn-danger btn-sm ms-auto" onclick="removeItem(${item.id})">
    X
    </button>
    </div>
    `;
  }).join("");


    cartTotal.textContent = total;
  }

// FILTER + SEARCH 
function filterProducts(){
 
const search = searchInput.value.toLowerCase();
const category = categoryFilter.value;
const filtered = shop.filter(p => (category === "all" || p.level === category) && (p.level === category) && 
(p.description.toLocaleLowerCase().includes(search)));
renderProducts(filtered);
}

// INIC 
function init(){
  renderProducts();
  renderCart();
  if (searchInput){
    searchInput.addEventListener("input", filterProducts);
  }
  if (categoryFilter){
    categoryFilter.addEventListener("change", filterProducts);
  }
  
}


init();
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-them");
  });