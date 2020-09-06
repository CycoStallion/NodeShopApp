const mongoDb = require("mongodb");
const { getDb } = require("../utils/database");

let mongoCollectionName = "users";

class User {
  constructor(userName, email, id = null) {
    this.userName = userName;
    this.email = email;
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
