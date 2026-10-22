module.exports = (sequelize, DataTypes) => {
  const AssetCategory = sequelize.define('AssetCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Category name cannot be empty."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'asset_categories',
    timestamps: true,
    paranoid: false
  });

  AssetCategory.associate = (models) => {
    AssetCategory.hasMany(models.Asset, { foreignKey: 'categoryId' });
  };

  return AssetCategory;
};