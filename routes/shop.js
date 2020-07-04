const path = require('path');
const express =  require('express');
const {products} = require('./admin');

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("In shop route");
    // res.send('<h1>Hello from Express JS</h1>');
    console.log('Stored products on variable: ', products);
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;