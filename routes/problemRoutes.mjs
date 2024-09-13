// routes/problemRoutes.js
import express from 'express';
import {
  getProblemsController,
  createProblemController,
  getProblemByIdController,
  updateProblemController,
  deleteProblemController,
} from '../controllers/problemController/problemController.mjs';

const router = express.Router();

router.put('/', getProblemsController);
router.post('/', createProblemController);
router.get('/:id', getProblemByIdController);
router.put('/:id', updateProblemController);
router.delete('/:id', deleteProblemController);

export default router;
