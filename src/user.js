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
    likes: Number,
    blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }]
},
{
  usePushEach: true
});

UserSchema.virtual('postCount').get(function() {
  // using a regular funciton declaration so that 'this' gets bound to the object
  // returned from the constructor
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  // using regular function declaration for the same reason as above
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
})

const User = mongoose.model('user', UserSchema);

module.exports = User;