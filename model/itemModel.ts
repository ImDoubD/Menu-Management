import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Category from './categoryModel';
import SubCategory from './subCategoryModel';

export interface ItemAttributes {
  id: number;
  name: string;
  image: string;
  description: string;
  tax_applicability: boolean;
  tax?: number;
  base_amount: number;
  discount: number;
  total_amount: number;
  category_id?: number;
  sub_category_id?: number;
}

class Item extends Model<ItemAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public description!: string;
  public tax_applicability!: boolean;
  public tax?: number;
  public base_amount!: number;
  public discount!: number;
  public total_amount!: number;
  public category_id?: number;
  public sub_category_id?: number;
}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tax_applicability: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  tax: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  base_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  },
  sub_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: SubCategory,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'item',
  hooks: {
    beforeValidate: async (item) => {
      if (!item.category_id && !item.sub_category_id) {
        throw new Error('Item must belong to either a category or subcategory');
      }

      const category = await Category.findByPk(item.category_id);
      const subCategory = await SubCategory.findByPk(item.sub_category_id);
      // if(!item.tax_applicability){
      //   item.tax_applicability = (category?.tax_applicability ?? false ) || (subCategory?.tax_applicability ?? false);
      // }
      if (!item.tax_applicability) {
        if (subCategory?.tax_applicability) {
          item.tax_applicability = true;
          item.tax = subCategory.tax;
        } else if (category?.tax_applicability) {
            item.tax_applicability = true;
            item.tax = category.tax;
        }
    }

      item.total_amount = item.base_amount - item.discount;
    }
  }
});

// Associations
Category.hasMany(Item, { foreignKey: 'category_id' });
Item.belongsTo(Category, { foreignKey: 'category_id' });
SubCategory.hasMany(Item, { foreignKey: 'sub_category_id' });
Item.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

export default Item;