const sendMail = require('./setup/sendMail');
const fetch = require('node-fetch');

const fs = require('fs');
const {join} = require('path')
const compareTo = fs.readFileSync(join(__dirname, './routes/.html'), 'utf8');

fetch(`https://${process.env.SERVER}/`)
  .then(res => res.text())
  // .then(body => fs.writeFile(join(__dirname, './routes/.html'), body, (err) => console.assert(!err, err)));
  .then(body => {
    if (norm(body) != norm(compareTo)) {
      console.log('Error, sending email!');

      const message = {
          from: {
            name: 'Server down!',
            address: process.env.USERNAME
          },
          to: process.env.TO,
          subject: `${process.env.SERVER || 'Server'} has a problem!!`,
          text: 'Response',
          html: body,
          priority: 'high'
      }

      sendMail(message, (err, info) => {
          console.assert(!err, err)

          if (!err) {
            console.log('Message sent!');
          }
      });
    } else {
      console.log('test passed!');
    }
  });

function norm(str) {
  return str.split('').map(c => c.charCodeAt(0) != 10 && c.charCodeAt(0) != 32 ? c : '').join('')
}
