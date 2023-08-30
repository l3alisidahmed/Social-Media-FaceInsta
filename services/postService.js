const fs = require('fs');


class Post {
  static posts = Post.getPosts();
  static length = this.posts.length;
  constructor(description, image) {
    posts.push({
      id: Post.length + 1,
      description,
      image,
      createdAt: new Date()
    });
    savePosts();
  }

  static getPosts = () => {
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    return JSON.parse(postsStr);
  }

  static savePosts = () => {
    fs.writeFileSync('post.json', JSON.stringify(this.posts));
  }

  getPost = () => {
    return fs.readFileSync('post.json', 'utf-8');
  }

  removePost = () => {
    posts.filter(post => post.id !== parseInt(id));
  }
}

module.exports = Post