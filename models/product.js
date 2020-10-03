const mongoose = require("mongoose");

const mongooseModelName = "Product";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model(mongooseModelName, productSchema);

/*const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

let mongoCollectionName = "products";

class Product {
  constructor(title, price, imageUrl, description, userId, id = null) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId && new mongoDb.ObjectId(userId);
    this._id = id && new mongoDb.ObjectId(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      //Update the product when id is passed in
      dbOp = db
        .collection(mongoCollectionName)
        .updateOne({ _id: this._id }, { $set: this });
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

  static findByIds(productIds) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((allProducts) => allProducts)
      .catch((err) => console.error(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection(mongoCollectionName)
      .find({ _id: new mongoDb.ObjectId(productId) })
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
      .deleteOne({ _id: new mongoDb.ObjectId(productId) })
      .then((result) => console.log("Delete result: ", result))
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
*/
