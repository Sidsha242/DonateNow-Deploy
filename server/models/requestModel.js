
const mongoose = require("mongoose");
const nanoid = require("nanoid");

const RequestSchema = mongoose.Schema({
    request_id: {
        type: String,
        default: nanoid(6),
        unique: true,
        required: true
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
    isDone: {
        type: Boolean,
        required: true
    },
});


module.exports = mongoose.model("Request", RequestSchema);

//can also do timestamps:true

