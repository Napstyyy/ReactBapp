const express = require('express');
const { createUser, verifyUser } = require('../services/authService');
const { getProjectsByEmail } = require('../services/projectService');
const db = require('../config/db');

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

    res.status(200).json({ message: 'Sign-in successful', email: user.email, user_type: user.user_type });
  });
});

router.post('/user-type', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const query = 'SELECT user_type FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user type:', err.stack);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userType = results[0].user_type;
    res.status(200).json({ user_type: userType });
  });
});


module.exports = router;