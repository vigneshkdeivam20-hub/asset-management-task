const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/', stockController.list);

module.exports = router;