const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

let sqlCreateCourse = `CREATE TABLE courses(
            c_no text PRIMARY KEY,
            title text,
            hours integer)`;

let courses = ['CS301', 'Базы данных', 30, 'CS305', 'Сети ЭВМ', 60];

let sqlInsertCourse = `INSERT INTO courses(c_no, title, hours) VALUES(?, ?, ?), (?, ?, ?)`;

let sqlCreateStudents = `CREATE TABLE students (
            s_id integer PRIMARY KEY,
            name text,
            start_year integer)`;
let sqlInsertStudents = `INSERT INTO students(s_id, name, start_year)
            VALUES (1451, 'Anna', 2018), (1432, 'Viktor', 2018),
            (1556, 'Nina', 2018);
          `;
let sqlCreateExams = `CREATE TABLE exams(
                      s_id integer REFERENCES students(s_id),
                      c_no text REFERENCES courss(c_no),
                      score integer,
                      CONSTRAINT pk PRIMARY KEY(s_id, c_no)
                    )`;
let sqlInsertExams = `INSERT INTO exams(s_id, c_no, score)
                      VALUES (1451, 'CS301', 5), (1556, 'CS301', 5), 
                      (1451, 'CS305', 5), (1432, 'CS305', 4)`;

db.serialize(() => {
  const cb = (err, data) => {
    console.log(err);
  };

  db.run(sqlCreateCourse, [], cb);
  db.run(sqlInsertCourse, courses, cb);
  db.run(sqlCreateStudents, [], cb);
  db.run(sqlInsertStudents, [], cb);
  db.run(sqlCreateExams, [], cb);
  db.run(sqlInsertExams, [], cb);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
