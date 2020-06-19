const Tour = require('../models/tours.model')
const fs = require('fs');

function removeFile(filePath) {
  fs.unlinkSync(filePath)
}

exports.getAdmin = (req,res,next) => {
  res.render('admin/index.ejs', {
    title: 'Admin Page',
    warning: null,
  })
}

exports.getProductPage = async (req,res,next) => {
  const user = req.session.user
  const tours = await Tour.find();
  res.render('admin/productAdmin.ejs', {
    title: 'Product Page',
    user,
    tours
  })
}

exports.getCreateTour = async (req,res,next) => {
  const user = req.session.user


  res.render('admin/productAdminEdit.ejs', {
    title: 'Add new Tours',
    user,
    isEdit: false
  })
}

exports.getEditTour = async (req,res,next) => {
  const user = req.session.user

  const id = req.params.id;

  const tour = await Tour.findOne({_id: id});

  res.render('admin/productAdminEdit.ejs', {
    title: 'Edit Tours',
    user,
    isEdit: true,
    tour
  })
}

exports.postCreateTour = async (req,res,next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const discount = req.body.discount;
  const price = req.body.price;
  const people = req.body.people;
  const duration = req.body.duration;

  const fileInfo = req.file 

  const imgPath = fileInfo.path.replace(/\\/, '/');

  const tour = new Tour({
    title,
    desc,
    discount,
    price,
    people,
    duration,
    img: imgPath,    
  })
  await tour.save()
  return res.redirect('/admin/product')
}

exports.postEditTour = async (req,res,next) => {
  const id = req.params.id;

  const tour = await Tour.findOne({_id: id});

  const title = req.body.title;
  const desc = req.body.desc;
  const discount = req.body.discount;
  const price = req.body.price;
  const people = req.body.people;
  const duration = req.body.duration;
  let img = tour.img;

  const fileInfo = req.file;

  if (fileInfo) {
    img = fileInfo.path.replace(/\\/, '/');  
    removeFile(tour.img)  
  }
  await Tour.updateOne({_id: id}, {
    title,
    desc,
    discount,
    price,
    people,
    duration,
    img
  })
  return res.redirect('/admin/product')
}