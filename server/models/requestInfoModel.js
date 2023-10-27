const mongoose = require("mongoose");

const RequestInfoSchema = mongoose.Schema({
    request_id: {
        type: String,
        required: true,
        unique: true,
    },
    startDate_Of_Request: {
        type: Date,
        default: Date.now(),
        required: true
    },
    endDate_of_Request: {
        type: Date,
        required: true
    },
    donationType: {
        type: String,
        enum: ['Whole blood', 'Single donor plasma', 'Granulocytes'],
        required: true
    },
    emergencyLevel: {
        type: String,
        enum: ['Mass Casualty','Immediate','Normal Drive'],
        required: true
    },
    // location: {
    //     type: String,
    //     required: true,
    // },
});


module.exports = mongoose.model("RequestInfo", RequestInfoSchema);