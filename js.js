let productsGrid = document.getElementById("products-grid");
let cartProd = document.getElementById("cart-products");

let productsArray = [];
let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    drawCartProducts();
}

let xhr = new XMLHttpRequest();
let url = "https://my-json-server.typicode.com/lyrenta/w";

xhr.open("GET", url + "/products");
xhr.responseType = "json";
xhr.onload = function () {
    productsArray = xhr.response;
    productsGrid.innerHTML = "";

    productsArray.forEach(p => {
        let div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <h2 class="product-name">${p.name}</h2>
            <img class="product-photo" src="${p.photo_url}">
            <p class="product-price">Price: ${p.price}$</p>
            <p class="product-description">${p.description}</p>
            <a href="userProfile.html?id=${p.author_id}">Seller profile</a>
            <button onclick="addProductToCart(${p.id})">Buy 🎁</button>
        `;

        productsGrid.appendChild(div);
    });
};
xhr.send();

function addProductToCart(id) {
    let product = productsArray.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCartProducts();
}

function drawCartProducts() {
    if (cart.length === 0) {
        cartProd.innerHTML = "🎄 Cart is empty";
        return;
    }

    cartProd.innerHTML = "";
    let sum = 0;

    cart.forEach(p => {
        cartProd.innerHTML += `
            <p><img src="${p.photo_url}">${p.name} — ${p.price}$</p>
            <hr>
        `;
        sum += p.price;
    });

    cartProd.innerHTML += `
        <p><b>Total:</b> ${sum}$</p>
        <button onclick="buyAll()">Buy All 🎅</button>
    `;
}

function buyAll() {
    cart = [];
    localStorage.setItem("cart", "[]");
    cartProd.innerHTML = "🎉 Ho ho ho! Purchase complete!";
}

function openCart() {
    cartProd.classList.toggle("hide");
}
