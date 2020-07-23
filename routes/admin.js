const express = require('express');

const router = express.Router();

const {getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, postDeleteProduct} = require('../controllers/adminController');

//GET  /admin/product-page
router.get('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

router.post('/delete-product', postDeleteProduct);

//GET /admin/edit-product
router.get('/edit-product/:productId', getEditProduct);

//POST /admin/edit-product
router.post('/edit-product', postEditProduct);

//GET /admin/add-product
router.get('/add-product', getAddProduct);

//Only handle post request here
//POST /admin/add-product
router.post("/add-product", postAddProduct);

//GET /admin/getProducts
router.get("/products", getProducts);

module.exports = router
