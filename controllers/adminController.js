const Product = require('../models/product');

getProducts = (req, res, next) => {

    req.user.
        getProducts()
        .then(products => {
            res.render('admin/products', {
                products: products, 
                pageTitle:'Admin Products', 
                activePath: "/admin/products"
            }); //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));

    // Product.findAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             products: products, 
    //             pageTitle:'Admin Products', 
    //             activePath: "/admin/products"
    //         }); //Render the products view. Its path and format is already mentioned in the app.js configuration
    //     })
    //     .catch(err => console.log(err));
    
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

    //Using special method provided by sequelize as we have an 1->many association between user and product
    req.user
        .createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            console.log(result);
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });

    //THE ABOVE WAY IS SAME AS WHAT HAS BEEN COMMENTED BELOW.   

    /*
        Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
            userId: req.user.id //fetch user saved in the request
        }).then(result => {
            console.log(result);
            res.redirect('/admin/products');
        }).catch(err => console.log(err))
    */
};

getEditProduct = (req, res, next) => {
    const productId = req.params.productId;

    req.user.
        getProducts({where:{id: productId}})
        .then(products => {
            if(!products) {
                return res.redirect('/notFound');
            }
            res.render('admin/add-product', {
                pageTitle: 'Edit Product', 
                activePath: "/admin/edit-product",
                product: products[0]
            }) //Render the products view. Its path and format is already mentioned in the app.js configuration
        })
        .catch(err => console.log(err));


    // Product.findByPk(productId)
    //     .then((product) => {
    //         if(!product) {
    //             return res.redirect('/notFound');
    //         }
    //         res.render('admin/add-product', {
    //             pageTitle: 'Edit Product', 
    //             activePath: "/admin/edit-product",
    //             product
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
};

postEditProduct = (req, res, next) => {
    //save to model
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    Product.findByPk(productId)
        .then(product => {
            if(!product) {
                return res.redirect('/notFound');
            }

            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;    
            console.log(product);
            return product.save();
        })
        .then(updatedProduct => {
            res.redirect("products");
        })
        .catch(err => console.log(err));
};

postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.destroy({
        where:{
            id: productId
        }
    })
    .then(data => {console.log("Deleted data:",data); res.redirect('/');})
    .catch(err => console.log(err))
}

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}