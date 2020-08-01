const Product = require('../models/product');
const Cart = require('../models/fileData/cart');

getProducts = (req, res, next) => {
    
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                products: products, 
                pageTitle:'Shop', 
                activePath: "/products"
            }); //Render the index view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));
  
};

getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    
    Product.findByPk(productId)
        .then((product) => {
            res.render('shop/product-details', {
                product: product, 
                pageTitle: product ? product.title : 'Oh-oh', 
                activePath: "/products"
            }); //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));

};

getIndex = (req, res, next) => {
    
    Product.findAll()
            .then(products => {
                res.render('shop/index', {
                    products: products, 
                    pageTitle:'Shop', 
                    activePath: "/"
                }); //Render the index view. Its path and format is already mentioned in the app.js configuration
            })
            .catch(err => console.log(err));
};

getCart = (req, res, next) => {
    const user = req.user;

    user.getCart()
        .then(cart => {
            if(!cart){
                return [];
            }

            return cart.getProducts();
        })
        .then(products => {
            const cartProducts = [];
            let totalPrice = 0;
            console.log("Cart products to see",products);

            if(products.length){
                products.forEach(product => {
                    cartProducts.push({
                        productData: product, 
                        productPrice: product.cartItem.quantity * product.price, 
                        quantity: product.cartItem.quantity
                    });
                });
    
                let reducer = (acc, cur) => {
                    return acc + cur;
                }
    
                totalPrice = cartProducts.map(c => c.productPrice).reduce(reducer);
            }

            res.render('shop/cart', {
                pageTitle:'Your Cart', 
                activePath: "/cart",
                products: cartProducts,
                totalPrice: totalPrice
            }); //Render the cart view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err))
};

postProductToCart = (req, res, next) => {
    const productId = req.body.productId;
    const user = req.user;

    Product.findByPk(productId)
            .then(product => {
                let newQuantity = 1;
                let fetchedCart;
                user.getCart()
                    .then(cart => {
                        if(!cart){
                            return user.createCart()
                        }
                        return cart;
                    })
                    .then(cart => {
                        fetchedCart = cart;
                        return cart.getProducts({where:{id: productId}})
                    })
                    .then(products => {
                        if(products.length){
                            let cartProduct = products[0];
                            newQuantity = cartProduct.cartItem.quantity + 1;
                        }
                        fetchedCart.addProduct(product, {
                            through:{quantity: newQuantity}
                        })
                        .then(data => {
                            res.redirect('/cart');
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
}

deleteProductFromCart = (req, res, next) => {
    let productId = req.params.productId;
    
    req.user
        .getCart()
        .then(cart => {
            cart.getProducts({
                where:{id: productId}
            })
            .then(products => {
                let productToBeRemoved = products[0];
                return cart.removeProduct(productToBeRemoved);
            })
            .then(data =>{
                res.redirect("/cart");
            })
        })
        .catch(err => console.log(err));
}

getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle:'Checkout', 
        activePath: "/checkout"
    }); //Render the checkout view. Its path and format is already mentioned in the app.js configuration
};

getOrders = (req, res, next) => {
    const user = req.user;
    
    user.getOrders({include: Product}) //Eager load all products for an order
        .then(orders => {
            res.render('shop/orders', {
                pageTitle:'Your Orders', 
                activePath: "/orders",
                orders
            }); //Render the orders view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));                  
};
                
postOrder = (req, res, next) => {
    const user = req.user;
    let cartProducts;

    user.getCart()
        .then(cart => {
            cart.getProducts()
                .then(products => {
                    cartProducts = products;
                    console.log("Ordering these products:", cartProducts);
                    return user.createOrder();
                })
                .then(order => {
                    cartProducts.forEach(product => {
                        order.addProduct(product, {
                            through: {quantity: product.cartItem.quantity}
                        })
                    })

                    return cart.setProducts(null); //Remove all products from a cart
                })
                .then(result => {
                    res.redirect("/orders");
                })
        })
        .catch(err => console.log(err));
}

module.exports = {
    getProducts,
    getProductDetails,
    getIndex,
    getCart,
    postProductToCart,
    deleteProductFromCart,
    getCheckout,
    getOrders,
    postOrder
}