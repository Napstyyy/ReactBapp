const mysql = require('mysql2');
if (process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: 'backend',
  password: '^jh8#[>^E}@kp{3J',
  database: 'max', // Asegúrate de que este es el nombre de tu base de datos
  connectTimeout: 60000,
});

connection.connect((err) => {
  console.log("Connecting to: ", process.env.DB_HOST, ":", process.env.DB_PORT);
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');

  // Consulta de prueba
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return;
    }
    console.log('Query result:', results);
  });
});

module.exports = connection;
