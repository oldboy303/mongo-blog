const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

  it('saves a user', (done) => {
    const john = new User({
      name: 'John Doe'
    });
    john.save()
      .then(() => {
        assert(!john.isNew);
        done();
      });
  });

});