const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Db } = require("mongodb");
const mongoose = require("mongoose");
const db = mongoose.connection;

const userRegister = async (req, res) => {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password : req.body.password,
      phonenum : req.body.phonenum,
      verified : req.body.verified,
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
      const foundUser = await User.findOne({
          email: req.body.email
        });
      
      if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, (error, response) => {  
          if (response) {
              const id = foundUser._id
              console.log(foundUser?.role);
              const role = foundUser?.role;

              // create JWTs
              const accessToken = jwt.sign(
                  { 
                    "UserInfo": {
                      "id": id,
                      "role": role
                    }
                  },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '10s' }
              );
              const refreshToken = jwt.sign(
                  { "id": id },
                  process.env.REFRESH_TOKEN_SECRET,
                  { expiresIn: '1d' }
              );

              // Saving refreshToken with current user
              foundUser.refreshToken = refreshToken;
              const result = foundUser.save();
              // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
              // const currentUser = { ...foundUser, refreshToken };
              // usersDB.setUsers([...otherUsers, currentUser]);
              // await fsPromises.writeFile(
              //     path.join(__dirname, '..', 'model', 'users.json'),
              //     JSON.stringify(usersDB.users)
              // );

              //sending refreshToken as a httpOnly cookie to frontend
              res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });  //secure: true for chrome
              
              //storing access token in memory
              res.json({ auth: true, token: accessToken, result: foundUser, roles: role, message: "Login Successful" });   //user is authorized therefore creating token
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
      res.status(500).send(err);
    }
}

const userSignOut = async (req, res) => {
    // On client, also delete the accessToken


    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies?.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({refreshToken}).exec();
    console.log('foundUser:');
    console.log(foundUser);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); //204 - No content
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    if (!result) return res.sendStatus(500); //500 - Internal Server Error
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

const getAllUsers = async (req,res) => {
    const id = 1;
}


module.exports = {userRegister,userSignIn,userSignOut};