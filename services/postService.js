const fs = require('fs');

class Post {
  static posts = this.getPosts();
  static length = this.posts.length;

  constructor(description, image, date) {
    this.id = Post.length + 1;
    this.description = description;
    this.image = image;
    this.createdAt = date;
    this.createPost();
    Post.savePosts();
    Post.length++;
  }

  static getPosts() {
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    return JSON.parse(postsStr);
  }

  static savePosts() {
    fs.writeFileSync('post.json', JSON.stringify(Post.posts));
  }

  getPost() {
    return Post.posts[Post.length-1];
  }

  createPost() {
    Post.posts.push({
      id: Date.now(),
      description: this.description,
      image: this.image,
      createdAt: this.createdAt
    });
  }

  static getPostById(id) {
    return Post.posts.find(post => post.id === parseInt(id));
  }

  static updatePost(id, { description, image }) {
    for (let i = 0; i < Post.length; i++) {
      if(Post.posts[i].id === parseInt(id)) {
        Post.posts[i].description = description;
        Post.posts[i].image = image;
        Post.savePosts();
        return Post.posts[i];
      }
    }
  }

  static removePost(id) {
    const length = Post.length;
    Post.posts = Post.posts.filter(post => post.id !== parseInt(id));
    if(length === Post.posts.length) {
      return false;
    }
    Post.savePosts();
    Post.length--;
    return true;
  }
}

module.exports = Post