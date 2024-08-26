const express = require('express');
const { getProjectsByEmail } = require('../services/projectService');

const router = express.Router();

// Ruta para obtener proyectos por email
router.post('/projects', (req, res) => {
  const { email } = req.body; // Asegúrate de que estás obteniendo el email del cuerpo de la solicitud

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  getProjectsByEmail(email, (err, projects) => {
    if (err) {
      console.error('Error fetching projects:', err.stack);
      return res.status(500).json({ message: 'Server error' });
    }

    res.status(200).json({ projects });
  });
});



module.exports = router;
