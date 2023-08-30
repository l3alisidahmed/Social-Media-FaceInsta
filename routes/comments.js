const router = require('express').Router();
const { 
  getAllComments,
  addComment,
  updateComment,
  deleteComment 
} = require('../controllers/comments');

router.route('/').get(getAllComments).post(addComment);
router.route('/:commentId').put(updateComment).delete(deleteComment);

module.exports = router;