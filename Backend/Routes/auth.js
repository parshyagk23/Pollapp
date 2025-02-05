const express = require("express");
const router = express.Router();

const authController = require("../Controller/User");

router.post("/register", authController?.registerUser);
router.post("/login", authController?.loginUser);
router.post("/user/:id", authController?.getuser);

module.exports = router;
