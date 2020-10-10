const express = require("express");
const router = express.Router();

const { login, postLogin } = require("../controllers/authController");

router.get("/login", login);

router.post("/login", postLogin);

module.exports = router;
