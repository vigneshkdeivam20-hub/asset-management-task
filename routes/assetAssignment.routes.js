const express = require('express');
const router = express.Router();
const assetAssignmentController = require('../controllers/assetAssignment.controller');

router.post('/issue', assetAssignmentController.issue);
router.post('/return', assetAssignmentController.return);
router.post('/scrap', assetAssignmentController.scrap);

module.exports = router;