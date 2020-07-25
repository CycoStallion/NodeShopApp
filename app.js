const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/database');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const pageNotFound = require('./controllers/404Controller');

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
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//Custom Middleware
app.use((req, res, next) => {
    console.log("Nothing matched - Heading to 404");
    console.log(req.url, req.method, req.params);
    next(); //Allows the request to continue to the next middleware
});

app.use(pageNotFound);




//Using express -> app.listen, which means we wont require 'http' any more
app.listen(3000);