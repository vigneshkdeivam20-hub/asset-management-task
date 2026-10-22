
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      assetCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      serialNumber: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },

      make: {
        type: Sequelize.STRING,
        allowNull: false
      },

      model: {
        type: Sequelize.STRING,
        allowNull: false
      },

      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false
      },

      purchaseCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM(
          'available',
          'assigned',
          'scrapped'
        ),
        allowNull: false,
        defaultValue: 'available'
      },

      branchId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'branches',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'AssetCategories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('assets');

    // PostgreSQL: remove the ENUM type created for the status column.
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_assets_status";'
    );
  }
};
