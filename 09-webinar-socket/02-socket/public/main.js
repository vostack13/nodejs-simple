const socket = io();

const form = document.querySelector('#send');
const message = document.querySelector('#message');

form.addEventListener('submit', e => {
  e.preventDefault();
  socket.send(message.value);
});

socket.on('message', function (message) {
  let text = '';
  switch (message.type) {
    case 'info':
      text = message.message;
      break;
    case 'message':
      text = `${message.author} : ${message.message}`;
      break;
    default:
      alert(message.message);
      break;
  }
  const result = document.querySelector('#subscribe');
  const elMsg = document.createElement('div');
  elMsg.textContent = text;
  result.appendChild(elMsg);
});
