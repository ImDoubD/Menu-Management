import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export interface CategoryAttributes {
  id: number;
  name: string;
  image: string;
  description: string;
  tax_applicability: boolean;
  tax?: number;
  tax_type?: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public image!: string;
  public description!: string;
  public tax_applicability!: boolean;
  public tax?: number;
  public tax_type?: string;
}

Category.init({
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
    allowNull: false,
    defaultValue: false
  },
  tax: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  tax_type: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'category',
  hooks: {
    beforeCreate: (category) => {
      if (category.tax_applicability && (!category.tax || !category.tax_type)) {
        throw new Error('Tax and tax type are required when tax applicability is true');
      }
    }
  }
});

export default Category;