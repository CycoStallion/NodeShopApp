exports.login = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activePath: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
