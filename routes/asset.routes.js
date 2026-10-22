const express = require('express');
const router = express.Router();
const assetController = require('../controllers/asset.controller');

router.get('/', assetController.list);
router.get('/search', assetController.search);
router.get('/category', assetController.filterByCategory);
router.get('/branch', assetController.filterByBranch);
router.get('/status', assetController.filterByStatus);
router.get('/create', assetController.create);
router.post('/create', assetController.store);
router.get('/:id/edit', assetController.edit);
router.post('/:id/update', assetController.update);
router.post('/:id/delete', assetController.destroy);
router.get('/:id/history', assetController.history);

module.exports = router;