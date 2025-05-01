'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      price: {
        type: Sequelize.JSONB,
        allowNull: false,
        comment: 'Product price information including current price, currency, and deals'
      },
      specifications: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: 'Product specifications and features'
      },
      ratings: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: 'Product ratings and reviews information'
      },
      shipping: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: 'Shipping information and options'
      },
      identifiers: {
        type: Sequelize.JSONB,
        allowNull: false,
        comment: 'Product identifiers including ASIN and URL'
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Base64 encoded product image'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('Products', ['identifiers'], {
      name: 'products_identifiers_idx',
      using: 'GIN'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
}; 