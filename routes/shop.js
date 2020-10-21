const express = require("express");
const {
  ROOT,
  PRODUCTS,
  PRODUCT_DETAILS,
  DELETE_CART_ITEM_PRODUCTID,
  CART,
  ORDERS,
  CREATE_ORDER,
} = require("../constants/pathNames");

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

router.get(ROOT, getIndex);

router.get(PRODUCTS, getProducts);

router.get(PRODUCT_DETAILS, getProductDetails);

router.get(DELETE_CART_ITEM_PRODUCTID, deleteProductFromCart);

router.get(CART, getCart);

router.post(CART, postProductToCart);

router.get(ORDERS, getOrders);

router.post(CREATE_ORDER, postOrder);

// // router.get("/checkout", getCheckout);

module.exports = router;
