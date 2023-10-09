
const mongoose = require("mongoose");

const DonationHistoryModel = mongoose.Schema({
    bldGrpRequired: {
        type: String,
        required: true,
    },
    startTime: Date,
    endTime: Date,
    typeOfRequest: {
        type: ['Mass Casualty','Immediate','Not immediate'],
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model("medinfo", DonationHistoryModel);

//can also do timestamps:true

