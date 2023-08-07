// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");


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
  ]).toArray();
  console.log(result);
  res.send(result);

});

const client=require('twilio')(config.accountSID,config.authToken)
app.get('/login',(req,res)=>{
    client.verify.v2.services(config.serviceID).verifications.create({
        to:`+${req.query.phonenumber}`,
        channel:`${req.query.channel}`
    }).then((data)=>{
        res.status(200).send(data)
    })
})

app.get('/verify',(req,res)=>{
    client.verify.v2.services(config.serviceID).verificationChecks.create({
        to:`+${req.query.phonenumber}`,
        code:`${req.query.code}`
    }).then((data)=>{
        res.status(200).send(data)
    })
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