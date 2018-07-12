var socket = io();


socket.on('connect', function() {
  console.log('connected to server');

});

socket.on('updateAvailableRoom', function(rooms) {
  // var ol = jQuery('<ol></ol>');
  // rooms.forEach(function(room) {
  //     ol.append(jQuery('<li></li>').text(room));
  // });
  // jQuery('#available-rooms').html(ol);
  var datalist = jQuery('<datalist></datalist>')
  datalist.attr('id', 'rooms');
  rooms.forEach(function(room) {
      datalist.append(jQuery('<option>').val(room));//datalist creates a drop-down menu in input field
  });
  jQuery('#available-rooms').html(datalist);
});


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
