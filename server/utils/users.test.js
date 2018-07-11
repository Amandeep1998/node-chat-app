const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
     users.users = [{
      id: '1',
      name: 'Aman',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Rhegi',
      room: 'React Course'
    },{
      id: '3',
      name: 'Abhishek',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'Aman',
        room: 'Madhouse'
      }
      var resUsers = users.addUsers(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser('1');
    expect(removedUser.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var removedUser = users.removeUser('32');
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('2');
    expect(user.id).toBe('2');
  });

  it('should not find user', () => {
    var user = users.getUser('23');
    expect(user).toBeFalsy(); //toNotExist is toBeFalsy
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Aman', 'Abhishek']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Rhegi']);
  });
});
