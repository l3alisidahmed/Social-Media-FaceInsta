const fs = require('fs');

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
  let new_data = [];
  let data = getDataFromFile(path);
  for (let index = 0; index < data.length; index++) {
      if (data[index]["postId"] === parseInt(req.params.postId)) {
          new_data.push(data[index]);
      }
  }
  res.status(200).json({ success: true, comments: new_data });
}

const addComment = (req, res) => {

  let data = getDataFromFile(path);
  const { content } = req.body;
  const new_comment = {"id": Date.now(), "content": content, "postId": Number(req.params.postId)};
  data.push(new_comment);
  writeIntoFile(path, data);
  res.status(201).json({
    success: true,
    new_comment
  })

}

const deleteComment = (req, res) => {
  let data = getDataFromFile(path);
  let new_data = []

  for (let index = 0; index < data.length; index++) {
    if (data[index]["postId"] === Number(req.params.postId) && data[index]["id"] !== Number(req.params.commentId)) {
        new_data.push(data[index]);
    }
  }

  console.log(new_data);

  writeIntoFile(path, new_data);

  // res.send(`comment with id ${req.params.commentId} has been deleted`);
  // I Added this
  res.status(200).json({ 
    success: true, 
    message: `Comment With ID ${req.params.commentId} Has Been Deleted`
  });
}

const updateComment = (req, res) => {
  let pos;
  let new_data = []
  let data = getDataFromFile(path);
  const { content } = req.body;
  
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

module.exports = {
  getAllComments,
  addComment,
  updateComment,
  deleteComment
}