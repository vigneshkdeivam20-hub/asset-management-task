module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('assignments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: { model: 'employees', key: 'id' },
        onDelete: 'CASCADE',
      },
      assetId: {
        type: Sequelize.INTEGER,
        references: { model: 'assets', key: 'id' },
        onDelete: 'CASCADE',
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM('active', 'returned'),
        defaultValue: 'active',
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
    await queryInterface.dropTable('assignments');
  },
};