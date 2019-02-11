var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var auth = require('./auth');
var template = require('./mail.template');

var defaults = {
  from: auth.user,
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

const send = (to) => {
  // console.log(`send to ${to}`)
  // return;
  transporter.sendMail({to}, (err, info) => {
    if(!err)
      console.log(info)
    else
      console.log(err)
  });
}

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./to.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

let timeout = 0;
// rl.on('line', (line) => {
//   console.log(`mail to ${line} in ${timeout} milliseconds`)
//   setTimeout(() => {
//     send(line)
//   }, timeout);
//   timeout += 60000;
// });

/* test here */
// for (let index = 0; index < 60000; index++) {
//   console.log(index)
//   setTimeout(() => {
//     // send(line)  
//     console.log(`send ${index}`)
//   }, timeout);
//   timeout += 60000;
// }

/** schedule test */
const mails = []
rl.on('line', (line) => {
  console.log(line)
  mails.push(line)
});

rl.on('close', function () {
  console.log('close file')

  var j = schedule.scheduleJob('* * * * *', function () {
    if(mails.length > 0)
      send(mails.pop())
    else
      j.cancel()
  });

});
