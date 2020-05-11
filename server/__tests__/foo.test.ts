const resolvers = require(__dirname + "/../server");

test('test jest', () => {
  expect(typeof resolvers).toBe('object')
})