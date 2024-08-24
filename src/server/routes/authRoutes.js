const express = require('express');
const { createUser, verifyUser } = require('../services/authService');

const router = express.Router();

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  createUser(name, email, password, (err, results) => {
    if (err) {
      console.error('Error creating user:', err.stack);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  verifyUser(email, password, (err, user) => {
    if (err) {
      console.error('Error verifying user:', err.stack);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Sign-in successful', user });
  });
});

module.exports = router;
