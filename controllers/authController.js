const User = require("../models/user");

exports.login = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activePath: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5f47464ac00323c479deca07")
    .then((user) => {
      req.session.isLoggedIn = true;
      res.locals.isLoggedIn = req.session.isLoggedIn;
      console.log(
        "When saving to session the user is logged in: ",
        req.session.isLoggedIn
      );
      req.session.user = user;
      //First save the session to the DB and only then redirect as saving to db might take some time
      req.session.save((err) => {
        console.error(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.error(err);
    res.redirect("/");
  });
};

exports.signup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up",
    activePath: "/signup",
  });
};

exports.postSignup = (req, res, next) => {};
