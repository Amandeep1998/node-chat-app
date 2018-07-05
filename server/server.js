const path = require('path');
const http = require('http');

const express = require('express');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIo(server);
// app.use(express.static(__dirname + '/../public'));
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
})
