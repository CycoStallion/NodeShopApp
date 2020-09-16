const Product = require("../models/product");
const Order = require("../models/order");

getProducts = (req, res, next) => {
  Product.find()
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

  Product.findById(productId)
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
  Product.find()
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

  const cartProductIds = cartItems.map((cp) => {
    return cp.productId;
  });

  return Product.findByIds(cartProductIds).then((products) => {
    if (products.length) {
      products.forEach((product) => {
        let cartItem = cartItems.find(
          (cp) => cp.productId.toString() === product._id.toString()
        );

        cartProducts.push({
          productData: product,
          productPrice: cartItem.quantity * product.price,
          quantity: cartItem.quantity,
        });
      });

      let reducer = (acc, cur) => {
        return acc + cur;
      };

      totalPrice = cartProducts.map((c) => c.productPrice).reduce(reducer);

      return {
        cartProducts,
        totalPrice,
      };
    }

    return {
      cartProducts,
      totalPrice,
    };
  });
};

getCart = (req, res, next) => {
  const user = req.user;

  const cart = user.cart;

  if (!(cart && cart.items)) {
    return [];
  }

  const cartProductIds = cart.items.map((cp) => {
    return cp.productId;
  });

  getCartInternals(cart.items)
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
};

postProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  const user = req.user;

  Product.findById(productId)
    .then((product) => {
      return user.saveItemsToCart(product._id);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

deleteProductFromCart = (req, res, next) => {
  let productId = req.params.productId;
  const user = req.user;

  Product.findById(productId).then((product) => {
    user
      .deleteProductFromCart(product._id)
      .then((deletedData) => {
        console.log(deletedData);
        res.redirect("/cart");
      })
      .catch((err) => console.log(err));
  });
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
  let cartProducts;

  if (cart && cart.items) {
    let order = new Order(user._id, cart.items, 0);

    getCartInternals(cart.items)
      .then((cartInternals) => {
        const { cartProducts, totalPrice } = cartInternals;
        order.productDetails = cartProducts;
        order.totalCost = totalPrice;

        order.addProducts().then((order) => {
          res.redirect("/orders");
        });
      })
      .catch((err) => console.log(err));
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
