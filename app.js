const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))

//Load Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Custom Middleware
app.use((req, res, next) => {
    console.log("In the middleware");
    console.log(req.url, req.method, req.params);
    next(); //Allows the request to continue to the next middleware
});

app.use((req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    res.status(404)
        .sendFile(path.join(__dirname, 'views', '404.html'));
});




//Using express -> app.listen, which means we wont require 'http' any more
app.listen(3000);