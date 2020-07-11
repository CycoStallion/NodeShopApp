const path = require('path');
const express = require('express');

const router = express.Router();

const {getAddProducts, postAddProducts} = require('../controllers/productController');
const { route } = require('./shop');


//GET  /admin/product-page
router.get('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

//GET /admin/add-product
router.get('/add-product', getAddProducts);

//Only handle post request here
//POST /admin/add-product
router.post("/add-product", postAddProducts);


module.exports = router
