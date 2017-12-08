const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/users_test');

before(() => {
    mongoose.connection
        .once('open', () => {})
        .on('error', (error) => {
            console.warn('WARNING: ', error);
        });
})

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });   
});