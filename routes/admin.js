const express = require('express');

const router = express.Router();

//Route for /product-page
router.get('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
});

//Only handle post request here
router.post("/product", (req, res, next) => {
    console.log(req.body);
    res.send("<h1>This is the products page</h1>");
});


module.exports = router;