const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { mongoConnect } = require("./utils/database");
const User = require("./models/user");

const app = express();

const adminRoutes = require("./routes/admin");
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
      console.log("When saving to request: ", user);
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

//Custom Middleware
app.use((req, res, next) => {
  console.log("Nothing matched - Heading to 404");
  console.log(req.url, req.method, req.params);
  next(); //Allows the request to continue to the next middleware
});

app.use(pageNotFound);

mongoConnect(() => {
  app.listen(3000);
  console.log("Listening to requests on port 3000");
});

//Using express -> app.listen, which means we wont require 'http' any more
// app.listen(3000);
