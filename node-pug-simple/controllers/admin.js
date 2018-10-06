module.exports.getAdminPage = function(req, res) {
  res.render('index', { title: 'Личный кабинет' });
};