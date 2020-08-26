const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = new mongoDb.ObjectID(id);
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      //Update the product when id is passed in
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongoDb.ObjectID(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => console.log("Inserted product with result as ", result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
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
      .collection("products")
      .find({ _id: new mongoDb.ObjectID(productId) })
      .next()
      .then((productDetails) => {
        console.log(productDetails);
        return productDetails;
      })
      .catch((err) => console.log(err));
  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
// });

module.exports = Product;
