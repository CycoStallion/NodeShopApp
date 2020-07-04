const path = require('path');
const express = require('express');

const router = express.Router();

//GET  /admin/product-page
router.get('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

//GET /admin/add-product
router.get('/add-product', (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

//Only handle post request here
//POST /admin/add-product
router.post("/add-product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});


module.exports = router;