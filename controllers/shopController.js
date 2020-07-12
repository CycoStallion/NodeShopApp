const Product = require('../models/product');

getProducts = (req, res, next) => {
    
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            products, 
            pageTitle:'All Products', 
            activePath: "/products"
        }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    });
    
};

getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            products, 
            pageTitle:'Shop', 
            activePath: "/"
        }); //Render the index view. Its path and format is already mentioned in the app.js configuration
    });
};

getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle:'Your Cart', 
        activePath: "/cart"
    }); //Render the cart view. Its path and format is already mentioned in the app.js configuration
};

getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle:'Checkout', 
        activePath: "/checkout"
    }); //Render the checkout view. Its path and format is already mentioned in the app.js configuration
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout
}