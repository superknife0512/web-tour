
exports.getHome = (req,res,next) => {
    res.render('index', { title: 'The Asian Tour' });
}