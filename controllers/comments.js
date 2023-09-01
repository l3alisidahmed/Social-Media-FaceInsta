const fs = require('fs');
const { NOTFOUND } = require('dns');
const { connect } = require('http2');
const Post = require("../services/postService.js");
const { BadRequestError, NotFoundError } = require('../errors');
const formatDate = require('../services/dateService.js');

const path = "models/comment.json";

let chekPostId = (postID) => {
  if (!parseInt(postID)) {
    return `${postID} Is Not ID! Provide A Valid Id Please`;
  }
}

let chekCommentId = (commentID) => {
  if (!parseInt(commentID)) {
    return `${commentID} Is Not ID! Provide A Valid Id Please`;
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
    
    let new_data = [];
    let data = getDataFromFile(path);
    
    const id = req.params.postId;
    const post = Post.getPostById(id);

    for (let index = 0; index < data.length; index++) {
        if (data[index]["postId"] === parseInt(id)) {
            new_data.push(data[index]);
        }
    }

    if(!post) {
      const err = new NotFoundError(`There is no Post With ID ${id}!`);
      return next(err);
    }

    res.status(200).json({ success: true, comments: new_data });

  } 
  catch (err) {
    console.log(err);
  }
}

const addComment = (req, res) => {

  try {
    let data = getDataFromFile(path);

    const { content } = req.body;
    const id = req.params.postId;
    const postIdErr = chekPostId(req.params.postId);

    if (postIdErr) {
      res.status(400).json({
        success: false,
        message: postIdErr
      })
    }

    if (content !== "") {
      const currentDate = new Date();
      const date = formatDate(currentDate);
      const new_comment = {
        "id": Date.now(), 
        "content": content, 
        "createdAt": date,
        "postId": Number(id)
      };
      
      data.push(new_comment);
      writeIntoFile(path, data);
      
      res.status(201).json({
        success: true,
        new_comment
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

  let found = false;
  let data = getDataFromFile(path);
  
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = Post.getPostById(postId);
  const postIdErr = chekPostId(postId);
  const commentIdErr = chekPostId(commentId);

  if (postIdErr) {
    res.status(400).json({
      success: false,
      message: postIdErr
    })
  }

  if (commentIdErr) {
    res.status(400).json({
      success: false,
      message: commentIdErr
    })
  }

  if(!post) {
    const err = new NotFoundError(`There is no Post With ID ${postId}!`);
    return next(err);
  }

  for (let index = 0; index < data.length; index++) {
    if (data[index]["postId"] === Number(postId)) {
      if (data[index]["id"] === Number(commentId)) {
        found =  true;  
        data.splice(index, index + 1);
      }
    }
  }

  if (found) {
    console.log(data);
  
    writeIntoFile(path, data);
  
    // I Added this
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
    
    let pos;
    let data = getDataFromFile(path);


    const { content } = req.body;
    const postId = req.params.postId;
    const postIdErr = chekPostId(postId);
    const post = Post.getPostById(postId);
    const commentId = req.params.commentId;
    const commentIdErr = chekPostId(commentId);

    if (postIdErr) {
      res.status(400).json({
        success: false,
        message: postIdErr
      })
    }

    if (commentIdErr) {
      res.status(400).json({
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
    
    for (let index = 0; index < data.length; index++) {
      if ( data[index]["postId"] === Number(postId) && data[index]["id"] === Number(commentId)) {
          pos = index;
          data[index]["content"] = content;
          new_comment = {
            "id": data[index]["id"], 
            "content": data[index]["content"], 
            "createdAt": data[index]["createdAt"],
            "postId": data[index]["postId"]
          }
          data.splice(index, index+1, new_comment)
      }
    }

    if (!pos) {
      return res.status(404).json({
        success: false,
        message: `there is not comment with this id ${commentId}`
      })
    }
    
    writeIntoFile(path, data);
        // I Added This
    res.status(200).json({ 
      success: true, 
      comment: data[pos]
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