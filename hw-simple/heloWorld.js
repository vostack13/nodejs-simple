// Простейший сервер на Node.js

const http = require("http");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello world!");
  })
  .listen(3000);

console.log("Сервер запущен на localhost:3000; нажмите Ctrl-C для завершения.");

// ----------------------------------------------------------------------------

// Модули для Node.js

// 1. File System — работа с файлами
const fs = require("fs");

fs.rename("/tmp/hello", "tmp/world", err => {
  if (err) throw err;
  console.log("rename comlete");
});

// 2. Path — работа с путями
const path = require("path");

path.extname("index.html");
// Return: --> '.html'

path.join("/foo", "bar", "baz/asdf", "quux", "..");
//Return: --> '/foo/bar/baz/asdf'

path.parse("/home/user/dir/file.txt");
//Return: --> 
// {
//   root: "/",
//   dir: "/home/user/dir",
//   base: "file.txt",
//   ext: ".txt",
//   name: "file"
// };

// 3. Events — модуль событий

const EventEmmiter = require('events');

class MyEmmitter extends EventEmmiter {}

const myEmmitter = new MyEmmitter();

myEmmitter.on('event', () => {
	console.log('an event occurred!');
});

myEmmitter.emit('event');

// 4. Crypto - модуль шифрования 

const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');

console.log(hash);
// Print: --> c0fa1bcgl3f4g6d2g7fdghfhg3fhj34f6g35gd73gf576gh23 (что-то похожее))))

// ----------------------------------------------------------------------------

// Простейший сервер на Express.js 

const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.end("Hello world!");
})

app.listen(3000, function (){
	console.log("Exapmle app listening on port 3000!");
})