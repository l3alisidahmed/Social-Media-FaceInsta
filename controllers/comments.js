const { NOTFOUND } = require('dns');
const fs = require('fs');
const { connect } = require('http2');

const path = "./comment.json";

let writeIntoFile = (filePath, insertContent) => {
  fs.writeFile(filePath, JSON.stringify(insertContent), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data has been written to the file successfully.');
    }
  });
}

let getDataFromFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

const getAllComments = (req, res) => {
  try {
    let new_data = [];
    let data = getDataFromFile(path);

    for (let index = 0; index < data.length; index++) {
        if (data[index]["postId"] === parseInt(req.params.postId)) {
            new_data.push(data[index]);
        }
    }

    if (new_data.length > 0) {
      res.status(200).json({ success: true, comments: new_data });
    } else {
      res.status(404).json({ success: false, error: `Not Found Post With This Id ${req.params.postId}, Please Corret The Id Of Post` });
    }

  } 
  catch (err) {
    console.log(err);
  }
}

const addComment = (req, res) => {

  try {
    const { content } = req.body;
    let data = getDataFromFile(path);

    if (content !== "") {
      const new_comment = {"id": Date.now(), "content": content, "postId": Number(req.params.postId)};
      
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

const deleteComment = (req, res) => {
 try {

  found = false;
  let data = getDataFromFile(path);

  for (let index = 0; index < data.length; index++) {
    if (data[index]["postId"] === Number(req.params.postId)) {
      if (data[index]["id"] === Number(req.params.commentId)) {
        found =  true;  
        data.splice(index, index + 1);
      }
    }
  }

  if (found) {
    console.log(data);
  
    writeIntoFile(path, data);
  
    // res.send(`comment with id ${req.params.commentId} has been deleted`);
    // I Added this
    res.status(200).json({ 
      success: true, 
      message: `Comment With ID ${req.params.commentId} Has Been Deleted`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Not Found Comment With ID ${req.params.commentId}`
    })
  }
 } 
 catch (err) {
  console.log(err);
 }

}

const updateComment = (req, res) => {
  try {
    let pos;
    let new_data = []
    let data = getDataFromFile(path);
    const { content } = req.body;

    if (connect === "") {
      return res.status(400).json({
        success: false,
        message: "your comment is empty, please write something"
      })
    }
    
    for (let index = 0; index < data.length; index++) {
      if ( data[index]["postId"] === Number(req.params.postId) && data[index]["id"] === Number(req.params.commentId)) {
          pos = index;
          data[index]["content"] = content;
          new_data.push(data[index]);
      } else {
          new_data.push(data[index]);
      }
    }
    
    writeIntoFile(path, new_data);
    
    // res.send(`comment with id ${req.params.commentId} has been updated`);
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