const Product = require('../models/product');

getProducts = (req, res, next) => {
    console.log("In shop route");
    // res.send('<h1>Hello from Express JS</h1>');
    Product.fetchAll((products) => {
        console.log('Stored products on variable: ', products);
        // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
        res.render('shop', {products, pageTitle:'Shop', activePath: "/"}); //Render the shop view. Its path and format is already mentioned in the app.js configuration
    });
    
};

getAddProducts = (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product', {pageTitle:'Add Product', activePath: "/admin/add-product"});
};

postAddProducts = (req, res, next) => {
    console.log(req.body);
    
    //save to model
    let product = new Product(req.body.title);
    product.save();

    res.redirect("/");
};

module.exports = {
    getProducts,
    getAddProducts,
    postAddProducts
}