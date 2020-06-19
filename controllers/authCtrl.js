const bcrypt = require('bcryptjs')

const adminModel = require('../models/admin.model')

exports.signupAdmin = async (req, res, next) => {
  const reqBody = req.body;

  const name = reqBody.name;
  const email = reqBody.email;
  const password = reqBody.password;

  const hashedPass = await bcrypt.hash(password, 10);
  const existedOne = await adminModel.findOne({email});
  console.log(existedOne);

  if (existedOne) {
    return res.render('admin/index', {
      title: 'Admin Page',
      warning: 'This account has been existed'
    })
  }
  const doc = new adminModel({
    name,
    email,
    password: hashedPass
  })
  await doc.save();
  res.redirect('/admin')
}

exports.signinAdmin = async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;
  const existedOne = await adminModel.findOne({email});
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