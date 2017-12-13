const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {

    it('requires a user name', () => {
        let user = new User({ postCount: 0 });
        let validateResult = user.validateSync();
        let { message } = validateResult.errors.name;
        assert(message === 'Name is required.');
    });

    it('requires a user\'s name to be longer than 2 characters', () => {
        let user = new User({ name: 'Jo' });
        let validateResult = user.validateSync();
        let { message } = validateResult.errors.name;
        assert(message === 'Name must be at least 3 characters long.');
    });

    it('will not allow invalid records to be saved', (done) => {
        let jo = new User({ name: 'Jo' });
        jo.save()
            .catch((validateResult) => {
                let { message } = validateResult.errors.name;
                assert(message === 'Name must be at least 3 characters long.');
                done();                
            });
    });

});