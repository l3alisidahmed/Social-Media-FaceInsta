const fs = require('fs');
const express = require('express');
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


app.get("/", (req, res) => {
    let data = getDataFromFile(path);
    res.send(data);
});

app.post("/add", (req, res) => {

    let data = getDataFromFile(path);
    const comment = req.body;
    data.push(comment);
    writeIntoFile(path, data);
    res.send("comment has been added")

});

app.delete("/delete/:id", (req, res) => {
    let data = getDataFromFile(path);
    let new_data = []
    const data_body = req.body;

    for (let index = 0; index < data.length; index++) {
        if (data[index]["id"] !== data_body["id"]) {
            console.log(data[index]);
            new_data.push(data[index]);
        }
    }

    writeIntoFile(path, new_data);

    res.send(`comment with id ${data_body["id"]} has been deleted`);
    
});

app.put("/update", (req, res) => {
    let new_data = []
    let data = getDataFromFile(path);
    const data_body = req.body;
    
    for (let index = 0; index < data.length; index++) {
        if (data[index]["id"] === data_body["id"]) {
            data[index]["content"] = data_body["content"]
            new_data.push(data[index]);
        } else {
            new_data.push(data[index]);
        }
    }
    
    writeIntoFile(path, new_data);
    
    res.send(`comment with id ${data_body["id"]} has been updated`);
});
