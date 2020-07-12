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
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('admin/add-product', {pageTitle:'Add Product', activePath: "/admin/add-product"});
};

postAddProduct = (req, res, next) => {
    console.log(req.body);
    
    //save to model
    let product = new Product(req.body.title);
    product.save();

    res.redirect("/");
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