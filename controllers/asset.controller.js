const { Asset, AssetCategory, Branch } = require('../models');
const { Op } = require('sequelize');

exports.list = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      include: ['AssetCategory', 'Branch']
    });
    res.render('assets/list', { assets });
  } catch (err) {
    console.error('Error fetching assets:', err);
    res.render('assets/list', { assets: [], error: 'Failed to load assets.' });
  }
};

exports.create = async (req, res) => {
  try {
    const categories = await AssetCategory.findAll();
    const branches = await Branch.findAll();
    res.render('assets/create', { categories, branches });
  } catch (err) {
    console.error('Error fetching categories and branches:', err);
    res.redirect('/assets');
  }
};

exports.store = async (req, res) => {
  try {
    const assetData = {
      assetCode: req.body.assetCode,
      serialNumber: req.body.serialNumber,
      make: req.body.make,
      model: req.body.model,
      categoryId: req.body.categoryId,
      branchId: req.body.branchId,
      purchaseDate: req.body.purchaseDate,
      purchaseCost: req.body.purchaseCost,
      status: req.body.status
    };

    const asset = await Asset.create(assetData);
    res.redirect('/assets');
  } catch (err) {
    console.error('Error creating asset:', err);
    const categories = await AssetCategory.findAll();
    const branches = await Branch.findAll();
    res.render('assets/create', {
      error: err.message,
      categories: categories,
      branches: branches,
      asset: req.body
    });
  }
};

exports.edit = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: ['AssetCategory', 'Branch']
    });
    const categories = await AssetCategory.findAll();
    const branches = await Branch.findAll();
    res.render('assets/edit', { asset, categories, branches });
  } catch (err) {
    console.error('Error fetching asset:', err);
    res.redirect('/assets');
  }
};

exports.update = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    await asset.update(req.body);
    res.redirect('/assets');
  } catch (err) {
    console.error('Error updating asset:', err);
    const categories = await AssetCategory.findAll();
    const branches = await Branch.findAll();
    res.render('assets/edit', {
      asset: await Asset.findByPk(req.params.id),
      categories: categories,
      branches: branches,
      error: err.message
    });
  }
};

exports.destroy = async (req, res) => {
  try {
    await Asset.destroy({ where: { id: req.params.id } });
    res.redirect('/assets');
  } catch (err) {
    console.error('Error deleting asset:', err);
    res.redirect('/assets');
  }
};

exports.search = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const assets = await Asset.findAll({
      where: {
        [Op.or]: [
          { assetCode: { [Op.iLike]: `%${searchTerm}%` } },
          { serialNumber: { [Op.iLike]: `%${searchTerm}%` } },
          { make: { [Op.iLike]: `%${searchTerm}%` } },
          { model: { [Op.iLike]: `%${searchTerm}%` } }
        ]
      },
      include: ['AssetCategory', 'Branch']
    });
    res.render('assets/list', { assets });
  } catch (err) {
    console.error('Error searching assets:', err);
    res.render('assets/list', { assets: [], error: 'Failed to search assets.' });
  }
};

exports.filterByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const assets = await Asset.findAll({
      where: { categoryId },
      include: ['AssetCategory', 'Branch']
    });
    res.render('assets/list', { assets });
  } catch (err) {
    console.error('Error filtering assets by category:', err);
    res.render('assets/list', { assets: [], error: 'Failed to filter assets.' });
  }
};

exports.filterByBranch = async (req, res) => {
  try {
    const { branchId } = req.query;
    const assets = await Asset.findAll({
      where: { branchId },
      include: ['AssetCategory', 'Branch']
    });
    res.render('assets/list', { assets });
  } catch (err) {
    console.error('Error filtering assets by branch:', err);
    res.render('assets/list', { assets: [], error: 'Failed to filter assets.' });
  }
};

exports.filterByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const assets = await Asset.findAll({
      where: { status },
      include: ['AssetCategory', 'Branch']
    });
    res.render('assets/list', { assets });
  } catch (err) {
    console.error('Error filtering assets by status:', err);
    res.render('assets/list', { assets: [], error: 'Failed to filter assets.' });
  }
};

exports.history = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id, {
      include: [AssetHistory],
      order: [['AssetHistory', 'timestamp', 'DESC']]
    });
    if (!asset) {
      return res.status(404).render('assets/history', { error: 'Asset not found.' });
    }
    res.render('assets/history', { asset });
  } catch (err) {
    console.error('Error fetching asset history:', err);
    res.render('assets/history', { error: 'Failed to load asset history.' });
  }
};
