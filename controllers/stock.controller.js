const { Asset, Branch } = require('..');

exports.list = async (req, res) => {
  try {
    const availableAssets = await Asset.findAll({
      where: { status: 'available' },
      include: ['AssetCategory', 'Branch'],
      attributes: [
        'id',
        'assetCode',
        'serialNumber',
        'make',
        'model',
        'purchaseCost',
        'AssetCategory.name',
        'Branch.name'
      ]
    });

    const totalValue = availableAssets.reduce((sum, asset) => sum + asset.purchaseCost, 0);

    const stockByBranch = availableAssets.reduce((grouped, asset) => {
      if (!grouped[asset.Branch.name]) {
        grouped[asset.Branch.name] = [];
      }
      grouped[asset.Branch.name].push(asset);
      return grouped;
    }, {});

    res.render('stock/index', { stockByBranch, totalValue });
  } catch (err) {
    console.error('Error fetching available stock:', err);
    res.render('stock/index', { error: 'Failed to load available stock.' });
  }
};