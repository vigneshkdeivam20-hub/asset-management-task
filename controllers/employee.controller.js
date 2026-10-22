const { Employee } = require('..');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: ['Branch'],
      order: [['employeeCode', 'ASC']]
    });
    res.render('employees/list', { employees });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.render('employees/list', { employees: [], error: 'Failed to load employees.' });
  }
};

exports.create = (req, res) => {
  res.render('employees/create', { branches: [] });
};

exports.store = async (req, res) => {
  try {
    const employeeData = {
      employeeCode: req.body.employeeCode,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      status: req.body.status,
      branchId: req.body.branchId || null
    };

    const employee = await Employee.create(employeeData);
    res.redirect('/employees');
  } catch (err) {
    console.error('Error creating employee:', err);
    const branches = await require('..').Branch.findAll();
    res.render('employees/create', {
      error: err.message,
      branches: branches,
      employee: req.body
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: ['Branch']
    });
    const branches = await require('..').Branch.findAll();
    res.render('employees/edit', { employee, branches });
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.redirect('/employees');
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    res.redirect('/employees');
  } catch (err) {
    console.error('Error updating employee:', err);
    const branches = await require('..').Branch.findAll();
    res.render('employees/edit', {
      employee: await Employee.findByPk(req.params.id),
      branches: branches,
      error: err.message
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.redirect('/employees');
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.redirect('/employees');
  }
};

exports.search = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const employees = await Employee.findAll({
      where: {
        [Op.or]: [
          { employeeCode: { [Op.iLike]: `%${searchTerm}%` } },
          { firstName: { [Op.iLike]: `%${searchTerm}%` } },
          { lastName: { [Op.iLike]: `%${searchTerm}%` } },
          { email: { [Op.iLike]: `%${searchTerm}%` } }
        ]
      },
      include: ['Branch']
    });
    res.render('employees/list', { employees });
  } catch (err) {
    console.error('Error searching employees:', err);
    res.render('employees/list', { employees: [], error: 'Failed to search employees.' });
  }
};

exports.filterStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const employees = await Employee.findAll({
      where: { status },
      include: ['Branch']
    });
    res.render('employees/list', { employees });
  } catch (err) {
    console.error('Error filtering employees:', err);
    res.render('employees/list', { employees: [], error: 'Failed to filter employees.' });
  }
};