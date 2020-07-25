const db = require('../utils/database');

class Product{
    constructor(productTitle, imageUrl, description, price, id = null){
        this.id = id;
        this.title = productTitle;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        return db.execute(
            'INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)',
            [this.title, this.price, this.description, this.imageUrl]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }

    static findById(productId){
        return db.execute(
            'SELECT * FROM products WHERE products.id = ?',
            [productId]);
    }

    static deleteById(productId){
        
    }
}

module.exports = Product;