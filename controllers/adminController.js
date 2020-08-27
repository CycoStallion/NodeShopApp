const Product = require("../models/product");

getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        activePath: "/admin/products",
      }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    })
    .catch((err) => console.log(err));
};

getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    activePath: "/admin/add-product",
  });
};

postAddProduct = (req, res, next) => {
  //save to model
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = +req.body.price;
  const description = req.body.description;
  const userId = req.user._id;

  const product = new Product(title, price, imageUrl, description, userId);
  product
    .save({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: userId,
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/notFound");
      }
      res.render("admin/add-product", {
        pageTitle: "Edit Product",
        activePath: "/admin/edit-product",
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

postEditProduct = (req, res, next) => {
  //save to model
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = +req.body.price;
  const description = req.body.description;
  const userId = req.user._id;

  let product = new Product(
    title,
    price,
    imageUrl,
    description,
    userId,
    productId
  );

  product
    .save()
    .then((updatedProduct) => {
      res.redirect("products");
    })
    .catch((err) => console.log(err));
};

postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId)
    .then((data) => {
      console.log("Deleted data:", data);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProducts,
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
