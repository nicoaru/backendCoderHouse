const twilio = require('twilio')
const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP_FROM,
    TWILIO_SMS_FROM
} = require('../config/config.js')
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const sendSMS = (body, to) => {
    return twilioClient.messages.create({
        body,
        TWILIO_SMS_FROM,
        to
    })
}


const sendWhatsapp = (body, from, to) => {
    return twilioClient.messages.create({
        body,
        from: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:${to}`
    })
}


module.exports = {
    sendSMS,
    sendWhatsapp
}