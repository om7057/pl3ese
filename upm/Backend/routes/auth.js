// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'User could not be created' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid Credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
