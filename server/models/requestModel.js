const mongoose = require("mongoose");
//const nanoid = require("nanoid");

const RequestSchema = mongoose.Schema({
  request_id: {
    type: String,
    unique: true,
    required: true,
  },
  bldGrpRequired: {
    type: String,
  },
  amount_Required: {
    type: Number,
  },
  amount_Remaining: {
    type: Number,
  },
  startDate_Of_Request: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  endDate_of_Request: {
    type: Date,
    required: true,
  },
  endTime: {
    type: String,
  },
  donationType: {
    type: String,
    enum: ["Whole_blood", "Single_donor_plasma", "Granulocytes"],
  },
  emergencyLevel: {
    type: String,
    enum: ["donation", "drive", "casualty"],
  },
  title: {
    type: String,
    default: "Blood Donation Drive",
  },
  noOfInterestedDonors: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  locUrl: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
