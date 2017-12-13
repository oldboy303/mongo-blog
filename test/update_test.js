const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {

    let john;

    beforeEach((done) => {
        john = new User({ name: 'John Doe', postCount: 0 });
        john.save()
            .then(() => done());
    });

    function assertion(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Jane Doe');
                done();
            });
    }

    it('model instance set() and save()', (done) => {
        // sets a property on an instance of User to a new value and saves it.
        // to be used when we might want to update several props over time and then save once to our DB.
        john.set('name', 'Jane Doe');
        assertion(john.save(), done);
    });

    it('model instance update()', (done) => {
        // good for updating properties and immediately saving to DB
        assertion(john.update({ name: 'Jane Doe' }), done);
    });

    it('model class update()', (done) => {
        // updates a number of records that match a certain criteria
        assertion(
            User.update({ name: 'John Doe' }, { name: 'Jane Doe' }),
            done
        );
    });

    it('model class findOneAndUpdate()', (done) => {
        // finds a single record matching certain criteria and updates it
        assertion(
            User.findOneAndUpdate({ name: 'John Doe' }, { name: 'Jane Doe' }),
            done
        );
    });

    it('model class findByIdAndUpdate', (done) => {
        assertion(
            User.findByIdAndUpdate(john._id, { name: 'Jane Doe' }),
            done
        );
    });

    it('A user can have their postCount incremented by 1', (done) => {
        // using mongoose $inc operator
        User.update({ name: 'John Doe' }, { $inc: { postCount: 1 } })
            .then(() => User.findOne({ name: 'John Doe' }))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            }); 
    });

});