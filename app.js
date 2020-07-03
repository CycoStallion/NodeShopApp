const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))

//Custom Middleware
app.use((req, res, next) => {
    console.log("In the middleware");
    console.log(req.url, req.method, req.params);
    next(); //Allows the request to continue to the next middleware
});

//Route for /product-page
app.use('/product-page', (req, res, next) => {
    console.log(req.body); //Will show undefined w/o body parser
    res.redirect("/");
});

//Only hanlde post request here
app.post("/product", (req, res, next) => {
    console.log(req.body);
    res.send("<h1>This is the products page</h1>");
})

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Post</button></form>');
});

app.use((req, res, next) => {
    console.log("In another middleware");
    res.send('<h1>Hello from Express JS</h1>');
});

//Using express -> app.listen, which means we wont require 'http' any more
app.listen(3000);