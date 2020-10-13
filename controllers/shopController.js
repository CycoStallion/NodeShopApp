const Product = require("../models/product");
const Order = require("../models/order");

getProducts = (req, res, next) => {
  Product.find({ isDeleted: false })
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        activePath: "/products",
      }); //Render the index view. Its path and format is already mentioned in the app.js configuration
    })
    .catch((err) => console.log(err));
};

getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  Product.findOne({ _id: productId, isDeleted: false })
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product ? product.title : "Oh-oh",
        activePath: "/products",
      }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    })
    .catch((err) => console.log(err));
};

getIndex = (req, res, next) => {
  Product.find({ isDeleted: false })
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        activePath: "/",
      }); //Render the index view. Its path and format is already mentioned in the app.js configuration
    })
    .catch((err) => console.log(err));
};

getCartInternals = (cartItems) => {
  const cartProducts = [];
  let totalPrice = 0;

  return new Promise((resolve, reject) => {
    if (cartItems.length) {
      cartItems.forEach((cartItem) => {
        cartProducts.push({
          productData: cartItem.product.toObject(),
          productPrice: cartItem.quantity * cartItem.product.price,
          quantity: cartItem.quantity,
        });
      });

      let reducer = (acc, cur) => {
        return acc + cur;
      };

      totalPrice = cartProducts.map((c) => c.productPrice).reduce(reducer);
    }

    resolve({
      cartProducts,
      totalPrice,
    });
  });
};

getCart = (req, res, next) => {
  const user = req.user;
  const cart = user.cart;

  if (!(cart && cart.items.length)) {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      activePath: "/cart",
      products: [],
      totalPrice: 0,
    });
  }

  user
    .populate({ path: "cart.items.product" })
    .execPopulate()
    .then((product) => {
      getCartInternals(product.cart.items)
        .then((cartInternals) => {
          const { cartProducts, totalPrice } = cartInternals;

          res.render("shop/cart", {
            pageTitle: "Your Cart",
            activePath: "/cart",
            products: cartProducts,
            totalPrice: totalPrice,
          }); //Render the cart view. Its path and format is already mentioned in the app.js configuration
        })
        .catch((err) => console.log(err));
    });
};

postProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;

  Product.findOne({ _id: productId, isDeleted: false })
    .then((product) => {
      return user.saveItemToCart(product._id);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

deleteProductFromCart = (req, res, next) => {
  let productId = req.params.productId;
  const user = req.user;

  user
    .removeItemFromCart(productId)
    .then((deletedData) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    activePath: "/checkout",
  }); //Render the checkout view. Its path and format is already mentioned in the app.js configuration
};

getOrders = (req, res, next) => {
  const user = req.user;

  Order.getOrdersByUser(user._id)
    .then((userOrders) => {
      let orders = [];
      orders = userOrders.map((order) => {
        const products = order.productDetails.map((pd) => {
          return {
            title: pd.productData.title,
            productPrice: pd.productPrice,
            quantity: pd.quantity,
          };
        });

        return {
          id: order._id,
          products,
          totalCost: order.totalCost,
        };
      });

      res.render("shop/orders", {
        pageTitle: "Your Orders",
        activePath: "/orders",
        orders,
      }); //Render the orders view. Its path and format is already mentioned in the app.js configuration
    })
    .catch((err) => console.log(err));
};

postOrder = (req, res, next) => {
  const user = req.user;
  const cart = user.cart;

  if (cart && cart.items) {
    user
      .populate({ path: "cart.items.product" })
      .execPopulate()
      .then((product) => {
        getCartInternals(product.cart.items)
          .then((cartInternals) => {
            const { cartProducts, totalPrice } = cartInternals;

            const userId = user._id;

            let order = new Order({
              user: userId,
              productDetails: [...cartProducts],
              totalCost: totalPrice,
            });

            order.save().then((order) => {
              user.emptyCart();
              res.redirect("/orders");
            });
          })
          .catch((err) => console.log(err));
      });
  }
};

module.exports = {
  getProducts,
  getProductDetails,
  getIndex,
  getCart,
  postProductToCart,
  deleteProductFromCart,
  getCheckout,
  getOrders,
  postOrder,
};
