const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');

module.exports.getAdmin = function(req, res) {
  if (!req.session.isAdmin) {
    res.redirect('/login');
  }

  res.render('pages/admin', {
    msgskill: '',
    msgfile: ''
  });
};

module.exports.uploadProducts = function(req, res, next) {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function(err, fields, files) {
    if (err) {
      return next(err);
    }

    const fileName = path.join(
      process.cwd(),
      'public',
      'upload',
      files.photo.name
    );

    fs.rename(files.photo.path, fileName, err => {
      if (err) {
        req.flash(
          'msgfile',
          'При работе с картинкой произошла ошибка на сервере'
        );
        return;
      }

      db.get('products')
        .push({
          src: path.join('upload', files.photo.name),
          name: fields.productName,
          price: fields.productPrice
        })
        .write();
      req.flash('msgfile', 'Продукт успешно загружен');
      res.redirect('/admin');
    });
  });
};

module.exports.setSkills = function(req, res, next) {
  const form = new formidable.IncomingForm();
  const skills = db.getState().skills;

  form.parse(req, (err, body) => {
    const { age, concerts, cities, years } = body;
    if (err) {
      return next(err);
    }

    skills[0].number = age;
    skills[1].number = concerts;
    skills[2].number = cities;
    skills[3].number = years;

    db.set('skills', skills).write();
    req.flash('msgskill', 'Данные обновлены!');
    res.redirect('/admin');
  });
};
