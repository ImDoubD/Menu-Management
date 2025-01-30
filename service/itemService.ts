import { Op } from 'sequelize';
import Item, { ItemAttributes } from '../model/itemModel';
import { HttpException } from '../utils/errorUtils';

class ItemService {
    async createItem(data: ItemAttributes) {
        try{
            if(!data.category_id && !data.sub_category_id){
                throw new HttpException(400, 'Item must belong to either a category or subcategory');
            }
            data.total_amount = data.base_amount - data.discount;
            return await Item.create(data);
        }catch(error){
            if ((error as Error).name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(409, 'Item name already exists');
              }
              throw new HttpException(400, (error as Error).message);
        }
    }

    async getAllItems() {
        return Item.findAll();
    }

    async getItemByIdOrName(identifier: string | number) {
        const whereCondition = isNaN(Number(identifier)) ? { name: identifier as string } : { id: Number(identifier) };
        const item = await Item.findOne({ where: whereCondition });
        if (!item) {
          throw new HttpException(404, 'Item not found');
        }
        return item;
    }

    async getItemsByCategory(categoryId: number) {
        if(!categoryId) {
            throw new HttpException(400, 'Please provide a valid category id');
        }
        return Item.findAll({ where: { category_id: categoryId } });
    }

    async getItemsBySubCategory(subCategoryId: number) {
        if(!subCategoryId) {
            throw new HttpException(400, 'Please provide a valid subcategory id');
        }
        return Item.findAll({ where: { sub_category_id: subCategoryId } });
    }

    async updateItem (id: number, data: ItemAttributes) {
        const item = await Item.findByPk(id);
        if (!item) {
          throw new HttpException(404, 'Item not found');
        }
        if (data.base_amount || data.discount) {
            data.total_amount = (data.base_amount || item.base_amount) - (data.discount || item.discount);
        }
        return item.update(data);
    }

    async searchItems(name: string) {
        if(!name){
            throw new HttpException(400, 'Please provide a valid item name');
        }
        return Item.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } });
    }
}

export default new ItemService();