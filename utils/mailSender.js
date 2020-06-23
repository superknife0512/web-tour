const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'phanhuutoan.dev@outlook.com',
    pass: 'Yasuoganktem20gg'
  }
});

const mailOptions = (content, receiver) => {
  return {
    from: 'phanhuutoan.dev@outlook.com',
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