const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle a new socket connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Broadcast a message when a user connects
  socket.broadcast.emit('message', 'A new user has joined the chat');

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });

  // When user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
