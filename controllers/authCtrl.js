const bcrypt = require('bcryptjs')

const Admin = require('../models/admin.model');
const { uniqueString } = require('../utils/uniqueNumber');
const { db } = require('../models/admin.model');

const {transporter, mailOptions} = require('../utils/mailSender')

async function sendingEmail(content, receiver) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions(content, receiver), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(null)
      }
    })
  })
}

exports.signupAdmin = async (req, res, next) => {
  const reqBody = req.body;

  const name = reqBody.name;
  const email = reqBody.email;
  const password = reqBody.password;
  const role = reqBody.role;

  const hashedPass = await bcrypt.hash(password, 10);
  const existedOne = await Admin.findOne({email});
  console.log(existedOne);

  if (existedOne) {
    return res.render('admin/index', {
      title: 'Admin Page',
      warning: 'This account has been existed'
    })
  }
  const doc = new Admin({
    name,
    email,
    role,
    password: hashedPass
  })
  await doc.save();
  res.redirect('/admin')
}

exports.signinAdmin = async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  const existedOne = await Admin.findOne({email});
  if (!existedOne) {
    return res.redirect('/admin')
  }
  if (!bcrypt.compareSync(password, existedOne.password)) {
    return res.redirect('/admin')
  }
  req.session.user = existedOne
  await req.session.save();
  res.redirect('/admin/product');
}

exports.logout = async (req,res,next) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error: ' + err);
      next(err)
    } else {
      res.redirect('/admin');
    }
  })
}

exports.getReset = async (req,res,next) => {
  res.render('admin/reset', {
    title: 'Reset password',
  })
}

exports.postReset = async (req,res,next) => {
  const email = req.params.email
  const dbUser = await Admin.findOne({email})
  if (!dbUser) {
    return res.status(203).json({error: 'Please enter a valid email'})
  }
  const resetCode = uniqueString(8);
  const error = await sendingEmail(
    `<h2 style="background-color: #199acc; color: white; padding: 1.5rem">
      ${resetCode}
    </h2>`,
    email
  )
  if (error) {
    return next(error)
  }
  dbUser.resetCode = resetCode;
  dbUser.expire = new Date(Date.now() + 3600 * 1000) 
  await dbUser.save();
  res.status(200).json({msg: 'Done'});
}

exports.checkResetCode = async (req,res,next) => {
  const body = req.body 
  const existedOne = await Admin.findOne({
    email: body.email,
    resetCode: body.resetCode
  })
  if (!existedOne) {
    return res.status(203).json({msg: 'Invalid Code or Email'})
  }
  const curDate = new Date();
  if (curDate > existedOne.expire) {
    return res.status(203).json({msg: 'This code has been expired'})
  }
  res.status(200).json({
    msg: 'DONE'
  })
}

exports.updatePassword = async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;

  const existedData = await Admin.findOne({email});
  const hashedPass = await bcrypt.hash(password, 10);

  existedData.password = hashedPass
  existedData.resetCode = undefined;
  existedData.expire = undefined;

  await existedData.save();

  res.status(200).json()
}