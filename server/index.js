// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConn.js");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 3031;

//connect to MongoDB
connectDB();

// custom middleware logger
//app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing(This policy prevents a website from making requests to a different domain, subdomain, or port, which could be a potential security risk)
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public"))); //?

//add build file of frontend
//app.use(express.static(path.join(__dirname,'../client','build'))

//app.use(verifyJWT); //after this all routes will be verified ?

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes.js"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/refresh", require("./routes/refresh"));
app.use("/otp", require("./routes/otpRoutes.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler); //middleware for errors

mongoose.connection.on("error", (err) => {
  //db connection
  console.log(err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
