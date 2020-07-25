const Product = require('../models/product');
const Cart = require('../models/fileData/cart');

getProducts = (req, res, next) => {
    
    Product.fetchAll()
        .then(([dataRow, fieldMetaData]) => {
            res.render('shop/product-list', {
                products: dataRow, 
                pageTitle:'All Products', 
                activePath: "/products"
            }); //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));
  
};

getProductDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(([dataRow, fieldMetaData]) => {
            res.render('shop/product-details', {
                product: dataRow[0], 
                pageTitle: dataRow[0] ? dataRow[0].title : 'Oh-oh', 
                activePath: "/products"
            }); //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));

};

getIndex = (req, res, next) => {
    
    Product.fetchAll()
    .then(([dataRow, fieldMetaData]) => {
        res.render('shop/index', {
            products: dataRow, 
            pageTitle:'Shop', 
            activePath: "/"
        }); //Render the index view. Its path and format is already mentioned in the app.js configuration
    })
    .catch(err => console.log(err));
};

getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        
        Product.fetchAll(products => {
            const cartProducts = [];
            products.forEach(prod => {
                const cartProduct = cart.products.find(cp => cp.productId === prod.id);
                cartProduct && cartProducts.push({productData: prod, productPrice: cartProduct.quantity * prod.price, quantity: cartProduct.quantity});
            });

            let reducer = (acc, cur) => {
                return acc + cur;
            }

            let totalPrice = cartProducts.map(c => c.productPrice).reduce(reducer);

            res.render('shop/cart', {
                pageTitle:'Your Cart', 
                activePath: "/cart",
                products: cartProducts,
                totalPrice: totalPrice
            }); //Render the cart view. Its path and format is already mentioned in the app.js configuration
        });    
    })
};

postProductToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        //Add product to cart
        Cart.addProduct(productId, product.price);
        res.redirect('/cart');
    });
}

deleteProductFromCart = (req, res, next) => {
    let productId = req.params.productId;
    Cart.deleteProduct(productId);
    res.redirect('/cart');
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
    deleteProductFromCart,
    getCheckout,
    getOrders
}