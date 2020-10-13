const express = require("express");
const router = express.Router();

const { login, postLogin, logout } = require("../controllers/authController");

router.get("/login", login);

router.post("/login", postLogin);
router.get("/logout", logout);

module.exports = router;
