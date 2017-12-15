const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {

  it('postCount returns the number of posts', (done) => {
    let john = new User({
      name: 'John Doe',
      posts: [{ title: 'Some Post' }]
    });

    john.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });

});