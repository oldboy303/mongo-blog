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
        
    });

});