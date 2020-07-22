const Product = require('../models/product');
const Cart = require('../models/cart');

getProducts = (req, res, next) => {
    
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            products, 
            pageTitle:'All Products', 
            activePath: "/products"
        }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    });
    
};

getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render('shop/product-details', {
            product,
            pageTitle: product ? product.title : 'Oh-oh', 
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

postProductToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        //Add product to cart
        Cart.addProduct(productId, product.price);
        res.render('shop/cart', {
            product,
            pageTitle: product ? product.title : 'Oh-oh', 
            activePath: "/cart"
        }); //Render the cart view. Its path and format is already mentioned in the app.js configuration
    });
}

getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle:'Checkout', 
        activePath: "/checkout"
    }); //Render the checkout view. Its path and format is already mentioned in the app.js configuration
};

getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle:'Your Orders', 
        activePath: "/orders"
    }); //Render the orders view. Its path and format is already mentioned in the app.js configuration
};

module.exports = {
    getProducts,
    getProductDetails,
    getIndex,
    getCart,
    postProductToCart,
    getCheckout,
    getOrders
}