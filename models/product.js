const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

const Cart = require('./cart');

const filePath = path.join(__dirname, '../', 'data', 'products.json');

const randomGeneratedId = crypto.randomBytes(16).toString("hex");

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
        if(this.id){ //Modify the product 
            getAllProductsFromFile(products => {
                const existingProductIndex = products.findIndex(prod => prod.id.toString() === this.id.toString());

                if(existingProductIndex > -1){ //If the product is found 
                    products[existingProductIndex] = this;
                    
                    //Write back to file with new data
                    fs.writeFile(filePath, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                }

                //TODO : When product is not found
            });
        }
        else{ //Add a new product
            getAllProductsFromFile((products) => {
                this.id = randomGeneratedId;
                products.push(this);
    
                //Write back to file with new data
                fs.writeFile(filePath, JSON.stringify(products), (err) => {
                    if(err) console.log(err);
                });
            });
        }
    }

    static fetchAll(callback){
        getAllProductsFromFile(callback);
    }

    static findById(productId, callback){
        getAllProductsFromFile((products) => {
            callback(products.find(p => p.id.toString() === productId.toString()));
        })
    }

    static deleteById(productId){
        getAllProductsFromFile(products => {
            const updatedProducts = products.filter(prod => prod.id.toString() !== productId.toString());

            //Write back to file with new data
            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                if(err) console.log(err);
            });

            Cart.deleteProduct(productId);
        });
    }
}

module.exports = Product;