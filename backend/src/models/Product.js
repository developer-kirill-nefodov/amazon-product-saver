import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    price: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    specifications: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    shipping: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    identifiers: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true
  });

  return Product;
}; 