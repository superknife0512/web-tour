const express = require('express');
const multer = require('multer')

const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl')
const authCtrl = require('../controllers/authCtrl')
const {authProtector} = require('../utils/authProtection')
const {adminProtector} = require('../utils/adminProtector')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './userUpload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})
 
const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/signin', authCtrl.signinAdmin);
router.post('/signup', authProtector, adminProtector, authCtrl.signupAdmin);
router.post('/logout', authCtrl.logout);
router.post('/reset/:email', authCtrl.postReset)
router.post('/check-code', authCtrl.checkResetCode)
router.post('/updatePassword', authCtrl.updatePassword)

router.post('/newTour', authProtector, upload.single('img'), adminCtrl.postCreateTour)
router.post('/editTour/:id', authProtector, upload.single('img'), adminCtrl.postEditTour)
router.post('/deleteTour/:id', authProtector, adminProtector, adminCtrl.postDeleteTour)

router.get('/', adminCtrl.getAdmin);
router.get('/reset', authCtrl.getReset)
router.get('/product', authProtector ,adminCtrl.getProductPage)
router.get('/newTour', authProtector , adminProtector, adminCtrl.getCreateTour)
router.get('/editTour/:id', authProtector , adminProtector, adminCtrl.getEditTour)

module.exports = router;
