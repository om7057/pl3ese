const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');  // Import file management routes
const authRoutes = require('./routes/authRoutes');  // Import file management routes
const db = require('./config/db');  // Import the db.js to involve database

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the uploads directory statically to access uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/files', fileRoutes);  
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
