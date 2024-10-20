const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.userRegister);

router.post("/sign_in", authController.userSignIn);

router.get("/sign_out", authController.userSignOut);

module.exports = router;
