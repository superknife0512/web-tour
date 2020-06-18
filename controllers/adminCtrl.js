
exports.getAdmin = (req,res,next) => {
  res.render('admin/index.ejs', {
    title: 'Admin Page',
    warning: null,
  })
}

exports.getProductPage = (req,res,next) => {
  res.render('admin/productAdmin.ejs', {
    title: 'Product Page',
  })
}