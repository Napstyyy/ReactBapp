const connection = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = (name, email, password, callback) => {
  console.log('Creating user with:', { name, email, password }); // Log para depuración

  // Hasheando la contraseña antes de guardarla
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err.stack);
      return callback(err, null);
    }

    const query = 'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, hashedPassword, 1], (err, results) => {
      if (err) {
        console.error('Error executing query:', err.stack);
        return callback(err, null);
      }
      console.log('User created:', results);
      callback(null, results);
    });
  });
};

const verifyUser = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return callback(err, null);
    }

    if (results.length === 0) {
      return callback(null, null); // No se encontró el usuario
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err.stack);
        return callback(err, null);
      }

      if (!isMatch) {
        return callback(null, null); // La contraseña no coincide
      }

      // Devuelve el usuario incluyendo el `user_type`
      callback(null, {
        email: user.email,
        user_type: user.user_type,
      });
    });
  });
};

module.exports = {
  createUser,
  verifyUser,
};
