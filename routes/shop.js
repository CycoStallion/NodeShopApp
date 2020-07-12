const express =  require('express');

const router = express.Router();

const {getProducts, getIndex, getCart, getCheckout} = require('../controllers/shopController');

router.get("/", getIndex);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

module.exports = router;