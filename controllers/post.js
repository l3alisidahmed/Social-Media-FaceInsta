const fs = require('fs');
const { BadRequestError, NotFoundError } = require('../errors');
const Post = require('../services/postService');

const getAllPosts = (req, res) => {
  try {
    const posts = fs.readFileSync('post.json', 'utf-8');
    res.status(200).json({ success: true, posts: JSON.parse(posts) });
  } catch (err) {
    console.error(err);
  }
}

const getPost = (req, res) => {
  try {
    const id = req.params.id;
    if(!parseInt(id)) {
      const err = new BadRequestError(`'${id}' Is Not ID! Provide A Valid Id Please`);
      return next(err);
    }
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    const posts = JSON.parse(postsStr);
    const post = posts.find(post => post.id === parseInt(id));
    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${id} !`);
      return next(err);
    }
    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error(err);
  }
}

const createPost = (req, res, next) => {
  try {
    const { description, image } = req.body;
    if(!description && !image) {
      const err = new BadRequestError('Description And Image Fields Are Null! Fill One Field At Least');
      return next(err);
    }
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    const posts = JSON.parse(postsStr);
    // const currentDate = new Date();
    // const day = currentDate.getDate();
    // const month = (currentDate.getMonth()+1).toString().padStart(2, 0);
    // const year = currentDate.getFullYear();
    // const newPost = {
    //   id: posts.length + 1,
    //   description,
    //   image,
    //   // createdAt: currentDate,
    //   createdAt: `${day}/${month}/${year}`
    // }
    // posts.push(newPost);
    const post = new Post(description, image);
    // fs.writeFileSync('post.json', JSON.stringify(posts));
    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error(err);
  }
}

const updatePost = (req, res, next) => {
  try {
    const id = req.params.id;
    if(!parseInt(id)) {
      const err = new BadRequestError(`'${id}' Is Not ID! Provide A Valid Id Please`);
      return next(err);
    }
    const { description, image } = req.body;
    if(!description && !image) {
      const err = new BadRequestError('Description And Image Fields Are Null! Fill One Field At Least');
      return next(err);
    }
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    const posts = JSON.parse(postsStr);
    let isUpdated = false;
    let i;
    for (i = 0; i < posts.length; i++) {
      if(posts[i].id === parseInt(id)) {
        posts[i].description = description;
        posts[i].image = image;
        isUpdated = true;
        break;
      }
    }
    if(!isUpdated) {
      const err = new NotFoundError(`There is no Post With ID ${id} !`);
      return next(err);
    }
    fs.writeFileSync('post.json', JSON.stringify(posts));
    res.status(200).json({ updatedPost: posts[i] });
  } catch (err) {
    console.error(err);
  }
}

const deletePost = (req, res, next) => {
  try {
    const id = req.params.id;
    if(!parseInt(id)) {
      const err = new BadRequestError(`'${id}' Is Not ID! Provide A Valid Id Please`);
      return next(err);
    }
    const postsStr = fs.readFileSync('post.json', 'utf-8');
    let posts = JSON.parse(postsStr);
    const lengthBeforeDelete = posts.length;
    posts = posts.filter(post => post.id !== parseInt(id));
    if(posts.length === lengthBeforeDelete) {
      const err = new NotFoundError(`There is no Post With ID ${id} !`);
      return next(err);
    }
    fs.writeFileSync('post.json', JSON.stringify(posts));
    res.status(200).json({ success: true, message: `Post With ID ${id} Has Been Deleted` });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}