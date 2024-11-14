const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Protected route (example)
router.get('/profile', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json({ message: 'Welcome to the profile', userId: decoded.id });
  });
});

module.exports = router;
