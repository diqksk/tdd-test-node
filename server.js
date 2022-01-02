const express = require("express");

const PORT = 3000;

const app = express();
const productRoutes = require("./routes");
const mongoose = require("mongoose");
const mongooseUrl = require("./config.json");

mongoose
  .connect(mongooseUrl.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
