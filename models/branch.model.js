module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Branch name cannot be empty."
        }
      }
    },
    branch_code: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Branch code cannot be empty."
        }
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address cannot be empty."
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'branches',
    timestamps: true,
    paranoid: false 
  });

  Branch.associate = (models) => {
    Branch.hasMany(models.Asset, { foreignKey: 'branchId' });
    Branch.hasMany(models.Employee, { foreignKey: 'branchId' });
  };

  return Branch;
};