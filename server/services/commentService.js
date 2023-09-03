const fs = require('fs');
const formatDate = require('../services/dateService.js');

class Comment {

    static writeIntoFile (insertContent) {
        fs.writeFileSync("models/comment.json", JSON.stringify(insertContent), 'utf-8');
    }

    static getComments(postId) {
        const allComment = fs.readFileSync('models/comment.json', 'utf-8');
        const data = Comment.getCommentsWithPostID(JSON.parse(allComment), postId);
        return data;
    }

    static addComment(id, content) {
        const currentDate = new Date();
        const date = formatDate(currentDate);
        const data = Comment.getComments(id);
        const new_comment = {
            "id": Date.now(), 
            "content": content, 
            "createdAt": date,
            "postId": Number(id)
          };
        
        data.push(new_comment);
        Comment.writeIntoFile(data);

        return new_comment;
    }

    static updateComment(postId, commentId, content) {
        let pos;
        let new_comment;
        const data = Comment.getComments(postId);
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

          Comment.writeIntoFile(data);

          return data[pos];
    }

    static deleteComment(postId, commentId) {
        let isDeleted = false;
        const data = Comment.getComments(postId);
        for (let index = 0; index < data.length; index++) {
            if (data[index]["postId"] === Number(postId)) {
              if (data[index]["id"] === Number(commentId)) { 
                data.splice(index, index + 1);
                isDeleted = true;
              }
            }
        }

        Comment.writeIntoFile(data);

        return isDeleted;
    }
    
    static getCommentsWithPostID(data, id) {
        let new_data = []
        for (let index = 0; index < data.length; index++) {
            if (data[index]["postId"] === parseInt(id)) {
                new_data.push(data[index]);
            }
        }
    
        return new_data;
    }
}

module.exports = Comment