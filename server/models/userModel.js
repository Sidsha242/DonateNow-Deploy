
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phonenum: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 2001
  },
  refreshToken: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model("User", UserSchema);

