const productsGrid = document.getElementById("products-grid");
const cartProd = document.getElementById("cart-products");

const modal = document.getElementById("myModal");
const orderBlock = document.getElementById("order-block");
const orderForm = document.getElementById("order-form");
const priceSpan = document.getElementById("price");
const closeModal = document.getElementById("closeModal");

let productsArray = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://database-5c78.restdb.io/rest/product");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "697b805c53d66e37aa1956e0");
xhr.responseType = "json";

xhr.onload = () => {
  productsArray = xhr.response;
  drawProducts();
};

xhr.send();

function drawProducts() {
  productsGrid.innerHTML = "";

  productsArray.forEach(p => {
    productsGrid.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <img src="${p.photo_url}" width="120"><br>
        ${p.price}$<br><br>
        <button data-id="${p._id}">Add to cart</button>
      </div>
    `;
  });
}

productsGrid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const product = productsArray.find(p => p._id === e.target.dataset.id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCartProducts();
  }
});

function drawCartProducts() {
  if (cart.length === 0) {
    cartProd.innerHTML = "Cart empty";
    return;
  }

  let total = 0;
  cartProd.innerHTML = "";

  cart.forEach((p, i) => {
    cartProd.innerHTML += `
      <p>${p.name} — ${p.price}$ 
      <button onclick="removeFromCart(${i})">❌</button></p>
    `;
    total += p.price;
  });

  cartProd.innerHTML += `
    <hr>
    <b>Total: ${total}$</b><br><br>
    <button id="buyAllBtn">Buy All 🎅</button>
  `;
}

function removeFromCart(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  drawCartProducts();
}

function openCart() {
  cartProd.classList.toggle("hide");
  drawCartProducts();
}

document.addEventListener("click", e => {
  if (e.target.id === "buyAllBtn") {
    openOrderModal();
  }
});

function openOrderModal() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  modal.style.display = "block";
  orderBlock.innerHTML = "";
  let total = 0;

  cart.forEach(p => {
    orderBlock.innerHTML += `<p>${p.name} — ${p.price}$</p>`;
    total += p.price;
  });

  priceSpan.textContent = total;
}

closeModal.onclick = () => modal.style.display = "none";

orderForm.addEventListener("submit", e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const data = new FormData(orderForm);

  const order = {
    buyer_name: data.get("name"),
    buyer_address: data.get("address"),
    buyer_phone: data.get("phone"),
    buyer_post_number: data.get("post_number"),
    total_price: Number(priceSpan.textContent),
    products: cart.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price
    })),
    created_at: new Date().toISOString()
  };

  const send = new XMLHttpRequest();
  send.open("POST", "https://database-5c78.restdb.io/rest/orders");
  send.setRequestHeader("content-type", "application/json");
  send.setRequestHeader("x-apikey", "697b805c53d66e37aa1956e0");

  send.onload = () => {
    if (send.status === 201 || send.status === 200) {
      alert("✅ Order sent! The seller will contact you soon.");
      cart = [];
      localStorage.setItem("cart", "[]");
      drawCartProducts();
      modal.style.display = "none";
      orderForm.reset();
    } else {
      alert("❌ Something went wrong, try again.");
    }
  };

  send.send(JSON.stringify(order));
});
