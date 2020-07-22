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
    constructor(productTitle, imageUrl, description, price, id = null){
        this.id = id;
        this.title = productTitle;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        if(this.id){
            getAllProductsFromFile(products => {
                const existingProductIndex = products.findIndex(prod => prod.id.toString() === this.id.toString());
                products[existingProductIndex] = this;

                // existingProduct.title = this.title;
                // existingProduct.imageUrl = this.imageUrl;
                // existingProduct.description = this.description;
                // existingProduct.price = this.price;

                //Write back to file with new data
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            });
        }
        else{
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
    }

    static fetchAll(callback){
        getAllProductsFromFile(callback);
    }

    static findById(productId, callback){
        getAllProductsFromFile((products) => {
            console.log("Find by id", productId.toString())
            callback(products.find(p => p.id.toString() === productId.toString()));
        })
    }
}

module.exports = Product;