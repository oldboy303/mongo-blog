const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

    let john;

    beforeEach((done) => {
        john = new User({ name: 'John Doe' });
        john.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        // remove a single instance of a user
        john.remove()
            .then(() => User.findOne({ name: 'John Doe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('model class method remove', (done) => {
        // remove a number of records that meet a certain criteria
        User.remove({ name: 'John Doe'})
            .then(() => User.findOne({ name: 'John Doe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('model class method findOneAndRemove', (done) => {
        // finds and removes the first record matching a certain criteria
        User.findOneAndRemove({ name: 'John Doe' })
            .then(() => User.findOne({ name: 'John Doe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('model class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(john._id)
            .then(() => User.findOne({ name: 'John Doe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    
});