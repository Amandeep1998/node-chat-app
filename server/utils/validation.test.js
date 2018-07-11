const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should retutn true or false', () => {
    expect(isRealString(123)).toBe(false);
    expect(isRealString('   ')).toBe(false);
    expect(isRealString('  Aman  ')).toBe(true);
  })
})
