const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");


router.get("/adminget" , adminController.getAllUsersEntirely);

router.get("/admininfo", adminController.adminInfo);

router.post("/sendMsg", adminController.sendMsg);

module.exports = router;