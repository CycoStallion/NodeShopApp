const products = [];

class Product{
    constructor(productTitle){
        this.title = productTitle
    }

    save(){
        products.push(this.title);
    }

    static fetchAll(){
        return products;
    }
}

module.exports = Product;