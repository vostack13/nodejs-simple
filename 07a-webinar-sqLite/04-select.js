const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

let sql = 'SELECT * FROM courses WHERE hours > ?';

db.all(sql, [45], (err, rows) => {
  rows.forEach(row => {
    console.log(row);
  });
});

db.close(err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
