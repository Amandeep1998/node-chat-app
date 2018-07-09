const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('should correct message object', () => {
    var from = 'Admin';
    var text = 'Hello boy!'
      var res = generateMessage(from, text);

      expect(res.from).toBe(from);
      expect(res.text).toBe(text);
      expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate location object', () => {
      var from = 'Admin';
      var latitude =1;
      var longitude =2;
      var res = generateLocationMessage(from, latitude, longitude);

      expect(res.from).toBe(from);
      expect(res.url).toBe(`https://www.google.com/maps?q=1,2`);

  });
});
