
//This variable will be available on the Node application running on the server and will be available to all requests
//When edited by one, the updates will be seen by other requests
const products = []; 

getProducts = (req, res, next) => {
    console.log("In shop route");
    // res.send('<h1>Hello from Express JS</h1>');
    console.log('Stored products on variable: ', products);
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    res.render('shop', {products, pageTitle:'Shop', activePath: "/"}); //Render the shop view. Its path and format is already mentioned in the app.js configuration
};

getAddProducts = (req, res, next) => {
    // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.render('add-product', {pageTitle:'Add Product', activePath: "/admin/add-product"});
};

postAddProducts = (req, res, next) => {
    console.log(req.body);
    products.push(req.body.title);
    res.redirect("/");
};

module.exports = {
    getProducts,
    getAddProducts,
    postAddProducts
}