const db = require('../config/db'); // Asegúrate de que esto esté configurado correctamente

const getUsersByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results); // Los resultados se devuelven en formato JSON automáticamente
    });
  });
};

const updateUserByEmail = (email, updatedData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET ? WHERE email = ?';

    db.query(query, [updatedData, email], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results); // Los resultados de la actualización se devuelven
    });
  });
};

module.exports = { getUsersByEmail, updateUserByEmail };