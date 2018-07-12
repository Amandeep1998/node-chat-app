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

jQuery('[name=room]').on('input', function() {
  var selectRoom = jQuery('[name=room]');
  var selectCreateRoom =  jQuery('[name=createroom]');
  if(selectRoom.val().length > 0) {
    selectCreateRoom.attr('disabled', 'disabled');
  } else {
    selectCreateRoom.removeAttr('disabled');
  }
});
jQuery('[name=createroom]').on('input', function() {
  var selectRoom = jQuery('[name=room]');
  var selectCreateRoom =  jQuery('[name=createroom]');
  if(selectCreateRoom.val().length > 0) {
    selectRoom.attr('disabled', 'disabled');
  } else {
    selectRoom.removeAttr('disabled');
  }
});
// jQuery('[name=room]').on('input', function() {
//   jQuery('[name=createroom]').removeAttr('disabled');
// });


socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
