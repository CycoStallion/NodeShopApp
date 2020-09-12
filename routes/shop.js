const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductDetails,
  getIndex,
  getCart,
  postProductToCart,
  deleteProductFromCart,
  getCheckout,
  getOrders,
  postOrder,
} = require("../controllers/shopController");

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/product-details/:productId", getProductDetails);

// router.get("/cart-item-delete/:productId", deleteProductFromCart);

router.get("/cart", getCart);

router.post("/cart", postProductToCart);

// router.get("/orders", getOrders);

// router.post("/create-order", postOrder);

// router.get("/checkout", getCheckout);

module.exports = router;
