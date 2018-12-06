const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: 'loftschool',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 3600000
    },
    saveUninitialized: false,
    resave: false
  })
);

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err,
    message: err.message,
    status: err.status
  });
});

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Сервер запущен на порте: ' + server.address().port);
});
