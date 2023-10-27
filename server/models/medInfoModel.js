
const mongoose = require("mongoose");

const MedInfoSchema = mongoose.Schema({
  donor_id: {
    type: String,
    required: true,
    unique: true
  },
  bldgrp: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18, max: 65,
    required: true
  },
  sex: {
    type: String,
    enum: ['Male','Female','Other'],
    required: true
  },
  // lastDonationDate: {
  //   type: Date,
  //   required: true
  // },
  // medicalConditions: {
  //   type: [String],
  //   required: true
  // },
});


module.exports = mongoose.model("medinfo", MedInfoSchema);

