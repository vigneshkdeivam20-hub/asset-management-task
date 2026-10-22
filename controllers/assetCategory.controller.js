const { AssetCategory } = require('../models');

exports.list = async (req, res) => {
  try {
    const categories = await AssetCategory.findAll();
    res.render('assetCategories/list', { categories });
  } catch (err) {
    console.error('Error fetching asset categories:', err);
    res.render('assetCategories/list', { categories: [], error: 'Failed to load asset categories.' });
  }
};

exports.create = (req, res) => {
  res.render('assetCategories/create');
};

exports.store = async (req, res) => {
  try {
    const categoryData = {
      name: req.body.name
    };

    const category = await AssetCategory.create(categoryData);
    res.redirect('/asset-categories');
  } catch (err) {
    console.error('Error creating asset category:', err);
    res.render('assetCategories/create', { error: err.message, category: req.body });
  }
};

exports.edit = async (req, res) => {
  try {
    const category = await AssetCategory.findByPk(req.params.id);
    res.render('assetCategories/edit', { category });
  } catch (err) {
    console.error('Error fetching asset category:', err);
    res.redirect('/asset-categories');
  }
};

exports.update = async (req, res) => {
  try {
    const category = await AssetCategory.findByPk(req.params.id);
    await category.update(req.body);
    res.redirect('/asset-categories');
  } catch (err) {
    console.error('Error updating asset category:', err);
    res.render('assetCategories/edit', { category: await AssetCategory.findByPk(req.params.id), error: err.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    await AssetCategory.destroy({ where: { id: req.params.id } });
    res.redirect('/asset-categories');
  } catch (err) {
    console.error('Error deleting asset category:', err);
    res.redirect('/asset-categories');
  }
};

exports.search = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const categories = await AssetCategory.findAll({
      where: { name: { [Op.iLike]: `%${searchTerm}%` } }
    });
    res.render('assetCategories/list', { categories });
  } catch (err) {
    console.error('Error searching asset categories:', err);
    res.render('assetCategories/list', { categories: [], error: 'Failed to search asset categories.' });
  }
};