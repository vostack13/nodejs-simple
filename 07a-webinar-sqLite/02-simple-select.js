const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

let sql = 'SELECT title AS course_title, hours FROM courses';

db.all(sql, [], (err, rows) => {
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
