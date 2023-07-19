const dotenv = require('dotenv')
dotenv.config()
const {port, serverMode} = require('./args.js')


// Base de datos
const DB_TYPE = process.env.DB_TYPE

// MongoDB
const MONGODB_URISTRING = process.env.MONGODB_URISTRING
const MONGODB_DATABASE_USER = process.env.MONGODB_DATABASE_USER
const MONGODB_DATABASE_PASSWORD = process.env.MONGODB_DATABASE_PASSWORD
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME

// nodemailer - gmail user
const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

//twilio
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM
const TWILIO_SMS_FROM = process.env.TWILIO_SMS_FROM

// datos de admin
const ADMIN_TELEPHONE = process.env.ADMIN_TELEPHONE
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

// Otros
const ADMIN = process.env.ADMIN

const PORT = port || process.env.PORT || 8080
const SERVER_MODE = serverMode === 'CLUSTER' 
    ? 'CLUSTER' 
    : (process.env.SERVER_MODE || 'FORK')
const NODE_ENV = process.env.NODE_ENV || 'dev'

module.exports = {
    DB_TYPE,
    MONGODB_URISTRING, 
    MONGODB_DATABASE_NAME, 
    MONGODB_DATABASE_USER,
    MONGODB_DATABASE_PASSWORD,
    MY_EMAIL_ADDRESS,
    GMAIL_PASSWORD,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_WHATSAPP_FROM,
    TWILIO_SMS_FROM,
    ADMIN_TELEPHONE,
    ADMIN_EMAIL,
    ADMIN, 
    PORT, 
    SERVER_MODE, 
    NODE_ENV
}