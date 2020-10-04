const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const shopRoutes = require("./routes/shop");

const pageNotFound = require("./controllers/404Controller");

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Defining the view engine for express and explicitly mention the views folder to be used
/* //For pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pug'));
*/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views", "ejs"));

//Load user - Store the dummy user in the req
app.use((req, res, next) => {
  User.findById("5f47464ac00323c479deca07")
    .then((user) => {
      console.log("When saving to request(req): ", user);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//Load Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//Custom Middleware
app.use((req, res, next) => {
  console.log("Nothing matched - Heading to 404");
  console.log(req.url, req.method, req.params);
  next(); //Allows the request to continue to the next middleware
});

app.use(pageNotFound);

mongoose
  .connect(
    "mongodb+srv://developer:Develop123@developmentdbcluster.vzz8j.mongodb.net/NodeShopApplication?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        var newUser = new User({
          name: "Shantanu",
          email: "test@test.com",
          cart: { items: [] },
        });

        newUser.save();
      }
    });

    app.listen(3000);
    console.log(
      "Listening to requests on port 3000, using mongoose for db connection"
    );
  })
  .catch((err) =>
    console.error("Errored while connecting to mongodb using mongoose")
  );
