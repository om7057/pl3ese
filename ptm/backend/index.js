const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Test DB Connection
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(err => console.log('Error: ' + err));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
