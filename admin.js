const productsDiv = document.getElementById("products");

let products = JSON.parse(localStorage.getItem("farmerProducts")) || [];
drawProducts();

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;

    if (!name || !price) {
        alert("Name and price are required");
        return;
    }

    const product = {
        id: Date.now(),
        name,
        price,
        image,
        description
    };

    products.push(product);
    localStorage.setItem("farmerProducts", JSON.stringify(products));

    clearForm();
    drawProducts();
}

function drawProducts() {
    productsDiv.innerHTML = "";

    if (products.length === 0) {
        productsDiv.innerHTML = "No products yet 🌱";
        return;
    }

    products.forEach(p => {
        productsDiv.innerHTML += `
            <div class="product">
                <h3>${p.name}</h3>
                ${p.image ? `<img src="${p.image}" width="120">` : ""}
                <p>${p.description || ""}</p>
                <b>${p.price}$</b>
                <br><br>
                <button onclick="deleteProduct(${p.id})">❌ Delete</button>
            </div>
        `;
    });
}

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem("farmerProducts", JSON.stringify(products));
    drawProducts();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
}
