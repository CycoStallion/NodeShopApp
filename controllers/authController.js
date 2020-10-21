const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activePath: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((passwordMatched) => {
          if (passwordMatched) {
            req.session.isLoggedIn = true;
            res.locals.isLoggedIn = req.session.isLoggedIn;

            req.session.user = user;
            //First save the session to the DB and only then redirect as saving to db might take some time
            return req.session.save((err) => {
              console.error(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => console.error(err));
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

exports.postSignup = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) return res.redirect("/signup");
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            name: username,
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return newUser.save();
        })
        .then((result) => res.redirect("/login"));
    })
    .catch((err) => console.error(err));
};
