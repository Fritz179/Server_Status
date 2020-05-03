require('dotenv').config();

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
       user: process.env.USER,
       pass: process.env.PW
    }
});

const message = {
    from: process.env.USER,
    to: process.env.TO,
    subject: 'TEST',
    text: 'TEST TEXT'
};

console.log(message);
transport.sendMail(message, (err, info) => {
    console.assert(!err, err)
    console.log(info);
});
