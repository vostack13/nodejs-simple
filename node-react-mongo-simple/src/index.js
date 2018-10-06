import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import PostModel from './models/Post';

const app = express();
mongoose.connect('mongodb://localhost/blog');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
	const data = req.body;
	const post = new PostModel({
		title: data.title,
		text: data.text
	});
	
	post.save().then(() => {
		res.send({status: 'ок'});
	});	
})

app.get('/posts', (req, res) => {
	PostModel.find().then((err, posts) => {
		if(err){
			return res.send(err);
		}

		res.json(post);
	})
})

app.delete('/posts/:id', (req, res) => {
	PostModel.remove({
		_id: req.params.id
	}).then(post => {
		post
			?	res.json({ status: 'deleted' })
			: res.json({ status: 'error' });
	})
})

app.put('/posts/:id', (req, res) => {
	PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
		err
			? res.send(err)
			: res.json({status: 'updated'});
	})
})

app.listen(3000, () => {
	console.log('Сервер запущен!');
})