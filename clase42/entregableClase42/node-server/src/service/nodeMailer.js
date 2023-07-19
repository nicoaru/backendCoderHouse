require("dotenv").config();
const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;


const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: MY_EMAIL_ADDRESS,
        pass: GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});



async function sendMail(subject, htmlBody, to) {
    const mailOptions = {
        to: to,
        from: MY_EMAIL_ADDRESS,
        subject: subject,
        html: htmlBody
    }
    
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("info ", info);
        return info
    } catch (err) {
        console.log("error ", err);
        return err
    }
}

module.exports = {sendMail}

