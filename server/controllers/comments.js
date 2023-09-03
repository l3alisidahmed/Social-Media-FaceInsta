const fs = require('fs');
const { NOTFOUND } = require('dns');
const { connect } = require('http2');
const Post = require("../services/postService.js");
const comment = require('../services/commentService.js');
const formatDate = require('../services/dateService.js');
const { BadRequestError, NotFoundError } = require('../errors');
const Comment = require('../services/commentService.js');

const path = "models/comment.json";

let chekPostId = (id) => {
  if (!parseInt(id)) {
    return `${id} Is Not ID! Provide A Valid Id Please`;
  }
}

// put data in file
let writeIntoFile = (filePath, insertContent) => {
  fs.writeFile(filePath, JSON.stringify(insertContent), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to the file successfully.');
    }
  });
}

// get data from file
let getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

//get all comments in post with id of post
const getAllComments = (req, res, next) => {
  try {
    const id = req.params.postId;
    const post = Post.getPostById(id);
    const data = comment.getComments(id);

    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${id}!`);
      return next(err);
    }

    res.status(200).json({ success: true, comments: data });

  } 
  catch (err) {
    console.log(err);
  }
}

const addComment = (req, res) => {

  try {

    const { content } = req.body;
    const id = req.params.postId;
    const postIdErr = chekPostId(id);
    const data = Comment.addComment(id, content);

    if (postIdErr) {
      return res.status(400).json({
        success: false,
        message: postIdErr
      })
    }

    if (content !== "") {
      res.status(201).json({
        success: true,
        data
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Your Comment Is Empty, Please Write Something"
      });
      
    }

  }
  catch (err) {
    console.log(err);
  }
}

const deleteComment = (req, res, next) => {
 try {

  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = Post.getPostById(postId);
  const postIdErr = chekPostId(postId);
  const commentIdErr = chekPostId(commentId);
  let isDeleted = comment.deleteComment(postId, commentId);

  if (postIdErr) {
    return res.status(400).json({
      success: false,
      message: postIdErr
    });
  }

  if (commentIdErr) {
    return res.status(400).json({
      success: false,
      message: commentIdErr
    });
  }

  if(!post) {
    const err = new NotFoundError(`There is no Post With ID ${postId}!`);
    return next(err);
  }

  if (isDeleted) {
    res.status(200).json({ 
      success: true, 
      message: `Comment With ID ${commentId} Has Been Deleted`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Not Found Comment With ID ${commentId}`
    })
  }
 } 
 catch (err) {
  console.log(err);
 }

}

const updateComment = (req, res, next) => {
  try {
    
    const { content } = req.body;
    const postId = req.params.postId;
    const postIdErr = chekPostId(postId);
    const post = Post.getPostById(postId);
    const commentId = req.params.commentId;
    const commentIdErr = chekPostId(commentId);

    if (postIdErr) {
      return res.status(400).json({
        success: false,
        message: postIdErr
      })
    }

    if (commentIdErr) {
      return res.status(400).json({
        success: false,
        message: commentIdErr
      })
    }

    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${postId}!`);
      return next(err);
    }

    if (connect === "") {
      return res.status(400).json({
        success: false,
        message: "your comment is empty, please write something"
      })
    }
    
    const updateComment = comment.updateComment(postId, commentId, content);

    if (!updateComment) {
      return res.status(404).json({
        success: false,
        message: `there is not comment with this id ${commentId}`
      })
    }
        // I Added This
    res.status(200).json({ 
      success: true, 
      comment: updateComment
    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllComments,
  addComment,
  updateComment,
  deleteComment
}