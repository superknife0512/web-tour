const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_SENDER_PASSWORD
  }
});

const mailOptions = (content, receiver) => {
  return {
    from: process.env.MAIL_SENDER,
    to: receiver,
    subject: 'Reset code',
    html: content,
  }
};

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

exports.mailOptions = mailOptions
exports.transporter = transporter