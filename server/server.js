const path = require('path');
const http = require('http');

const express = require('express');
const socketIo = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isNameUsed} =  require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIo(server);
var users = new Users();
// app.use(express.static(__dirname + '/../public'));

app.use(express.static(publicPath));
io.on('connection', (socket) => {
  io.emit('check-available-room', users.getUserRooms());
  console.log('New User Connected');
  io.emit('updateAvailableRoom', users.getUserRooms());

  socket.on('join', function(params, callback) {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room is required');
    }


    if(!isNameUsed(users, params.room, params.name)) {
      return callback('Name already taken');
    }


    socket.join(params.room);
     // users.removeUser(socket.id);//to remove use from all the rooms
     users.addUsers(socket.id, params.name, params.room);
     io.emit('updateAvailableRoom', users.getUserRooms());

     io.to(params.room).emit('updateList', users.getUserList(params.room));//get the names of the all the users


    //socket.leave('The office fans');
    //io.emit -> io.to('The office fans').emit
    //socket.broadcast.emit ->  socket.broadcast.to('The office fans').emit
    //socket.emit
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });


  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  })



  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name , coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateList', users.getUserList(user.room));//updates the list by removing dissconected user
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    io.emit('updateAvailableRoom', users.getUserRooms());

  });
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
})
module.exports = {users};
