// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const { accountSID, authToken } = require('./config');
const client = require('twilio')(accountSID,authToken);

const port = 3031;
const config = require("./config");

const dbUrl = config.dbUrl;

mongoose.connect(dbUrl,{
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.get("/admin/admininfo", async(req, res) => {
  const result = await db.collection('users').aggregate([
    {
      $lookup: {
        from: 'medinfos',
        localField: 'email',
        foreignField: 'email',
        as: 'usersdetails'
      }
    }
  ]).toArray()
  res.send(result);

});

app.post("/sendMsg", async (req,res) => {

  const BloodGroup = req.body.bldgrp;
  const txtMsg = req.body.smsText;
  console.log(txtMsg);
  console.log(`Blood Group:${BloodGroup}`);
   
  const result = await db.collection('users').aggregate([
      {
        $lookup: {
          from: 'medinfos',
          localField: 'email',
          foreignField: 'email',
          as: 'usersdetails'
        }
      }
    ]).toArray();

   let filteredUsers = [];
   for (let i= 0; i<result.length; i++) 
   {
       if(result[i].usersdetails[0].bldgrp == BloodGroup) 
       {
           filteredUsers = [...filteredUsers, result[i]];
       }
   }

  var phoneNum_arr = [];
  for(let j=0;j<filteredUsers.length;j++)
  {
       console.log('Filtered Users:');
       console.log(filteredUsers[j]);
       phoneNum_arr[j] = filteredUsers[j].phonenum
  }


// for(let k =0 ; k<filteredUsers.length;k++)
// {
//     client.messages.create({

//         to: '+' + phoneNum_arr[k],
//       from: '+19382536013',
//         body: txtMsg

//     })
//     .then((message) => console.log('message sent'))
// }
})


const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
 });


app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;