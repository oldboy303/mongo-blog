const assert = require('assert'); 
const User = require('../src/user');

describe('Reads a record from the database', () => {

  let john, jane, jim, joe;

  beforeEach((done) => {
    john = new User({ name: 'John Doe' });
    jane = new User({ name: 'Jane Doe' });
    jim = new User({ name: 'Jim Doe' });
    joe = new User({ name: 'Joe Doe' });
    
    Promise.all([john.save(), jane.save(), jim.save(), joe.save()])
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

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Jim Doe');
        assert(users[1].name === 'Joe Doe');
        done();
      });
  });

});