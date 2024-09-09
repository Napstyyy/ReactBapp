const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default XAMPP username
  password: '', // Default XAMPP password (leave empty if not set)
  database: 'your_database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
