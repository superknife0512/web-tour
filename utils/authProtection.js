
exports.authProtector = (req,res,next) => {
  if (!req.session.user) {
    console.log('This user is not authenticated');
    return res.redirect('/admin')
  } 

  next()
}