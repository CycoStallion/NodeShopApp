const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');

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

//Load user - Store the dummy user in the req
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user; //This is the sequelize user which contains all sequelize methods for an instance
            next();
        })
        .catch(err => {
            console.log(err)
        })
});

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

/***********DB Relations****************/

//1. A product is created by some user in the application and is the owner of it.
//When the user is gone, the product should not exist either
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product); //This is required to enable mixins

sequelize
    .sync()    
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            //Seed user data
            return User.create({name: 'Shantanu', email: 'test@test.com'})
        }
        
        return user; //same as return Promise.resolve(user); //A value returned from a then is always a Promise
    })
    .then(user =>{
        app.listen(3000)
    })
    .catch(err => {
        console.log("Error:",err)
    })


//Using express -> app.listen, which means we wont require 'http' any more
// app.listen(3000);