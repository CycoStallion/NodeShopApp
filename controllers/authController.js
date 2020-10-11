exports.login = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activePath: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
