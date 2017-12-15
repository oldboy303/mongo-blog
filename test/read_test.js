const assert = require('assert'); 
const User = require('../src/user');

describe('Reads a record from the database', () => {

  let john;

  beforeEach((done) => {
    john = new User({ name: 'John Doe' });
    john.save()
      .then(() => done());
  });

  it('finds all users with a name of John Doe', (done) => {
    User.find({ name: 'John Doe' })
      .then((users) => {
        assert(users[0]._id.toString() === john._id.toString());
          done();
        });
  });

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: john._id })
      .then((user) => {
        assert(user.name === 'John Doe');
        done();
      });
  });

});