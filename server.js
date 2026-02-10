const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const RESTDB_URL = "https://farmerdb-1a3d.restdb.io/rest/orders";
const API_KEY = "697b805c53d66e37aa1956e0";

// Add a new product/order
app.post("/orders", async (req, res) => {
  try {
    const r = await fetch(RESTDB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all products/orders
app.get("/orders", async (req, res) => {
  try {
    const r = await fetch(RESTDB_URL, {
      headers: { "x-apikey": API_KEY }
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => console.log("Backend running at http://localhost:3000"));
