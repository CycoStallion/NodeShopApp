const path = require('path');
const express = require('express');

const router = express.Router();

//This variable will be available on the Node application running on the server and will be available to all requests
//When edited by one, the updates will be seen by other requests
const products = []; 

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
    products.push(req.body.title);
    res.redirect("/");
});


module.exports ={
    router,
    products
}
