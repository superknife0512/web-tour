const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl')
const authCtrl = require('../controllers/authCtrl')

/* GET users listing. */
router.post('/signin', authCtrl.signinAdmin);
router.post('/signup', authCtrl.signupAdmin);
router.get('/', adminCtrl.getAdmin);
router.get('/product', adminCtrl.getProductPage)

module.exports = router;
