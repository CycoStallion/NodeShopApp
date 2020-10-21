const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseModelName = "User";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.removeItemFromCart = function (productId) {
  let cartItems;
  if (this.cart && this.cart.items) {
    cartItems = this.cart.items.filter(
      (cp) => cp.product.toString() !== productId.toString()
    );

    this.cart.items = cartItems;

    return this.save();
  }
};

userSchema.methods.emptyCart = function () {
  this.cart.items = [];
  return this.save();
};

userSchema.methods.saveItemToCart = function (productId) {
  let newQuantity = 1;
  let cartItems = [{ product: productId, quantity: newQuantity }];

  if (this.cart && this.cart.items) {
    //A cart with some items is found, lets search the product here
    const existingProductIndex = this.cart.items.findIndex((cp) => {
      return cp.product.toString() === productId.toString();
    });

    if (existingProductIndex > -1) {
      //If product is found, increase its quantity
      ++this.cart.items[existingProductIndex].quantity;
    } else {
      //This is a new product, then add it to the cart
      this.cart.items.push({
        product: productId,
        quantity: newQuantity,
      });
    }

    cartItems = [...this.cart.items];
  }

  return this.save();
};

module.exports = mongoose.model(mongooseModelName, userSchema);

/*
const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

let mongoCollectionName = "users";

class User {
  constructor(userName, email, cart, id = null) {
    this.userName = userName;
    this.email = email;
    this.cart = cart; //[{productId, quantity}]
    this._id = id && new mongoDb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection(mongoCollectionName)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection(mongoCollectionName).insertOne(this);
    }

    return dbOp
      .then((returnedUser) => {
        console.log("Returned user: ", returnedUser);
      })
      .catch((err) => console.log(err));
  }

  saveItemsToCart(productId) {
    let newQuantity = 1;
    let cartItems = [
      { productId: new mongoDb.ObjectID(productId), quantity: newQuantity },
    ];

    if (this.cart && this.cart.items) {
      //A cart with some items are found, lets search the product here
      const existingProductIndex = this.cart.items.findIndex((cp) => {
        return cp.productId.toString() === productId.toString();
      });

      if (existingProductIndex > -1) {
        //If product is found, increase its quantity
        ++this.cart.items[existingProductIndex].quantity;
      } else {
        //This is a new product, then add it to the cart
        this.cart.items.push({
          productId: new mongoDb.ObjectID(productId),
          quantity: newQuantity,
        });
      }

      cartItems = [...this.cart.items];
    }

    //If there is no cart OR there are no items
    let cart = {
      items: cartItems,
    };
    const db = getDb();

    return db.collection(mongoCollectionName).updateOne(
      {
        _id: new mongoDb.ObjectID(this._id),
      },
      { $set: { cart } }
    );
  }

  deleteProductFromCart(productId) {
    let cartItems;
    if (this.cart && this.cart.items) {
      cartItems = this.cart.items.filter(
        (cp) => cp.productId.toString() !== productId.toString()
      );

      let cart = {
        items: cartItems,
      };

      const db = getDb();
      return db.collection(mongoCollectionName).updateOne(
        {
          _id: new mongoDb.ObjectID(this._id),
        },
        { $set: { cart } }
      );
    }
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .findOne({ _id: new mongoDb.ObjectId(userId) })
      .then((selectedUser) => {
        console.log("Found user: ", selectedUser);
        return selectedUser;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
*/
