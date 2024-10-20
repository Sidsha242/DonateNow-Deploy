const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");
const requestController = require("../controllers/requestController");

const verifyJWT = require("../middleware/verifyJWT");
router.use(verifyJWT);

router.get("/getDetailsOfUser/:id", userController.getDetailsOfUser);

router.get("/getAllDonationsofUser/:id", userController.getAllDonationsofUser);

router.get(
  "/getTotalBloodDonatedByUser/:id",
  userController.getTotalBloodDonatedByUser
);

router.delete("/delUser/:id", userController.delUser);

router.get("/getRequests", requestController.getRequests);

router.delete("/delReq/:id", requestController.delReq);

router.get("/getRequestDetails/:id", requestController.getRequestDetails);

router.post("/uploadImage", userController.uploadImage);

module.exports = router;
