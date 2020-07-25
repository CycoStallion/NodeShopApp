const Product = require('../models/product');

getProducts = (req, res, next) => {

    Product.fetchAll()
        .then(([dataRow, fieldMetaData]) => {
            res.render('admin/products', {
                products: dataRow, 
                pageTitle:'Admin Products', 
                activePath: "/admin/products"
            }); //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));
    
};

getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle:'Add Product',activePath: "/admin/add-product"});
};

postAddProduct = (req, res, next) => {
    //save to model
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save()
        .then(() => {
            res.redirect("products");
        })
        .catch(err => console.log(err));

};

getEditProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, (product) => {
        if(!product) {
            return res.redirect('/notFound');
        }
        res.render('admin/add-product', {
            pageTitle: 'Edit Product', 
            activePath: "/admin/edit-product",
            product
        })
    })
};

postEditProduct = (req, res, next) => {
    //save to model
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    Product.findById(productId, (product) => {
        if(!product) {
            return res.redirect('/notFound');
        }

        let updatedProduct = new Product(title, imageUrl, description, price, productId);
        updatedProduct.save();

        res.redirect("products");
    })
};

postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.deleteById(productId);

    res.redirect('/');
}

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}