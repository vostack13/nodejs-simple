var app = require('express')();

app.use(function(req, res, next) {
  if (req.url !== '/favicon.ico') {
    console.log('-----------------------------------------');
    console.log('Я буду выполнятся всегда так как я первый');
  }
  next();
});

app.get('/first', function(req, res) {
  console.log('/first: Роут прерван и выполнена команда res.send()');
  res.send('/first: Роут прерван и выполнена команда res.send()');
});

app.get('/first', function(req, res) {
  console.log('/first: Этот роут никогда не вызовется');
  // никогда
});

app.get('/second', function(req, res, next) {
  console.log(
    '/second: Роут не был прерван, а проброшен дальше командой next()'
  );
  next();
});

app.use(function(req, res, next) {
  if (req.url !== '/favicon.ico') {
    console.log('Выполняюсь иногда, если сверху не прервалось выполнение');
  }
  next();
});

app.get('/second', function(req, res) {
  console.log('/second (часть 2): Будем вызывать ошибку!');
  throw new Error('Ошибка в роуте - /second');
});

app.use('/second', function(err, req, res, next) {
  console.log('/second Ошибка была обнаружена и передана дальше next(err)');
  next(err);
});

app.get('/third', function(req, res) {
  console.log('/third: Вызываем ошибку');
  throw new Error('Ошибка в роуте - /third');
});

app.use('/third', function(err, req, res, next) {
  console.log('/third: Ошибка обнаружена и НЕ передаем дальше - next()');
  next();
});

app.use(function(req, res) {
  if (req.url !== '/favicon.ico') {
    console.log(`Роут не обработан ${req.url}`);
  }
  res.send('404 - страница не найдена');
});

app.use(function(err, req, res, next) {
  console.log('Не обработанная ошибка обнаружена!: ' + err.message);
  res.send('500 - ошибка сервера');
});

app.listen(3000, function() {
  console.log('Сервер на порту: 3000');
});
