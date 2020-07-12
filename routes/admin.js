const express = require('express');

const router = express.Router();

const {getAddProduct, postAddProduct, getProducts} = require('../controllers/adminController');

//GET  /admin/product-page
router.get('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

//GET /admin/add-product
router.get('/add-product', getAddProduct);

//Only handle post request here
//POST /admin/add-product
router.post("/add-product", postAddProduct);

//GET /admin/getProducts
router.get("/products", getProducts);

module.exports = router
