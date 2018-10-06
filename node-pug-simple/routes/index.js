var express = require('express');
var router = express.Router();

const ctrlHome = require('../controllers/home');
const ctrlAuth = require('../controllers/login');
const ctrlBlog = require('../controllers/blog');
const ctrlAdmin = require('../controllers/admin');

/* GET home page. */
router.get('/', ctrlHome.getHomePage);
router.post('/contact', ctrlHome.sendEmail);

router.get('/login', ctrlAuth.getLoginPage);

router.get('/blog', ctrlBlog.getBlogPage);

router.get('/admin', ctrlAdmin.getAdminPage);

module.exports = router;
