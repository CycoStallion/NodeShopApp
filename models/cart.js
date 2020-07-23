const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'data', 'cart.json');

class Cart{
    static addProduct(productId, productPrice){
        //Fetch product from the file
        fs.readFile(filePath, (err, fileContent)=> {
            //Cart object structure to store
            let cart = {products:[], totalPrice:0};
            
            //Check if we have data and construct cart object from it
            if(!err){
                cart = JSON.parse(fileContent);

                //Check if we have the current product in the cart already
                const existingProductIndex = cart.products.findIndex(prod => prod.productId === productId);
                let productToUpdate;

                if(existingProductIndex > -1){ //If the product is already added previously
                    const existingProduct = cart.products[existingProductIndex];
                    productToUpdate = {...existingProduct};
                    existingProduct.quantity += 1;
                    existingProduct.price += productPrice;
                }
                else{
                    cart.products.push({productId, quantity: 1, price: productPrice});
                }
                
                cart.totalPrice += productPrice;
            }
            else{
                cart.products.push({productId, quantity: 1, price: productPrice});
                cart.totalPrice += productPrice;
            }

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log("Error while writing cart:", err);
            })

        });
        //Add new product / increase quantity
    }

    static deleteProduct(productId, productPrice){
        fs.readFile(filePath, (err, fileContent) => {
            //Cart object structure to store
            let cart = {products:[], totalPrice:0};
            
            //Check if we have data and construct cart object from it
            if(!err){
                cart = JSON.parse(fileContent);
                const product = cart.products.find(prod => prod.productId === productId);
                cart.totalPrice -= product.price;

                cart.products = cart.products.filter(prod => prod.productId !== productId);

                fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                    if(err) console.log("Error while writing cart:", err);
                })
            }
        });
    }
}

module.exports = Cart;