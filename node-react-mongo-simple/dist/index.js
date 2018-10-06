'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('./models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://localhost/blog');

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', function (req, res) {
	var data = req.body;
	var post = new _Post2.default({
		title: data.title,
		text: data.text
	});

	post.save().then(function () {
		res.send({ status: 'ок' });
	});
});

app.get('/posts', function (req, res) {
	_Post2.default.find().then(function (err, posts) {
		if (err) {
			return res.send(err);
		}

		res.json(post);
	});
});

app.delete('/posts/:id', function (req, res) {
	_Post2.default.remove({
		_id: req.params.id
	}).then(function (post) {
		post ? res.json({ status: 'deleted' }) : res.json({ status: 'error' });
	});
});

app.put('/posts/:id', function (req, res) {
	_Post2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
		err ? res.send(err) : res.json({ status: 'updated' });
	});
});

app.listen(3000, function () {
	console.log('Сервер запущен!');
});