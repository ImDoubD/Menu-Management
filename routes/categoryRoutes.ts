import express from 'express';
import categoryController from '../controller/categoryController';
import authMiddleware from '../authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getAllCategories);
router.get('/:identifier', authMiddleware, categoryController.getCategoryByIdOrName);
router.put('/:id', authMiddleware, categoryController.updateCategory);

export default router;