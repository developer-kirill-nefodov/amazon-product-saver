import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: { notEmpty: true },
      },
      price: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: { notEmpty: true },
      },
      specifications: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      ratings: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: { average: 0 },
      },
      shipping: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      identifiers: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: { notEmpty: true },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      colors: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return Product;
};
