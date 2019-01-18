var nodemailer = require('nodemailer');

var defaults = {
  from: 'gmail',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
}

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'gmail',
    pass: 'pass'
  }
}, defaults);

const send = (to) => {
  transporter.sendMail({to}, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./to.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

rl.on('line', function (line) {
  console.log(line)
  send(line)
});

rl.on('close', function () {
  console.log('close')
});