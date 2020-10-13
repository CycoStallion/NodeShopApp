const express = require("express");
const router = express.Router();

const {
  login,
  postLogin,
  logout,
  signup,
  postSignup,
} = require("../controllers/authController");

router.get("/login", login);
router.post("/login", postLogin);

router.get("/logout", logout);

router.get("/signup", signup);
router.post("/signup", postSignup);

module.exports = router;
