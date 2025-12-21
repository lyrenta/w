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

/* ===== Christmas Secrets JS ===== */

// 1️⃣ Falling snow
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 24 + 12 + 'px';
    document.body.appendChild(snowflake);
    const fallDuration = Math.random() * 5000 + 5000;
    snowflake.animate(
        [{ transform: `translateY(0px)` }, { transform: `translateY(${window.innerHeight}px)` }],
        { duration: fallDuration, iterations: 1, easing: 'linear' }
    ).onfinish = () => snowflake.remove();
}
setInterval(createSnowflake, 200);

// 2️⃣ Santa walking across bottom after 10s
setTimeout(() => {
    const santa = document.getElementById('santa');
    santa.style.display = 'block';
    santa.style.transition = 'left 12s linear';
    santa.style.left = window.innerWidth + 'px';
}, 10000);

// 3️⃣ Sleigh Santa after 1 minute
setTimeout(() => {
    const sleigh = document.getElementById('sleigh');
    sleigh.style.display = 'block';
    sleigh.style.transition = 'top 5s linear';
    sleigh.style.top = '50px';

    // Heavy snow during sleigh
    const snowInterval = setInterval(createSnowflake, 50);

    // 4️⃣ Jumpscare snowman 5s after sleigh appears
    setTimeout(() => {
        clearInterval(snowInterval);
        const snowman = document.getElementById('snowman');
        snowman.style.display = 'block';

        setTimeout(() => {
            snowman.style.display = 'none';
        }, 5000); // Snowman disappears after 5s
    }, 5000);

}, 60000); // 1 minute

/* ===== Christmas Secrets 20s Timeline ===== */
window.onload = function() {
  const santa = document.getElementById('santa');
  const sleigh = document.getElementById('sleigh');
  const snowman = document.getElementById('snowman');

  // 1️⃣ Falling snow
  function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 24 + 12 + 'px';
    document.body.appendChild(snowflake);
    const fallDuration = Math.random() * 3000 + 2000;
    snowflake.animate(
      [{ transform: `translateY(0px)` }, { transform: `translateY(${window.innerHeight}px)` }],
      { duration: fallDuration, iterations: 1, easing: 'linear' }
    ).onfinish = () => snowflake.remove();
  }
  const snowInterval = setInterval(createSnowflake, 200);

  // 2️⃣ Santa walking across bottom after 2s
  setTimeout(() => {
    santa.style.display = 'block';
    santa.style.transition = 'left 5s linear';
    santa.style.left = window.innerWidth + 'px';
  }, 2000);

  // 3️⃣ Sleigh Santa after 10s
  setTimeout(() => {
    sleigh.style.display = 'block';
    sleigh.style.transition = 'top 5s linear';
    sleigh.style.top = '50px';

    // Increase snow during sleigh
    const heavySnow = setInterval(createSnowflake, 50);

    // 4️⃣ Jumpscare snowman at 15s
    setTimeout(() => {
      clearInterval(heavySnow);
      snowman.style.display = 'block';

      // Remove snowman after 5s (20s)
      setTimeout(() => {
        snowman.style.display = 'none';
      }, 5000);
    }, 5000);

  }, 10000);
};

/* ===== Animated Christmas snow ===== */
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 24 + 12 + 'px';
    document.body.appendChild(snowflake);

    const duration = Math.random() * 3000 + 3000;
    snowflake.animate(
        [
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0.8 }
        ],
        { duration: duration, iterations: 1, easing: 'linear' }
    ).onfinish = () => snowflake.remove();
}

// Continuous snow
setInterval(createSnowflake, 200);

/* ===== Animated Snow ===== */
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = Math.random() * 24 + 12 + 'px';
    document.body.appendChild(snowflake);

    const duration = Math.random() * 3000 + 3000;
    snowflake.animate(
        [
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0.8 }
        ],
        { duration: duration, iterations: 1, easing: 'linear' }
    ).onfinish = () => snowflake.remove();
}
setInterval(createSnowflake, 200);

/* ===== Jumpscare Snowman ===== */
const snowman = document.getElementById('snowman');
setTimeout(() => {
    snowman.style.animation = 'snowmanCreep 5s forwards';
}, 15000); // 15s
