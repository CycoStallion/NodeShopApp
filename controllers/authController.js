exports.login = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activePath: "/login",
  });
};
