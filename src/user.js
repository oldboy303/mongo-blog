const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be at least 3 characters long.'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;