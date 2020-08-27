const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

let mongoCollectionName = "products";

class Product {
  constructor(title, price, imageUrl, description, id = null) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id && new mongoDb.ObjectID(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      //Update the product when id is passed in
      dbOp = db
        .collection(mongoCollectionName)
        .updateOne({ _id: new mongoDb.ObjectID(this._id) }, { $set: this });
    } else {
      dbOp = db.collection(mongoCollectionName).insertOne(this);
    }
    return dbOp
      .then((result) => console.log("Inserted product with result as ", result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .find({ _id: new mongoDb.ObjectID(productId) })
      .next()
      .then((productDetails) => {
        console.log(productDetails);
        return productDetails;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(productId) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .deleteOne({ _id: new mongoDb.ObjectID(productId) })
      .then((result) => console.log("Delete result: ", result))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
