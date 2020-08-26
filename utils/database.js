const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

exports.mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://developer:Develop123@developmentdbcluster.vzz8j.mongodb.net/NodeShopApplication?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log("Connected to mongoDB!");
      callback();
      _db = client.db(); //client.db('test'); //->Will override the database provided in the connection string
    })
    .catch((err) => console.log(err));
};

exports.getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database client has been initialized";
};
