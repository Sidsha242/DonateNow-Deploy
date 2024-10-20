const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userRegister = async (req, res) => {
  var newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phonenum: req.body.phonenum,
    bldgrp: req.body.bldgrp,
    sex: req.body.sex,
    dob: req.body.dob,
  });

  if (
    !newUser.firstName ||
    !newUser.lastName ||
    !newUser.email ||
    !newUser.password ||
    !newUser.phonenum
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const duplicate = await User.findOne({ email: newUser.email });
  if (duplicate) {
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    await newUser.save();
    res.status(201).json({ result: newUser, message: "Registered Successful" });
  } catch (err) {
    console.log(err);
    res.json({ result: err, message: "Registration Failed" });
  }
};

const userSignIn = async (req, res) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });

    if (foundUser) {
      bcrypt.compare(
        req.body.password,
        foundUser.password,
        async (error, response) => {
          if (response) {
            const donor_id = foundUser.donor_id;
            const role = foundUser?.role;

            const accessToken = jwt.sign(
              //method to create new JWT
              { UserInfo: { donor_id: donor_id, role: role } }, //The data you want to include in the JWT.
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "10s" } //to stop misuse
            );
            const refreshToken = jwt.sign(
              { donor_id: donor_id },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "1d" }
            );

            foundUser.refreshToken = refreshToken; //save refresh token in db
            const result = await foundUser.save();

            res.cookie("jwt", refreshToken, {
              //express function to create cookie named jwt and store refreshToken as value
              //refressh token stored into http only cookie ..nobody can access
              httpOnly: true, //blocked form JavaScript
              sameSite: "None",
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            }); //secure: true for chrome

            res.json({
              auth: true,
              accessToken: accessToken, //send access token client side
              result: foundUser,
              role: role,
              message: "Login Successful",
            });
          } else {
            res.json({
              auth: false,
              message: "wrong username/password combination",
            });
          }
        }
      );
    } else {
      res.status(403).json({ auth: false, message: "no user exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const userSignOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const foundUser = await User.findOne({ refreshToken }).exec();

    if (foundUser) {
      foundUser.refreshToken = ""; //on signout make refresh token null
      const result = await foundUser.save();
      if (!result) {
        return res.sendStatus(500);
      }
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign-out failed" });
  }
};

module.exports = {
  userRegister,
  userSignIn,
  userSignOut,
};
