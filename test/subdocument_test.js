const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    let john = new User({ 
      name: 'John Doe', 
      posts: [{ title: 'Post Title' }]
    });
    john.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  it('can add subdocs to an existing record', (done) => {
    let john = new User({
      name: 'John Doe',
      posts: []
    });
    john.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can add subdocs to an existing record', (done) => {
    let john = new User({
      name: 'John Doe',
      posts: [{ title: 'Some Post' }]
    });
    john.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        let post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });

});