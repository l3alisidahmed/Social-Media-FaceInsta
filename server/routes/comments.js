const router = require('express').Router();
const { 
  getAllComments,
  addComment,
  updateComment,
  deleteComment 
} = require('../controllers/comments');

router.route('/:postId/comments').get(getAllComments).post(addComment);
router.route('/:postId/comments/:commentId').put(updateComment).delete(deleteComment);

module.exports = router;