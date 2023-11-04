const MedInfo = require('../models/medInfoModel'); 
const User = require('../models/userModel'); 
const DonationHistory = require('../models/donationHistoryModel');


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Db } = require("mongodb");
const mongoose = require("mongoose");

const userRegister = async (req, res) => {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password : req.body.password,
      phonenum : req.body.phonenum,
      isVerified : req.body.verified,
    });

    if(!newUser.username || !newUser.email || !newUser.password || !newUser.phonenum) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    //check for duplicate email
    const duplicate = await User.findOne({ email: newUser.email }).exec();  //exec() returns a promise
    if(duplicate){
      return res.status(409).json({ message: 'Email already exists' });   //409 conflict
    }
    
    try{
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      await newUser.save();
      res.status(201).json({ result: newUser, message: "Registered Successful" });
    }catch(err)
    {
      res.json({ result: err, message: "Registration Failed" });
    }
}

const userSignIn = async (req, res) => {
    console.log(req.body);
    try{
      const foundUser = await User.findOne({
          email: req.body.email
        });
      
      if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, async (error, response) => {  
          if (response) {
              const donor_id = foundUser.donor_id;
              console.log(foundUser?.role);
              const role = foundUser?.role;

              // create JWTs
              const accessToken = jwt.sign(
                  { "UserInfo": { "donor_id": donor_id, "role": role } },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '10s' }
              );
              const refreshToken = jwt.sign(
                  { "donor_id": donor_id },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: '1d' }
              );

              // Saving refreshToken with current user
              foundUser.refreshToken = refreshToken;
              const result = await foundUser.save();

              //sending refreshToken as a httpOnly cookie to frontend
              res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });  //secure: true for chrome
              
              //storing access token in memory
              res.json({ auth: true, accessToken: accessToken, result: foundUser, role: role, message: "Login Successful" });   //user is authorized therefore creating token
          }
          else {
              res.json({ auth: false, message: "wrong username/password combination" });
          }
        })
        console.log("found");
        console.log(`User ${foundUser} logged in`);
      }
      else {
          res.status(403).json({ auth: false, message: "no user exists" });
      }
    }
    catch(err)
    {
      console.log(err);
      res.status(500).send(err); //Internal Server Error
    }
}

const userSignOut = async (req, res) => {
    // On client, also delete the accessToken
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.sendStatus(204); //No content
    // const refreshToken = cookies?.jwt;

    // // Is refreshToken in db?
    // const foundUser = await User.findOne({refreshToken}).exec();
    // if (!foundUser) {
    //     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    //     return res.sendStatus(204); //204 - No content
    // }

    // // Delete refreshToken in db
    // foundUser.refreshToken = '';
    // const result = await foundUser.save();
    // if (!result) return res.sendStatus(500); //500 - Internal Server Error

    // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    // res.sendStatus(204);

    try {
      // Check if the refreshToken exists in the cookies
      const refreshToken = req.cookies?.jwt;
      if (!refreshToken) {
        return res.sendStatus(204); // No content
      }
  
      // Find the user with the provided refreshToken
      const foundUser = await User.findOne({ refreshToken }).exec();
  
      if (foundUser) {
        // Clear the refreshToken in the user's document
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        if (!result) {
          return res.sendStatus(500); // Internal Server Error
        }
      }
  
      // Clear the refreshToken cookie
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  
      res.sendStatus(204); // No content
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Sign-out failed' });
    }
}


const getDetailsOfUser = async (req, res) => {
  const userId = req.params.id;
  console.log("Inside getDetailsOfUser");

  try {
    const donorData = await User.aggregate([
      {
        $match: { donor_id: userId }
      },
      {
        $lookup: {
          from: 'medinfos',
          localField: 'donor_id',
          foreignField: 'donor_id',
          as: 'medInfo'
        }
      },
      {
        $unwind: '$medInfo'
      },
      {
        $project: {
          _id: 0, 
          donor_id: 1,
          username: 1,
          email: 1,
          phonenum: 1,
          createdAt: 1,
          isVerified: 1,
          role: 1,
          refreshToken: 1,
          'medInfo.bldgrp': 1,
          'medInfo.age': 1,
          'medInfo.sex': 1,
          'medInfo.lastDonationDate':1,
          'medInfo.totalAmountDonated':1,
        }
      }
    ]);

    if (donorData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(donorData[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching donor data.' });
  }
};

const getAllDonationsofUser = async (req, res) => {
  const userId = req.params.id;
  console.log("Inside getAllDonationsofUser");

  try {
    const donorDonationData = await DonationHistory.find({ donor_id: userId });
    
    res.json(donorDonationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching donor data.' });
  }
};

const getTotalBloodDonatedByUser = async (req, res) => {
  const userId = req.params.id;
  console.log('Inside getTotalBloodDonatedByUser');

  try {
    const totalDonatedBlood = await DonationHistory.aggregate([
      {
        $match: { donor_id: userId }, // Match rows with the specified donor_id
      },
      {
        $group: {
          _id: null, // Group all matched rows
          totalAmountDonated: { $sum: '$amount_Donated' }, // Calculate the sum of amount_Donated
        },
      },
    ]);

    if (totalDonatedBlood.length > 0) {
      res.json({ totalAmountDonated: totalDonatedBlood[0].totalAmountDonated });
    } else {
      res.json({ totalAmountDonated: 0 }); // No matching records, so the total is 0
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating total donated blood.' });
  }
};


module.exports = {userRegister,userSignIn,userSignOut,getDetailsOfUser,getAllDonationsofUser,getTotalBloodDonatedByUser};