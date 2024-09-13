// routes/solutionRoutes.js
import express from 'express';
import {
  getAllSolutionsByProblemIdController,
  createSolutionController,
  getSolutionByIdController,
  updateSolutionController,
  deleteSolutionController,
  upvoteSolutionController,
  downvoteSolutionController,
  addDiscussionController,
} from '../controllers/problemController/solutionController.mjs';

const router = express.Router();

router.get('/problem/:problemId', getAllSolutionsByProblemIdController);
router.post('/problem/:problemId', createSolutionController);
router.get('/:id', getSolutionByIdController);
router.put('/:id', updateSolutionController);
router.delete('/:id', deleteSolutionController);
router.patch('/:id/upvote', upvoteSolutionController);
router.patch('/:id/downvote', downvoteSolutionController);
router.post('/:id/discussion', addDiscussionController);

export default router;
