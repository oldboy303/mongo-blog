const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

    beforeEach((done) => {
        john = new User({ name: 'John Doe' });
        john.save()
            .then(() => done());
    });

    it('', () => {

    });
    
})