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
    constructor(productTitle){
        this.title = productTitle
    }

    save(){
        getAllProductsFromFile((products) => {
            //Add new product 
            products.push(this.title);

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