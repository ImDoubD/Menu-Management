import Category, { CategoryAttributes } from "../model/categoryModel";
import { HttpException } from "../utils/errorUtils";

class CategoryService {
    async createCategory(data: CategoryAttributes) {
        try{
            if(data.tax_applicability && (!data.tax || !data.tax_type)){
                throw new HttpException(400, 'Tax and tax type is required when tax applicability is true.');
            }
            return await Category.create(data);
        }catch(error){
            if ((error as Error).name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(409, 'Category name already exists');
              }
              throw new HttpException(400, (error as Error).message);
        }
    }

    async getAllCategories() {
        return Category.findAll();
    }

    async getCategoryByIdOrName(identifier: string | number) {
        const whereCondition = isNaN(Number(identifier)) ? { name: identifier as string } : { id: Number(identifier) };
        const category = await Category.findOne({ where: whereCondition });
        if (!category) {
          throw new HttpException(404, 'Category not found');
        }
        return category;
    }

    async updateCategory(id: number, data: CategoryAttributes) {
        const category = await Category.findByPk(id);
        if (!category) {
          throw new HttpException(404, 'Category not found');
        }
        if (data.tax_applicability && (!data.tax || !data.tax_type)) {
          throw new HttpException(400, 'Tax and tax type are required when tax applicability is true');
        }
        
        return category.update(data);
    }
}

export default new CategoryService();