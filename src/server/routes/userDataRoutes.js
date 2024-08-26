const express = require('express');
const router = express.Router();
const { getUsersByEmail, updateUserByEmail } = require('../services/userDataService'); // Asegúrate de importar updateUserByEmail

// Ruta para obtener usuarios por email
router.get('/users', (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  getUsersByEmail(email)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Ruta para actualizar usuario por email
router.put('/users', (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  updateUserByEmail(email, updatedData)
    .then(result => {
      res.json({ message: 'User updated successfully', result });
    })
    .catch(error => {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
