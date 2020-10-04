const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const mongooseModelName = "Order";

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productDetails: [
    {
      productData: {
        type: Object,
        ref: "Product",
        required: true,
      },
      productPrice: { type: Number, required: true }, //Product price at the point when it was bought
      quantity: { type: Number, required: true },
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
});

orderSchema.statics.getOrdersByUser = function (userId) {
  return this.find({ user: userId });
};

module.exports = mongoose.model(mongooseModelName, orderSchema);

/*
const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

let mongoCollectionName = "orders";

class Order {
  constructor(userId, productDetails, totalCost) {
    this.userId = userId;
    this.productDetails = [...productDetails];
    this.totalCost = totalCost;
  }

  addProducts() {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .insertOne(this)
      .then((result) => console.log("New order created as ", result))
      .catch((err) => console.log(err));
  }

  static getOrdersByUser(userId) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .find({ userId: new mongoDb.ObjectID(userId) })
      .toArray()
      .then((orders) => orders);
  }
}

module.exports = Order;
*/
