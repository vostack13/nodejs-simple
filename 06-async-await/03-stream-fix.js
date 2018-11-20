const fs = require('fs');

const delay = time => {
  return new Promise((resolve, reject) => setTimeout(resolve, time));
};

const readStream = stream => {
  return function() {
    return new Promise((resolve, reject) => {
      stream.on('data', ondata);
      stream.on('error', onerror);
      stream.on('end', onend);
      stream.resume();

      function ondata(chunk) {
        stream.pause();
        clearListener();
        resolve(chunk);
      }
      function onerror(err) {
        clearListener();
        reject(err);
      }
      function onend() {
        clearListener();
        resolve();
      }
      function clearListener() {
        stream.removeListener('data', ondata);
        stream.removeListener('error', onerror);
        stream.removeListener('end', onend);
      }
    });
  };
};

async function read() {
  let stream = fs.createReadStream('01-example.js', {
    highWaterMark: 80,
    encoding: 'utf8',
  });
  let reader = readStream(stream);
  let data = await reader();
  while (data) {
    await delay(500);
    console.log(data);
    data = await reader();
  }
}

read();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
