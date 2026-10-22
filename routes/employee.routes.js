const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.list);
router.get('/search', employeeController.search);
router.get('/filter', employeeController.filterStatus);
router.get('/create', employeeController.create);
router.post('/create', employeeController.store);
router.get('/:id/edit', employeeController.edit);
router.post('/:id/update', employeeController.update);
router.post('/:id/delete', employeeController.destroy);

module.exports = router;