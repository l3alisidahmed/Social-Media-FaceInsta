const fs = require('fs');

class Post {
  static posts = this.getPosts();
  static length = this.posts.length;

  constructor(description, image, date, likes) {
    this.id = Post.length + 1;
    this.description = description;
    this.image = image;
    this.likes = likes || 0;
    this.createdAt = date;
    this.createPost();
    Post.savePosts();
    Post.length++;
  }

  static getPosts() {
    const postsStr = fs.readFileSync('models/post.json', 'utf-8');
    return JSON.parse(postsStr);
  }

  static savePosts() {
    fs.writeFileSync('models/post.json', JSON.stringify(Post.posts));
  }

  getPost() {
    return Post.posts[Post.length-1];
  }

  createPost() {
    Post.posts.push({
      id: Date.now(),
      description: this.description,
      image: this.image,
      likes: this.likes,
      createdAt: this.createdAt
    });
  }

  static getPostById(id) {
    return Post.posts.find(post => post.id === parseInt(id));
  }

  static updatePost(id, { description, image, likes }) {
    for (let i = 0; i < Post.length; i++) {
      if(Post.posts[i].id === parseInt(id)) {
        Post.posts[i].description = description;
        Post.posts[i].image = image;
        Post.posts[i].likes = likes;
        Post.savePosts();
        return Post.posts[i];
      }
    }
  }

  static removePost(id) {
    const length = Post.length;
    const commentsStr = fs.readFileSync('models/comment.json', 'utf-8');
    let comments = JSON.parse(commentsStr);

    Post.posts = Post.posts.filter(post => post.id !== parseInt(id));
    if(length === Post.posts.length) {
      return false;
    }
    comments = comments.filter(comment => comment.postId !== parseInt(id));
    fs.writeFileSync('models/comment.json', JSON.stringify(comments));
    Post.savePosts();
    Post.length--;
    return true;
  }
}

module.exports = Post