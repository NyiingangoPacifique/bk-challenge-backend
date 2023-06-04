import { Router } from 'express';
import seedFertilizerController from '../controllers/SeedFertilizerController';

const router = Router();

// Products
router.get('/', seedFertilizerController.getAllCombinations);
router.get('/:id', seedFertilizerController.getCombinationById);
router.post('/', seedFertilizerController.createCombination);
router.put('/:id', seedFertilizerController.updateCombination);
router.delete('/:id', seedFertilizerController.deleteCombination);
export default router;
