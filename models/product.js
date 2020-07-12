const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const filePath = path.join(__dirname, '../', 'data', 'products.json');

const id = crypto.randomBytes(16).toString("hex");

const getAllProductsFromFile = (callback) => {
    fs.readFile(filePath, (err, fileData) => {
        if(err){
            return callback([]);
        }
        try {
            callback(JSON.parse(fileData))
        } catch (error) {
            callback([]);
        }
    })
}

class Product{
    constructor(productTitle, imageUrl, description, price){
        this.title = productTitle;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getAllProductsFromFile((products) => {
            //Add new product 
            this.id = id;
            products.push(this);

            //Write back to file with new data
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback){
        getAllProductsFromFile(callback);
    }

    static findById(productId, callback){
        getAllProductsFromFile((products) => {
            callback(products.find(p => p.id.toString() === productId.toString()));
        })
    }
}

module.exports = Product;