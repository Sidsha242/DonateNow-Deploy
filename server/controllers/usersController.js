const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Db } = require("mongodb");
const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();

const userRegister = async (req, res) => {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password : req.body.password,
      phonenum : req.body.phonenum
    });

    if(!newUser.username || !newUser.email || !newUser.password || !newUser.phonenum) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // //check for duplicate email
    // const duplicate = db.users.findOne({ email: newUser.email });
    // if(duplicate){
    //   return res.status(400).json({ message: 'Email already exists' });
    // }
    
    try{
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      await newUser.save()
      res.status(201).json({ result: newUser, message: "Registered Successful" });
    }catch(err)
    {
      res.json({ result: err, message: "Email Id already use" });
    }
}

const userSignIn = async (req, res) => {
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
                       //console.log(user._id);
                       console.log(user?.role);
                       const role = user?.role;
                      
                       res.json({ auth: true, token: token, result: user, roles: role, message: "Login Successful" });   //user is autheraized therefore creating token
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
}

const userSignOut = async (req, res) => {
    res.json({ auth: false, token: null, message: "Logout Successful" });
}


module.exports = {userRegister,userSignIn};