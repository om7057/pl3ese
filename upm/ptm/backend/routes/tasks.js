const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        console.log('Authenticated user:', req.user); // Log authenticated user
        next();
    });
}

// Create a Task
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, dueDate, status, priority, category } = req.body;

    // Debugging: Log incoming task data
    console.log('Incoming task data:', req.body);

    // Validate task data
    if (!title || !dueDate || !priority) {
        return res.status(400).json({ error: 'Title, dueDate, and priority are required.' });
    }

    try {
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            status,
            priority,
            category,
            userId: req.user.id
        });
        console.log('Task created:', newTask); // Log the created task
        res.status(201).json(newTask);
    } catch (err) {
        console.error('Error creating task:', err); // Log error details
        res.status(400).json({ error: 'Task could not be created', details: err.message });
    }
});

// Get All Tasks
router.get('/', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        console.log('Fetched tasks:', tasks); // Log the fetched tasks
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err); // Log the error
        res.status(500).json({ error: 'Could not fetch tasks' });
    }
});

// Update a Task
// Update a Task
// Update a Task
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description, dueDate, status, priority, category } = req.body;
  const taskId = req.params.id;

  // Debugging: Log incoming update data
  console.log(`Received request to update task ${taskId} with data:`, req.body);

  try {
      // Check if the task exists first
      const task = await Task.findOne({ where: { id: taskId, userId: req.user.id } });
      if (!task) {
          return res.status(404).json({ error: 'Task not found' });
      }

      // Perform the update
      const [updated] = await Task.update(
          { title, description, dueDate, status, priority, category, updatedAt: new Date() },
          { where: { id: taskId, userId: req.user.id } }
      );

      if (!updated) {
          return res.status(404).json({ error: 'Task not found for update' });
      }

      console.log(`Task ${taskId} updated successfully:`, { title, description, dueDate, status, priority, category });
      res.json({ message: 'Task updated successfully' });
  } catch (err) {
      console.error('Error updating task:', err); // Log error details
      res.status(400).json({ error: 'Task could not be updated', details: err.message });
  }
});



// Delete a Task
router.delete('/:id', authenticateToken, async (req, res) => {
    const taskId = req.params.id;

    try {
        const deleted = await Task.destroy({ where: { id: taskId, userId: req.user.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err); // Log error details
        res.status(400).json({ error: 'Task could not be deleted', details: err.message });
    }
});

// Get Tasks by Status
router.get('/status/:status', authenticateToken, async (req, res) => {
    const { status } = req.params;

    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id, status } });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks by status:', err); // Log the error
        res.status(500).json({ error: 'Could not fetch tasks' });
    }
});

module.exports = router;
