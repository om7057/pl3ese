// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));  // Serve uploaded images

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Sync with DB and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => console.log('DB connection error:', err));
