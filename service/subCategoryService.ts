import { Op } from 'sequelize';
import SubCategory, { SubCategoryAttributes } from '../model/subCategoryModel';
import Category from '../model/categoryModel';
import { HttpException } from '../utils/errorUtils';

class SubCategoryService {
    async createSubCategory(data: SubCategoryAttributes) {
        try{
            const category = await Category.findByPk(data.category_id);
            if(!category){
                throw new HttpException(404, 'Parent Category not found');
            }
            if(data.tax_applicability === undefined){
                data.tax_applicability = category.tax_applicability;
            }
            if(!data.tax) {
                data.tax = category.tax;
            }

            return await SubCategory.create(data);
        }catch(error){
            if ((error as Error).name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(409, 'SubCategory name already exists');
              }
              throw new HttpException(400, (error as Error).message);
        }
    }

    async getAllSubCategories() {
        return SubCategory.findAll();
    }

    async getSubCategoryByIdOrName(identifier: string | number) {
        const whereCondition = isNaN(Number(identifier)) ? { name: identifier as string } : { id: Number(identifier) };
        const subCategory = await SubCategory.findOne({ where: whereCondition });
        if (!subCategory) {
          throw new HttpException(404, 'SubCategory not found');
        }
        return subCategory;
    }

    async getSubCategoriesByCategory(categoryId: number) {
        if(!categoryId) {
            throw new HttpException(400, 'Please provide a valid category id');
        }
        return SubCategory.findAll({ where: { category_id: categoryId } });
    }

    async updateSubCategory(id: number, data: SubCategoryAttributes) {
        const subCategory = await SubCategory.findByPk(id);
        if (!subCategory) {
          throw new HttpException(404, 'SubCategory not found');
        }
        return subCategory.update(data);
    }
}

export default new SubCategoryService();