
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
    required: true
  },
  
});


module.exports = mongoose.model("medinfo", MedInfoSchema);

