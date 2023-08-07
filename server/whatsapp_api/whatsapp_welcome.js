var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
const { sendMessage, getTextMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

var objJSON = require('./data.json');

router.post('/', function (req, res, next) {

    objJSON.forEach((person, i) => {
        console.log(person);


        var data = getTextMessageInput(person.phone_num, person.nam); // for text -`Hey ${person.nam} your interview is scheduled at ${person.date}th ${person.time} .Please use a computer to join in`

        sendMessage(data)
            .then(function (response) {
                //response.sendStatus(200);
                return;
            })
            .catch(function (error) {
                console.log(error);
                //res.sendStatus(500);
                return;
            });
    });
    res.redirect('/');
});

module.exports = router;