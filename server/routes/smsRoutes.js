const { accountSID, authToken } = require('../config');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const client = require('twilio')(accountSID,authToken);


router.get("/sendMsg", async (req,res) => {
   


    // client.messages.create({
    //     to: '+918484874138',
    //     from: '+19382536013',
    //     body: 'Hi from DonateNow'
    // })
    // .then((message) => console.log('message sent'))

})

module.exports = router;