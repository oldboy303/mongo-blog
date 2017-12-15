const mongoose = require('mongoose');
const PostSchema = require('./post');
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
    posts: [PostSchema],
    likes: Number
},
{
  usePushEach: true
});

// in the getter that follows, we need to use a regular function declaration rather than
// a fat arrow function so that the scope of the 'this' keyword is bound to the User instance
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;