const { BadRequestError, NotFoundError } = require('../errors');
const Post = require('../services/postService');
const formatDate = require('../services/dateService');

const getAllPosts = (req, res) => {
  try {
    const posts = Post.getPosts();
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
  }
}

const getPost = (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id)
    if(!parseInt(id)) {
      const err = new BadRequestError(`'${id}' Is Not ID! Provide A Valid Id Please`);
      return next(err);
    }
    const post = Post.getPostById(id);
    console.log(post);
    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${id}!`);
      return next(err);
    }
    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error(err);
  }
}

const createPost = (req, res, next) => {
  try {
    const { description, image, likes } = req.body;
    if(!description && !image) {
      const err = new BadRequestError('Description And Image Fields Are Null! Fill One Field At Least');
      return next(err);
    }
    const currentDate = new Date();
    const date = formatDate(currentDate);
    const post = new Post(description, image, date, likes);
    res.status(201).json({ success: true, post: post.getPost() });
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
    const { description, image, likes } = req.body;
    if(!description && !image) {
      const err = new BadRequestError('Description And Image Fields Are Null! Fill One Field At Least');
      return next(err);
    }
    const post = Post.updatePost(id, { description, image, likes });
    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${id}!`);
      return next(err);
    }
    res.status(200).json({ updatedPost: post });
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
    const isDeleted = Post.removePost(id);
    if(!isDeleted) {
      const err = new NotFoundError(`There is no Post With ID ${id}!`);
      return next(err);
    }
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