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
