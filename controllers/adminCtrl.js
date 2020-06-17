const bcrypt = require('bcryptjs')

const {mongoInit} = require('../utils/mongoInit');


exports.getAdmin = (req,res,next) => {
  res.render('admin/index.ejs', {
    title: 'Admin Page'
  })
}

exports.signupAdmin = async (req, res, next) => {
  const reqBody = req.body;

  const name = reqBody.name;
  const email = reqBody.email;
  const password = reqBody.password;

  const hashedPass = await bcrypt.hash(password, 10);

  const mongoClientDB = (await mongoInit()).db(process.env.DB_NAME)

  await mongoClientDB.collection("admins").insertOne({
    name,
    email,
    password: hashedPass
  })

  res.render('admin/productAdmin.ejs', {title: "Product admin"})
}