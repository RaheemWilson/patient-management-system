const nodemailer = require('nodemailer')
require('dotenv').config()

exports.transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD
    }
});