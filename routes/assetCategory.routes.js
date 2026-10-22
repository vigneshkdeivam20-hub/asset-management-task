const express = require('express');
const router = express.Router();
const assetCategoryController = require('../controllers/assetCategory.controller');

router.get('/', assetCategoryController.list);
router.get('/search', assetCategoryController.search);
router.get('/create', assetCategoryController.create);
router.post('/create', assetCategoryController.store);
router.get('/:id/edit', assetCategoryController.edit);
router.post('/:id/update', assetCategoryController.update);
router.post('/:id/delete', assetCategoryController.destroy);

module.exports = router;