module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('history', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      assetId: {
        type: Sequelize.INTEGER,
        references: { model: 'assets', key: 'id' },
        onDelete: 'CASCADE',
      },
      eventType: {
        type: Sequelize.ENUM('purchased', 'issued', 'returned', 'scrapped'),
        allowNull: false,
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('history');
  },
};