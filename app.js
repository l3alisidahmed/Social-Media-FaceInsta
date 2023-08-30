const fs = require('fs');
const express = require('express');
const { isNumberObject } = require('util/types');
const path = "./comment.json";

const app = express();

app.use(express.json());
app.listen(3000);

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


app.get("/api/v1/posts/:postId/comments", (req, res) => {
    let new_data = [];
    let data = getDataFromFile(path);
    for (let index = 0; index < data.length; index++) {
        if (data[index]["_PId"] == req.params.postId) {
            new_data.push(data[index]);
        }
    }
    res.send(new_data);
});

app.post("/api/v1/posts/:postId/comments/:commentId", (req, res) => {

    let data = getDataFromFile(path);
    const comment = req.body;
    data.push({"id": Number(req.params.commentId), "content": comment["content"], "_PId": Number(req.params.postId)});
    writeIntoFile(path, data);
    res.send("comment has been added")

});

app.delete("/api/v1/posts/:postId/comments/:commentId", (req, res) => {
    let data = getDataFromFile(path);
    let new_data = []

    for (let index = 0; index < data.length; index++) {
        if (data[index]["_PId"] === Number(req.params.postId) && data[index]["id"] !== Number(req.params.commentId)) {
            new_data.push(data[index]);
        }
    }

    console.log(new_data);

    writeIntoFile(path, new_data);

    res.send(`comment with id ${req.params.commentId} has been deleted`);
    
});

app.put("/api/v1/posts/:postId/comments/:commentId", (req, res) => {
    let new_data = []
    let data = getDataFromFile(path);
    const data_body = req.body;
    
    for (let index = 0; index < data.length; index++) {
        if ( data[index]["_PId"] === Number(req.params.postId) && data[index]["id"] === Number(req.params.commentId)) {
            data[index]["content"] = data_body["content"]
            new_data.push(data[index]);
        } else {
            new_data.push(data[index]);
        }
    }
    
    writeIntoFile(path, new_data);
    
    res.send(`comment with id ${req.params.commentId} has been updated`);
});
