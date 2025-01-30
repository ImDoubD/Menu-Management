import express from 'express';
import subCategoryController from '../controller/subCategoryController';
import authMiddleware from '../authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, subCategoryController.createSubCategory);
router.get('/', authMiddleware, subCategoryController.getAllSubCategories);
router.get('/:identifier', authMiddleware, subCategoryController.getSubCategoriesByIdOrName);
router.get('/category/:categoryId', authMiddleware, subCategoryController.getSubCategoriesByCategory);
router.put('/:id', authMiddleware, subCategoryController.updateSubCategory);

export default router;