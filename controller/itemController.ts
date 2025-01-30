import { Request, Response } from 'express';
import itemService from '../service/itemService';
import { HttpException } from '../utils/errorUtils';

class ItemController {
    async createItem(req: Request, res: Response) {
        try{
            const data = req.body;
            const item = await itemService.createItem(data);
            res.status(201).json(item);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getAllItems(req: Request, res: Response) {
        try{
            const items = await itemService.getAllItems();
            res.status(200).json(items);
        }catch(error){
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getItemsByCategory(req: Request, res: Response) {
        try{
            const categoryId = parseInt(req.params.categoryId);
            const items = await itemService.getItemsByCategory(categoryId);
            res.status(200).json(items);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getItemsBySubCategory(req: Request, res: Response) {
        try{
            const subCategoryId = parseInt(req.params.subCategoryId);
            const items = await itemService.getItemsBySubCategory(subCategoryId);
            res.status(200).json(items);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getItemByIdOrName(req: Request, res: Response) {
        try{
            const identifier = req.params.identifier;
            const item = await itemService.getItemByIdOrName(identifier);
            res.status(200).json(item);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateItem(req: Request, res: Response) {
        try{
            const identifier = req.params.identifier;
            const updatedItem = await itemService.updateItem(
                parseInt(identifier),
                req.body
            );
            res.json(updatedItem);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async searchItems(req: Request, res: Response) {
        try{
            const name = req.query.name as string;
            if (!name) throw new HttpException(400, 'Search query required');
            const items = await itemService.searchItems(name);
            res.json(items);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

}

export default new ItemController();