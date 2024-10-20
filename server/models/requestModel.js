const mongoose = require("mongoose");
const nanoid = require("nanoid");

const RequestSchema = mongoose.Schema({
  request_id: {
    type: String,
    default: nanoid(6),
    unique: true,
    required: true,
  },
  bldGrpRequired: {
    type: String,
    required: true,
  },
  amount_Required: {
    type: Number,
    required: true,
  },
  amount_Remaining: {
    type: Number,
    required: true,
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
    required: true,
  },
  emergencyLevel: {
    type: String,
    enum: ["Mass_Casualty", "Immediate", "Normal_Drive"],
    required: true,
  },
  noOfInterestedDonors: {
    type: Number,
    default: 0,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
