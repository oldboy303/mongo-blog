const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

  let john;

  beforeEach((done) => {
    john = new User({ name: 'John Doe' });
    john.save()
      .then(() => done());
  });

    function assertion(operation, done) {
      operation
        .then(() => User.findOne({ name: 'John Doe' }))
        .then((user) => {
          assert(user === null);
          done();
        });
    }

  it('model instance remove', (done) => {
    // remove a single instance of a user
    assertion(john.remove(), done);
  });

  it('model class method remove', (done) => {
    // remove a number of records that meet a certain criteria
    assertion(User.remove({ name: 'John Doe'}), done);
  });

  it('model class method findOneAndRemove', (done) => {
    // finds and removes the first record matching a certain criteria
    assertion(User.findOneAndRemove({ name: 'John Doe' }), done);
  });

  it('model class method findByIdAndRemove', (done) => {
    // removes a user by their _id 
    assertion(User.findByIdAndRemove(john._id), done);
  });
    
});