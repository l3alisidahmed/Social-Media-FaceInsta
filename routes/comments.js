const router = require('express').Router();
const { 
  getAllComments,
  addComment,
  updateComment,
  deleteComment 
} = require('../controllers/comments');

router.route('/:postId/comments').get(getAllComments);
router.route('/:postId/comments/:commentId').post(addComment).put(updateComment).delete(deleteComment);

module.exports = router;