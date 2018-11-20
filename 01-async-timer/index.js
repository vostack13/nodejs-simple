const http = require("http");

const getTimeServer = () => {
    let date = new Date();
    const time = `${date.getUTCHours()} ч. ${date.getUTCMinutes()} мин. ${date.getUTCSeconds()} cек.`;
    console.log(time);
    return time;
};

const asyncTimer = (timer, delay) => {
  return new Promise((resolve, reject) => {
    const timerInteval = setInterval(getTimeServer, delay);
    console.log('Таймер для вывода текущей даты запущен!')
    getTimeServer(); // Чтобы запустить таймер мгновенно

    setTimeout(() => {
      clearInterval(timerInteval);
      const msgStopTimer = `Таймер остановлен! Время остановки: ${getTimeServer()}`
      console.log(msgStopTimer)
      resolve(msgStopTimer);
    }, timer)
    
  })
}

http
.createServer(function(req, res) {
  if (req.url == '/timer') {
    (async () => {
      const result = await asyncTimer(2000, 1000);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
      res.write(result);
      res.end();
    })()
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' })
    res.end('<h2>Для запуска таймера перейдите по адресу: <a href="http://localhost:3000/timer">http://localhost/timer</a> </h2>');
  }
  })
  .listen(3000);

console.log("Сервер запущен на localhost:3000; нажмите Ctrl-C для завершения.");

