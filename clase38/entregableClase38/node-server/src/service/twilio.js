const twilio = require('twilio')
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const sendSMS = (body, from, to) => {
    return twilioClient.messages.create({
        body,
        from,
        to
    })
}


const sendWhatsapp = (body, from, to) => {
    return twilioClient.messages.create({
        body,
        from: `whatsapp:${from}`,
        to: `whatsapp:${to}`
    })
}


module.exports = {
    sendSMS,
    sendWhatsapp
}