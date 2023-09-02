require('dotenv').config();
const cors = require('cors');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const errorHandler = require('./middleware/error-handler');
const express = require('express');
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/posts', postsRouter, commentsRouter);

// Middleware to handle errors
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
