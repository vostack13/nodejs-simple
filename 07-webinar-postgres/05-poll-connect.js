const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '',
  port: 5432,
  max: 20,
});

async function connect() {
  const db = await pool.connect();

  const data = await db.query('SELECT * FROM students');
  console.log(data.rows);
  db.release();
  pool.end().then(() => {
    console.log('Close pool');
  });
}

connect();
