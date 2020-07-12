const Product = require('../models/product');

getProducts = (req, res, next) => {
    
    Product.fetchAll((products) => {
        res.render('admin/products', {
            products, 
            pageTitle:'Admin Products', 
            activePath: "/admin/products"
        }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    });
    
};

getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle:'Add Product', activePath: "/admin/add-product"});
};

postAddProduct = (req, res, next) => {
    //save to model
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    let product = new Product(title, imageUrl, description, price);
    product.save();

    res.redirect("products");
};

getEditProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Edit Product', activePath: "/admin/edit-product"})
};

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct
}