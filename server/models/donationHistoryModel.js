
const mongoose = require("mongoose");

const DonationHistoryModel = mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    bldAmount: {
        type: Number,
        required: true,
    },
    dateOfDonation: {
        type: Date,
        default: Date.now(),
        required: true
    },
    donationType: {
        type: ['plasma','platelets','red_cells','whole_blood'],
        required: true
    },
});


module.exports = mongoose.model("medinfo", DonationHistoryModel);

