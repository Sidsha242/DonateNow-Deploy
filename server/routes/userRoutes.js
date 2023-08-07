var mongoose = require('mongoose');
const express = require("express");
const router = express.Router()
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt')
const config = require("../config");
require("dotenv").config();

const User = require("../models/userModel");
const MedInfo = require ("../models/medInfoModel");

const client=require('twilio')(config.accountSID,config.authToken)
router.get('/login',(req,res)=>{
    client.verify.v2.services(config.serviceID).verifications.create({
        to:`+${req.query.phonenumber}`,
        channel:`${req.query.channel}`
    }).then((data)=>{
        res.status(200).send(data)
    })
})

router.get('/verify',(req,res)=>{
    client.verify.v2.services(config.serviceID).verificationChecks.create({
        to:`+${req.query.phonenumber}`,
        code:`${req.query.code}`
    }).then((data)=>{
        res.status(200).send(data)
    })
})


router.post("/register" , async (req, res) => {
    console.log('Inside route');
  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password : req.body.password,
    phonenum : req.body.phonenum
  });
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  try{
    await newUser.save()
    res.json({ result: newUser, message: "Registered Successful" });
  }catch(err)
  {
    res.json({ result: err, message: "Email Id already use" });
  }
});

router.post("/sign_in" , async (req, res) => {
  console.log(req.body);
    try{
        const user = await User.findOne({
           email: req.body.email
         });
        
        if (user) {
             bcrypt.compare(req.body.password, user.password, (error, response) => {  
                 if (response) {
                     const id = user._id
                     const token = jwt.sign({ id }, process.env.JWT_KEY, {
                         expiresIn: 300,
                     })
                     console.log(user._id);
                    

                     res.json({ auth: true, token: token, result: user, message: "Login Successful" });   //user is autheraized therefore creaying token
                }
                 else {
                     res.json({ auth: false, message: "wrong username/password combination" });
                 }
             })
             console.log("found");
         }
         else {
             res.json({ auth: false, message: "no user exists" });
         }
    }
       catch(err)
       {
        console.log(err);
        res.status(500).send(err);
       }
});

router.post("/medinfo" , async (req, res) => {
  var newMedInfo = new MedInfo({
    user_id: req.body.user_id,
    email: req.body.email,
    bldgrp : req.body.bldgrp,
    age : req.body.age,

  });
  try{
    await newMedInfo.save()
    res.json({ result: newMedInfo, message: "Information Added Successfuly" });
  }catch(err)
  {
    console.log(err);
    res.json({ result: err, message: "Error" });
  }
});

router.get("/getmedinfo/:id", async (req, res) => {
  console.log('Inside getinfo');
  const id = req.params.id;

  try {
    const info = await MedInfo.findOne({
      _id: req.params.id,
    });
    if (info) {
      res.status(200).json({
        status: 200,
        data: info,
      });
    }
    res.status(400).json({
      status: 400,
      message: "No user info found",
    });
  } 
  catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
})

module.exports = router;