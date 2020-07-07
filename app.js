const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Defining the view engine for express and explicitly mention the views folder to be used
/* //For pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pug'));
*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'ejs'));


//Load Routes
app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

//Custom Middleware
app.use((req, res, next) => {
    console.log("Nothing matched - Heading to 404");
    console.log(req.url, req.method, req.params);
    next(); //Allows the request to continue to the next middleware
});

app.use((req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    res.status(404)
        //.sendFile(path.join(__dirname, 'views', '404.html'));
        .render('404', {activePath: '', pageTitle: 'Page Not Found'});
});




//Using express -> app.listen, which means we wont require 'http' any more
app.listen(3000);