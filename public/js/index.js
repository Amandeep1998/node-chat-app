var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');
});
socket.on('disconnect', function()  {
  console.log('Disconnected Server');
});

socket.on('newMessage', function(message) {
  var formatTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatTime
  })
  jQuery('#messages').append(html);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formatTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
  // console.log('newMessage', message);
});

socket.on('newLocationMessage', function(message) {
  var formatTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatTime
  })
  jQuery('#messages').append(html);



  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formatTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Your browser doesnt support geolocation');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch data');
  })
})
