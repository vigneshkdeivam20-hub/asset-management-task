module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    employeeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    joining_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  }, {
    hooks: {
      beforeCreate: (employee) => {
        if (!employee.branchId) {
          employee.branchId = null;
        }
      },
    },
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Branch, { foreignKey: 'branchId' });
  };

  return Employee;
};