// TODO
const socket = io();

// событие происходит при присоединении к чату
socket.on('connect', function () {
  // спрашиваем пользователя как его зовут и отправляем на сервер событие
  socket.emit('adduser', prompt('Как вас зовут?'));
});

// обрабатываем от сервера событие обновить пользователей
socket.on('updateusers', function (data) {
  // очищаем список пользователей
  $('.users__list').empty();
  // и заново формируем
  data.forEach(element => {
    $('.users__list').append(`<li class="users__item">${element}</li>`);
  });
});

// получаем событие что комната изменилась
socket.on('updaterooms', function (data) {
  $('#room').text(data.current);
  $('.rooms__list').empty();
  data.rooms.forEach(element => {
    if (element === data.current) {
      $('.rooms__list').append(`<li class="rooms__item">${element}</li>`);
    } else {
      $('.rooms__list').append(`
        <li class="rooms__item">
          <a href="#" id=${element}>
          ${element}
          </a>
        </li>`);
    }
  });
  // вешаем события на комнаты
  $('a').on('click', function (e) {
    e.preventDefault();
    let room = $(this).attr('id');
    socket.emit('switchroom', room);
  });
});

// событие чат изменился
socket.on('updatechat', function (data) {
  // добавляем сообщение в чат
  $('.chat').prepend(`<div><b>${data.name}</b>: ${data.msg}</div>`);
});

$(function () {
  // событие отправки сообщения с формы
  $('.msg').on('submit', function (e) {
    e.preventDefault();
    const message = $('#msg').val();
    $('#msg').val('');
    socket.send(message); // socket.emit('message', message)
  });
  // можем отправить нажатием клавиши
  $('#msg').on('keypress', function (e) {
    if (e.which === 13) {
      $('.msg').submit();
      e.preventDefault();
    }
  });
});
