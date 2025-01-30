import { Request, Response } from 'express';
import categoryService from '../service/categoryService';
import { HttpException } from '../utils/errorUtils';

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try{
            const data = req.body;
            const category = await categoryService.createCategory(data);
            res.status(201).json(category);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try{
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        }catch(error){
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCategoryByIdOrName(req: Request, res: Response) {
        try{
            const identifier = req.params.identifier;
            const category = await categoryService.getCategoryByIdOrName(identifier);
            res.status(200).json(category);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateCategory(req: Request, res: Response) {
        try{
            const updatedCategory = await categoryService.updateCategory(
                parseInt(req.params.id),
                req.body
            )
            res.status(200).json(updatedCategory);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

export default new CategoryController();