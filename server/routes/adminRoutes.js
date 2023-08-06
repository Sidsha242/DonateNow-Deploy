const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const User = require("../models/userModel");
const MedInfo = require ("../models/medInfoModel");

 router.get("/adminget" , async(req, res) => {
    //const users = await User.find();
    const users = User.aggregate([
      {
         $lookup:
            {
              from: "medinfos",
              localField: "email",
              foreignField: "email",
              as: "usersdetails"
            }.pretty()
      },
       {
         $unwind: "$usersdetails"
       }
   ])
    try {
      console.log(users) ;
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  module.exports = router;