module.exports = (sequelize, DataTypes) => {
  const AssetAssignment = sequelize.define('AssetAssignment', {
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'issued_at',
      defaultValue: DataTypes.NOW
    },
    issuedBy: {
      type: DataTypes.INTEGER,
      field: 'issued_by',
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    returnedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'id'
      }
    },
    returnReason: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    returnNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    returnDate: {
      type: DataTypes.DATE,
      field: 'returned_at',
      allowNull: true
    },
    returnReason: {
      type: DataTypes.STRING(30),
      field: 'return_reason',
      allowNull: true
    },
    returnNotes: {
      type: DataTypes.TEXT,
      field: 'return_notes',
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'returned'),
      defaultValue: 'active'
    }
  }, {
    tableName: 'asset_assignments',
    timestamps: true,
    paranoid: false
  });

  AssetAssignment.associate = (models) => {
    AssetAssignment.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    AssetAssignment.belongsTo(models.Asset, { foreignKey: 'assetId' });
    AssetAssignment.belongsTo(models.Employee, { foreignKey: 'issuedBy', as: 'IssuedBy' });
    AssetAssignment.belongsTo(models.Employee, { foreignKey: 'returnedBy', as: 'ReturnedBy' });
  };

  return AssetAssignment;
};