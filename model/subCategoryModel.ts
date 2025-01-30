import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Category from './categoryModel';

export interface SubCategoryAttributes {
  id: number;
  name: string;
  image: string;
  description: string;
  tax_applicability: boolean;
  tax?: number;
  category_id: number;
}

class SubCategory extends Model<SubCategoryAttributes> implements SubCategoryAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public description!: string;
  public tax_applicability!: boolean;
  public tax?: number;
  public category_id!: number;
}

SubCategory.init({
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
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'sub_category',
  hooks: {
    beforeCreate: async (subCategory) => {
      const category = await Category.findByPk(subCategory.category_id);
      if (!category) throw new Error('Parent category not found');
      
      if (subCategory.tax_applicability === undefined) {
        subCategory.tax_applicability = category.tax_applicability;
      }
      if (!subCategory.tax) {
        subCategory.tax = category.tax;
      }
    }
  }
});

// Associations
Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

export default SubCategory;