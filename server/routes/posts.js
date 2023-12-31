const router = require('express').Router();
const { 
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost 
} = require('../controllers/posts');

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;