const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const verifyJWT = require("../middleware/verifyJWT");


router.get("/adminget", verifyJWT,  adminController.getAllUsersEntirely);

router.get("/admininfo", verifyJWT,  adminController.adminInfo);

router.post("/sendMsg", adminController.sendMsg);

module.exports = router;