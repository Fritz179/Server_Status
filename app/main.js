const sendEmail = require('./setup/sendEmail');

const message = {
    from: {
      name: 'Server down!',
      address: process.env.USERNAME
    },
    to: process.env.TO,
    subject: `${process.env.SERVER || 'Server'} has a problem!!`,
    text: 'TEST',
    priority: 'high'
}

sendMail(message, (err, info) => {
    console.assert(!err, err)

    if (!err) {
      console.log('Message sent!');
    }
});
