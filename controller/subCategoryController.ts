import { Request, Response } from "express";
import subCategoryService from "../service/subCategoryService";
import { HttpException } from "../utils/errorUtils";

class SubCategoryController {
    async createSubCategory(req: Request, res: Response) {
        try{
            const data =  req.body;
            const subCategory = await subCategoryService.createSubCategory(data);
            res.status(201).json(subCategory);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getAllSubCategories(req: Request, res: Response) {
        try{
            const subCategories = await subCategoryService.getAllSubCategories();
            res.status(200).json(subCategories);
        }catch(error){
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getSubCategoriesByCategory(req: Request, res: Response) {
        try{
            const categoryId = parseInt(req.params.categoryId);
            const subCategories = await subCategoryService.getSubCategoriesByCategory(categoryId);
            res.status(200).json(subCategories);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getSubCategoriesByIdOrName(req: Request, res: Response) {
        try{
            const identifier = req.params.identifier;
            const subCategory = await subCategoryService.getSubCategoryByIdOrName(identifier);
            res.status(200).json(subCategory);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateSubCategory(req: Request, res: Response) {
        try{
            const id = req.params.id;
            const updatedSubCategory = await subCategoryService.updateSubCategory(
                parseInt(id),
                req.body
            )
            res.json(updatedSubCategory);
        }catch(error){
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                console.log({ error: (error as Error).message })
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

export default new SubCategoryController();