const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });
  
      // Generate JWT
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Send success response
      res.json({ message: 'User created successfully', token });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'User could not be created.' });
    }
  });

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
