const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlAbout = require('../controllers/about');
const ctrlContact = require('../controllers/contact');

router.get('/', ctrlHome.getIndex);
router.post('/set', ctrlHome.setCookie);
router.post('/clear', ctrlHome.clearCookie);

router.get('/about', ctrlAbout.getAbout);
router.get('/contact', ctrlContact.getContact);

module.exports = router;
