const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'max' // Asegúrate de que este es el nombre de tu base de datos
});

connection.connect((err) => {
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