var nodemailer = require('nodemailer');
var auth = require('./auth');
var template = require('./mail.template');

var defaults = {
  from: 'gmail',
  subject: template.subject,
  html: template.html
}

var transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: auth.user,
    pass: auth.pass
  }
}, defaults);

const send = async (to) => {
  console.log(`send to ${to}`)
  await transporter.sendMail({to}, (err, info) => {
    if(!err)
      console.log(i++);
      if (i == 11 ) {
        transporter.close();
      }
    
  });
}

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./to.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

let i = 1;
let timeout = 5000;
rl.on('line', (line) => {
  console.log(line)
  setTimeout(() => {
    send(line)  
  }, timeout);
  timeout += 5000;
});

rl.on('close', function () {
  console.log('close file')
});
