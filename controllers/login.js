const formidable = require('formidable');
const db = require('../models/db');
const psw = require('../libs/password');

module.exports.getLogin = function(req, res) {
  if (req.session.isAdmin) {
    res.redirect('/admin');
  }
  res.render('pages/login');
};

module.exports.auth = function(req, res, next) {
  const form = new formidable.IncomingForm();
  const user = db.getState().user;

  form.parse(req, (err, body) => {
    const { email, password } = body;
    if (err) {
      return next(err);
    }

    if (user.email === email && psw.validPassword(password)) {
      req.session.isAdmin = true;
      res.redirect('/admin');
    } else {
      req.flash(
        'msgslogin',
        'Неверный email или пароль. Введите корректные данные'
      );
      res.redirect('/login');
    }
  });
};
