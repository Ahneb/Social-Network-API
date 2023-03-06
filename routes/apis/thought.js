const { Router } = require('express');
const ThoughtController = require('../../controller/ThoughtController');

const thoughtRouter = new Router();

thoughtRouter.route('/')
  .get(ThoughtController.getThoughts)
  .post(ThoughtController.createThought);

thoughtRouter.route('/:thoughtId')
  .get(ThoughtController.getSingleThought)
  .delete(ThoughtController.deleteThought)
  .put(ThoughtController.updateThought);

thoughtRouter.route('/:thoughtId/reactions')
  .post(ThoughtController.addReaction);

thoughtRouter.route('/:thoughtId/reactions/:reactionId')
  .delete(ThoughtController.deleteReaction);

module.exports = thoughtRouter;