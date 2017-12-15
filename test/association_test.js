const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comment'); 

describe('Associations', () => {
  let john, blogPost, comment;

  beforeEach((done) => {
    john = new User({ name: 'John Doe' });
    blogPost = new BlogPost({ title: 'I love JS', content: 'It really is the best' });
    comment = new Comment({ content: 'Yay, my first post' });

    john.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = john;

    Promise.all([john.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogPost', (done) => {
    User.findOne({ name: 'John Doe' }).populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'I love JS');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    // be careful when loading nested associations...
    User.findOne({ name: 'John Doe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'John Doe');
        assert(user.blogPosts[0].title === 'I love JS');
        assert(user.blogPosts[0].comments[0].content === 'Yay, my first post');
        assert(user.blogPosts[0].comments[0].user.name === 'John Doe');
        done();
      })
  });

});