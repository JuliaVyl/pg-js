const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, function () {
  console.log('Server has been started on *:5000');
});

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inputs-table',
  password: 'password',
  port: 5432,
});

app.post('/', (req, res) => {
  const { one, two } = req.body;

  pool.query(
    'INSERT INTO "table" ("One", "Two", "Date") VALUES ($1, $2, to_timestamp($3))',
    [one, two, new Date() / 1000],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send('Added table data');
    }
  );
});

app.get('/', (req, res) => {
  pool.query(
    'SELECT * FROM "table" ORDER BY "Date" ASC',
    [],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
