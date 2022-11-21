const dotenv = require('dotenv')
dotenv.config()
const twilio = require('twilio')
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const sendWhatsapp = async (body, from, to) => {
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
const from = "+17439014164"
const to = "+541148889851"


sendWhatsapp(body, from, to)