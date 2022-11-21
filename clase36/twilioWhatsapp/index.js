const dotenv = require('dotenv')
dotenv.config()
const twilio = require('twilio')
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const sendMessage = async (body, from, to) => {
    try {
        const message = await twilioClient.messages.create({
            body, 
            from, 
            to
        })
        console.log("message ",message)        
    }
    catch(err) {
        console.log("error ", err)
    }

}

const body = "Probando Twilio. Te llegó?"
const from = "whatsapp:+14155238886"
const to = "whatsapp:+5491148889851"


sendMessage(body, from, to)