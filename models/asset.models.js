module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    assetCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Asset code cannot be empty."
        }
      }
    },
    serialNumber: {
      type: DataTypes.STRING(100),
      unique: true,
      validate: {
        is: {
          args: /^[A-Za-z0-9\-]+$/,
          msg: "Serial number can only contain letters, numbers, and hyphens."
        }
      }
    },
    assetName: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    make: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Make cannot be empty."
        }
      }
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Model cannot be empty."
        }
      }
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Purchase date must be a valid date."
        }
      }
    },
    purchaseCost: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "Purchase cost must be a valid number."
        },
        min: {
          args: [0],
          msg: "Purchase cost cannot be negative."
        }
      }
    },
    warrantyExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available', 'assigned', 'scrapped'),
      defaultValue: 'available'
    },
    scrapDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scrapReason: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'assets',
    timestamps: true,
    paranoid: false
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Branch, { foreignKey: 'branchId' });
    Asset.belongsTo(models.AssetCategory, { foreignKey: 'categoryId' });
    Asset.hasMany(models.AssetAssignment, { foreignKey: 'assetId' });
    Asset.hasMany(models.AssetHistory, { foreignKey: 'assetId' });
  };

  return Asset;
};