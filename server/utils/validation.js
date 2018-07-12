// const users = require('./../server');
var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
}

var isNameUsed = (users, room, name) => {
  var names = users.getUserList(room);
  if(names.includes(name)) {
    return false;
  } else{
    return true;
  }
}


module.exports = {isRealString, isNameUsed};
