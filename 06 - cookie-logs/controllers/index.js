module.exports.getIndex = function(req, res) {
  console.log(req.cookies);
  res.render('pages/index', { title: 'Main' });
};

module.exports.setCookie = function(req, res) {
  res.cookie('mycookie', 'loft', {
    maxAge: 60 * 1000,
    path: '/',
  });
  res.cookie('httpcookie', 'loft', {
    maxAge: 60 * 1000,
    path: '/',
    httpOnly: false,
  });
  res.redirect('/');
};

module.exports.clearCookie = function(req, res) {
  res.clearCookie('mycookie');
  res.clearCookie('httpcookie');
  res.redirect('/');
};
