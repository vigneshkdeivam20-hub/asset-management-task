require('dotenv').config({
  path: require('path').resolve(__dirname, '.env')
});
const express = require('express');
const path = require('path');
const rootPath = path.resolve(__dirname, '..');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'jade');
app.set('views', './views');

// Routes
const employeeRoutes = require('./routes/employee.routes');
const assetCategoryRoutes = require('./routes/assetCategory.routes');
const assetRoutes = require('./routes/asset.routes');
const stockRoutes = require('./routes/stock.routes');
const assetAssignmentRoutes = require('./routes/assetAssignment.routes');

app.use('/employees', employeeRoutes);
app.use('/asset-categories', assetCategoryRoutes);
app.use('/assets', assetRoutes);
app.use('/stock', stockRoutes);
app.use('/asset-assignments', assetAssignmentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});