module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      assetCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      serialNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      make: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'asset_categories', key: 'id' },
        onDelete: 'CASCADE',
      },
      branchId: {
        type: Sequelize.INTEGER,
        references: { model: 'branches', key: 'id' },
        onDelete: 'SET NULL',
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      purchaseCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('available', 'assigned', 'scrapped'),
        defaultValue: 'available',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('assets');
  },
};