import ProductModel from './Product';
import sequelize from '../config/database';

const Product = ProductModel(sequelize);

export { sequelize, Product }; 