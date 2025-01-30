import express from 'express';
import itemController from '../controller/itemController';
import authMiddleware from '../authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, itemController.createItem);
router.get('/', authMiddleware, itemController.getAllItems);
router.get('/search', authMiddleware, itemController.searchItems);
router.get('/:identifier', authMiddleware, itemController.getItemByIdOrName);
router.get('/category/:categoryId', authMiddleware, itemController.getItemsByCategory);
router.get('/subcategory/:subCategoryId', authMiddleware, itemController.getItemsBySubCategory);
router.put('/:id', authMiddleware, itemController.updateItem);

export default router;

