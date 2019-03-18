var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
var auth = require('./auth');
var template = require('./mail.template');

var defaults = {
  from: template.from,
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

const send = (bcc, callback) => {
  // console.log(`send to ${to}`)
  // return;
  try {
    transporter.sendMail({ bcc }, (err, info) => {
      callback()

      if (err) {
        console.log(err)
        wstream.write(`${bcc} error \n`, (err) => {
          if (err)
            console.log(err)
        })
      } else {
        wstream.write(`${bcc} \n`, (err) => {
          if (err)
            console.log(err)
          else
            console.log(`write ${bcc}`)
        })
        console.log(info)
      }
    });
  } catch (error) {
    console.log(error);
  }
}

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

// 錯誤已寄
var wstream = fs.createWriteStream('./error_sended.txt', { flags: 'a' })

// 從 sended 取出除錯誤，寫至 error_to.txt
var instream = fs.createReadStream('./sended.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

const mails = []
var re = /\.$/;
rl.on('line', (line) => {
  if(line.indexOf(' error') != -1) {
    const splitted_mail = line.split(' ')[0]
    console.log(splitted_mail)
    if (re.test(splitted_mail))
      console.log(splitted_mail + '有點')
    mails.push(splitted_mail)
  }
});

rl.on('close', function () {
  console.log('close file')

  send(mails, () => {
    transporter.close()
  })
});
