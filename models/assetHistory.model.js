module.exports = (sequelize, DataTypes) => {
  const AssetHistory = sequelize.define('AssetHistory', {
    assetId: {
      type: DataTypes.INTEGER,
      field: 'asset_id',
      allowNull: false,
      references: {
        model: 'assets',
        key: 'id'
      }
    },
    eventType: {
      type: DataTypes.STRING(20),
      field: 'event_type',
      allowNull: false,
      validate: {
        isIn: {
          args: [['purchased', 'issued', 'returned', 'scrapped', 'maintenance']],
          msg: "Event type must be one of: purchased, issued, returned, scrapped, maintenance"
        }
      }
    },
    eventDate: {
      type: DataTypes.DATE,
      field: 'event_date',
      defaultValue: DataTypes.NOW
    },
    employeeId: {
      type: DataTypes.INTEGER,
      field: 'employee_id',
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      field: 'assignment_id',
      allowNull: true,
      references: {
        model: 'asset_assignments',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description',
      allowNull: false
    },
    performedBy: {
      type: DataTypes.INTEGER,
      field: 'performed_by',
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    }
  }, {
    tableName: 'asset_history',
    timestamps: false,
    indexes: [
      { fields: ['assetId', 'eventDate'], unique: false }
    ]
  });

  AssetHistory.associate = (models) => {
    AssetHistory.belongsTo(models.Asset, { foreignKey: 'assetId' });
    AssetHistory.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'Employee' });
    AssetHistory.belongsTo(models.Employee, { foreignKey: 'performedBy', as: 'PerformedBy' });
    AssetHistory.belongsTo(models.AssetAssignment, { foreignKey: 'assignmentId' });
  };

  return AssetHistory;
};