const express = require("express");

const PORT = 3000;

const app = express();
const productRoutes = require("./routes");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
