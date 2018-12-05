const formidable = require('formidable');
const nodemailer = require('nodemailer');
const db = require('../models/db');
const config = require('../config/config.json');

module.exports.getIndex = function(req, res) {
  const { products, skills } = db.getState() || [];

  res.render('pages/index', { products: products, skills: skills });
};

module.exports.sendEmail = function(req, res, next) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, body) => {
    const { name, email, message } = body;
    if (err) {
      return next(err);
    }

    if (!name || !email || !message) {
      req.flash('msgsemail', 'Поля не должны быть пустыми');
      res.redirect('/');
    }

    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: config.mail.smtp.auth.user,
      subject: config.mail.subject,
      name: message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        req.flash('msgsemail', 'При отправке письма произошла ошибка!');
      } else {
        req.flash('msgsemail', 'Письмо успешно отправлено!');
      }
      res.redirect('/');
    });
  });
};
