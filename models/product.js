const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'data', 'products.json');

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
            let newProduct = {
                title: this.title,
                imageUrl: this.imageUrl,
                description: this.description,
                price: this.price
            };

            products.push(newProduct);

            //Write back to file with new data
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback){
        getAllProductsFromFile(callback);
    }
}

module.exports = Product;