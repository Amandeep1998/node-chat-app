class Users {
  constructor (){
    this.users = [];
  }

  addUsers(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var removedUser;
    var users = this.users.filter((user) => {
      if(user.id === id) {
        removedUser = user;
      }
      return user.id!== id;
    });
    this.users = users;
    return removedUser;
  }

  getUser(id) {
    var user = this.users.find((user) => user.id === id);
    return user;
  }

  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var nameArray = users.map((user) => user.name);
    return nameArray;
  }
}

module.exports = {Users};
