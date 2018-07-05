const expect = require('expect');

var {generateMessage} = require('./message');


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
