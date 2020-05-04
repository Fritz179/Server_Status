const sendMail = require('./setup/sendMail.js');
const crawlFolder = require('./setup/crawlFolder.js');
const fetch = require('node-fetch');

const fs = require('fs');
const {join} = require('path')

function check(dir, dirPath) {
  dir = dir.replace('noname', '')

  fetch(`https://${process.env.SERVER}/${dir}`)
    .then(res => res.text())
    // .then(body => fs.writeFile(join(__dirname, './routes/.html'), body, (err) => console.assert(!err, err)));
    .then(body => {
      fs.readFile(dirPath, 'utf8', (err, compareTo) => {
        if (norm(body) != norm(compareTo)) {
          console.log(body.slice(15, 16).charCodeAt(0) , compareTo.slice(15, 16).charCodeAt(0));
          console.log(`Error, ${dir} ,sending email!`);

          const message = {
              from: {
                name: `${process.env.SERVER || 'Server'} is down!`,
                address: process.env.USERNAME
              },
              to: process.env.TO,
              subject: `${dir} has a problem!!`,
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
          console.log(`passed: ${dir}`);
        }
      })
    });

  function norm(str) {
    return str.split('').map(c => [10, 13, 32].includes(c.charCodeAt(0)) ? '' : c).join('')
  }
}

crawlFolder(join(__dirname, 'routes'), check)
