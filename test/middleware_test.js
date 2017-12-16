const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');

describe('Middleware', () => {
  let john, blogPost;

  beforeEach((done) => {
    john = new User({ name: 'John Doe' });
    blogPost = new BlogPost({ title: 'I love JS', content: 'It really is the best' });

    john.blogPosts.push(blogPost);

    Promise.all([john.save(), blogPost.save()])
      .then(() => done());
  });

  it('dangling blogPosts are cleaned up on user remove', (done) => {
    john.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });


})