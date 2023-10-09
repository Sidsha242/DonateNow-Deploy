
const mongoose = require("mongoose");

const MedInfoSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
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
  
});


module.exports = mongoose.model("medinfo", MedInfoSchema);

