require("dotenv").config();
const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

const adminEmail = "arunico@gmail.com"

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

const mailOptions = {
  to: adminEmail,
  from: MY_EMAIL_ADDRESS,
  subject: "Correo de prueba con archivos adjuntos",
  html: "<h1>Bienvenido a Nodemailer con gmail</h1><br><p>Este es el tercer mensaje</p>",
  attachments: [
    {path: "./src/bosque.jpg"}
  ]
}

async function sendMail(subject, htmlBody) {
    const mailOptions = {
        to: adminEmail,
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

