const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

const clients = {};
let count = 0;

io.on('connection', socket => {
  const id = count++;
  clients[id] = socket.id;
  console.log(clients);

  socket.send({
    type: 'hello',
    message: `Hello you id is ${id}`,
    data: id
  });

  socket.broadcast.send({
    type: 'info',
    message: `New connection id = ${id}`
  });

  socket.on('message', message => {
    socket.send({
      type: 'message',
      message: message,
      author: id
    });
    socket.broadcast.send({
      type: 'message',
      message: message,
      author: id
    });
  });

  socket.on('disconnect', () => {
    delete clients[id];
  });
});
