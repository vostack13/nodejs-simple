const WS = require('ws');

const wss = new WS.Server({ port: 8080 });

const clients = [];

wss.on('connection', ws => {
  const id = clients.length;
  clients[id] = ws;

  clients[id].send(
    JSON.stringify({
      type: 'hello',
      message: `Hello you id is ${id}`,
      data: id
    })
  );

  clients.forEach(el => {
    el.send(
      JSON.stringify({
        type: 'info',
        message: `New connection id = ${id}`
      })
    );
  });

  ws.on('message', message => {
    clients.forEach(el => {
      el.send(
        JSON.stringify({
          type: 'message',
          message: message,
          author: id
        })
      );
    });
  });

  ws.on('close', () => {
    delete clients[id];
  });

  ws.on('error', err => {
    console.log(err.message);
  });
});
