const express =  require('express');

const router = express.Router();

const {getProducts, getProductDetails, getIndex, getCart, getCheckout, getOrders} = require('../controllers/shopController');

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/product-details/:productId", getProductDetails);

router.get("/cart", getCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

module.exports = router;