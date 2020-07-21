const express =  require('express');

const router = express.Router();

const {getProducts, getProductDetails, getIndex, getCart, postProductToCart, getCheckout, getOrders} = require('../controllers/shopController');

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/product-details/:productId", getProductDetails);

router.get("/cart", getCart);

router.post("/cart", postProductToCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

module.exports = router;