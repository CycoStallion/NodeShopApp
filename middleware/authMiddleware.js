const { LOGIN } = require("../constants/pathNames");

module.exports = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect(LOGIN);
  }
};
