const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/indexCtrl')
/* GET home page. */
router.get('/', indexCtrl.getHome);
router.get('/about', indexCtrl.getAbout);
router.get('/tours', indexCtrl.getTours);
router.get('/booking', indexCtrl.getBooking);

module.exports = router;
