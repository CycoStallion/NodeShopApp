const express = require('express');

const app = express();

//Custom Middleware
app.use((req, res, next) => {
    console.log("In the middleware");
    next(); //Allows the request to continue to the next middleware
});

//Route for /product-page
app.use('/product-page', (req, res, next) => {
    res.send('<h1>This is the product page</h1>');
})

app.use((req, res, next) => {
    console.log("In another middleware");
    res.send('<h1>Hello from Express JS</h1>');
});

//Using express -> app.listen, which means we wont require 'http' any more
app.listen(3000);