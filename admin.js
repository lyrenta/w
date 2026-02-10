const API_KEY = "697b805c53d66e37aa1956e0"; // Your API key
const PRODUCT_URL = "https://database-5c78.restdb.io/rest/product";
const ORDERS_URL = "https://database-5c78.restdb.io/rest/orders"; // Change if your collection name is different

// Add new product
document.getElementById("productForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value);
    const image = document.getElementById("image").value;

    const data = JSON.stringify({
        name: name,
        description: description,
        price: price,
        image: image
    });

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            if(this.status >= 200 && this.status < 300){
                document.getElementById("productMessage").innerText = "Product added successfully!";
                document.getElementById("productForm").reset();
            } else {
                document.getElementById("productMessage").innerText = "Error adding product!";
            }
            console.log(this.responseText);
        }
    });

    xhr.open("POST", PRODUCT_URL);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", API_KEY);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
});

// Load orders
document.getElementById("loadOrders").addEventListener("click", function(){
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === 4){
            if(this.status >= 200 && this.status < 300){
                const orders = JSON.parse(this.responseText);
                const ordersList = document.getElementById("ordersList");
                ordersList.innerHTML = "";
                orders.forEach(order => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>Order ID:</strong> ${order._id}<br>
                                    <strong>Product:</strong> ${order.productName}<br>
                                    <strong>Quantity:</strong> ${order.quantity}<br>
                                    <strong>Customer:</strong> ${order.customerName}`;
                    ordersList.appendChild(li);
                });
            } else {
                alert("Failed to load orders.");
            }
            console.log(this.responseText);
        }
    });

    xhr.open("GET", ORDERS_URL);
    xhr.setRequestHeader("x-apikey", API_KEY);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send();
});
