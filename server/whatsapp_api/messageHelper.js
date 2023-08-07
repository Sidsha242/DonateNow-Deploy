var axios = require('axios');
const { signedCookie } = require('cookie-parser');

function sendMessage(data) {
    var config = {
        method: 'post',
        url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
        headers: {
            'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config)
}




function getTextMessageInput(recipient, text) {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": recipient,
        "type": "template",
        "template": {
            // "namespace": "8435cd01_d28c_461e_81ce_7149cf8cfc69",
            "name": "iecse_button_temp",
            "language": {
                "code": "en",
                "policy": "deterministic",
            },

            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": text,
                        },
                        {
                            "type": "text",
                            "text": "16-02-23"
                        },
                        {
                            "type": "text",
                            "text": "7:00p.m"
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "quick_reply",
                    "index": 0,
                    "parameters": [
                        {
                            "type": "payload",
                            "payload": "Yes-Button-Payload"
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "quick_reply",
                    "index": 1,
                    "parameters": [
                        {
                            "type": "payload",
                            "payload": "No-Button-Payload"
                        }
                    ]
                }
            ]
        }

        // "text": {
        //     "body": text
        // }
    }
    );
}

module.exports = {
    sendMessage: sendMessage,
    getTextMessageInput: getTextMessageInput
};