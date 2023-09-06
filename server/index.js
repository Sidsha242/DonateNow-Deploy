// index.js
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const config = require("./config");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");

const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');

const { accountSID, authToken } = require('./config');
const client = require('twilio')(accountSID,authToken);

const PORT = 3031;


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
app.use('/', express.static(path.join(__dirname, '/public')));


const dbUrl = config.dbUrl;
mongoose.connect(dbUrl,{
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});


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


//routes
app.use('/user', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));


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


app.listen(PORT, function () {
  console.log("Runnning on " + PORT);
});

module.exports = app;