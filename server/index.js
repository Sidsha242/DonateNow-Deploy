// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const config = require("./config.js");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const connectDB = require('./config/dbConn.js');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');

const { accountSID, authToken } = require('./config.js');
const client = require('twilio')(accountSID,authToken);

const PORT = 3031;

//connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public'))); //?



//routes
app.use('/user', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/refresh', require('./routes/refresh'));

// const multer = require("multer");  //?
// const uniqid = require('uniqid');  //?
// const storage = multer.memoryStorage() //?
// const upload = multer({storage: storage}) //?
// const AWS = require('aws-sdk');  //?

// const bucket = "donatenowbucket" //?

// const s3 = new AWS.S3({
//   region: 'us-east-1',
//   credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY ,
//       secretAccessKey: process.env.AWS_SECRET_KEY ,
//   }
// });

// app.post('/user/upload', upload.single('file'), async (req, res) => {
//   const file = req.file;

//   const ext = req.file.originalname.split('.').slice(-1)[0];
//   const newFileName = uniqid() + '.' + ext;
 
//   const params = {
//     Bucket: bucket ,
//     Key: newFileName,
//     Body: file.buffer,
//     ContentType: file.mimetype
//   };

//   try {
//     await s3.upload(params).promise();
//     const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
//     res.json(link);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send("Error");
//   }
// });


//app.use(verifyJWT); after this all routes will be verified


//error pages and logs
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler);


mongoose.connection.on('error', err => {
  console.log(err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;