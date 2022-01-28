const express = require("express");
const productController = require("./controller/product");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("안녕하세요");
});

router.post("/", productController.createProduct);

module.exports = router;
