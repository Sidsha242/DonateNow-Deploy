const mongoose = require("mongoose");
const nanoid = require("nanoid");
const UserSchema = mongoose.Schema({
  donor_id: {
    type: String,
    default: nanoid(6),
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenum: {
    type: Number,
    required: true,
  },
  bldgrp: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  lastDonationDate: {
    type: Date,
    default: null, // Initialize to null
  },
  totalAmountDonated: {
    type: Number,
    default: 0, // Initialize to 0
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: Number,
    default: 2001,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", UserSchema);

//email id-

// email: {
//   type: String,
//   required: [true, 'Please add an email'],
//   unique: true,
//   match: [
//     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//     'Please add a valid email',
//   ],
// },

//add password min length

//env role
