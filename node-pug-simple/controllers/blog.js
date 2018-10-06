module.exports.getBlogPage = function(req, res) {
  res.render('index', { title: 'Блог' });
};