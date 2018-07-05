var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');
  socket.emit('createMessage', {
    from: 'Nikhil',
    text: 'Wassup'
  });

});
socket.on('disconnect', function()  {
  console.log('Disconnected Server');
});

socket.on('newMessage', function(message) {
  console.log('You got a new Message', message);
});
