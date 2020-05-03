require('dotenv').config();

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: process.env.USERNAME,
       pass: process.env.PASSWORD
    }
});

module.exports = transport.sendMail
