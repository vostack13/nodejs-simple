const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlAdmin = require('../controllers/admin');
const ctrLogin = require('../controllers/login');

router.get('/', ctrlHome.getIndex);
router.post('/', ctrlHome.sendEmail);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/upload', ctrlAdmin.uploadProducts);
router.post('/admin/skills', ctrlAdmin.setSkills);

router.get('/login', ctrLogin.getLogin);
router.post('/login', ctrLogin.auth);

module.exports = router;
