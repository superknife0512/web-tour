const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminCtrl')

/* GET users listing. */
router.get('/', adminCtrl.getAdmin);
router.post('/signup', adminCtrl.signupAdmin);

module.exports = router;
