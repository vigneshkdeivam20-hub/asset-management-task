const { Asset, Employee, AssetAssignment, AssetHistory } = require('..');
const { Transaction } = require('sequelize');

exports.issue = async (req, res) => {
  const t = await Transaction.start();
  try {
    const asset = await Asset.findByPk(req.body.assetId, { transaction: t });
    const employee = await Employee.findByPk(req.body.employeeId, { transaction: t });

    if (!asset || !employee || asset.status !== 'available' || employee.status !== 'active') {
      throw new Error('Asset not available or employee not active.');
    }

    await Asset.update({ status: 'assigned' }, { transaction: t });
    const assignment = await AssetAssignment.create({
      assetId: asset.id,
      employeeId: employee.id,
      issueDate: new Date()
    }, { transaction: t });

    const historyEntry = await AssetHistory.create({
      assetId: asset.id,
      eventType: 'ISSUE',
      details: `Assigned to employee ${employee.employeeCode}.`,
    });

    await t.commit();
    res.redirect('/assets');
  } catch (err) {
    await t.rollback();
    console.error('Error issuing asset:', err);
    res.render('assets/issue', { error: err.message });
  }
};

exports.return = async (req, res) => {
  const t = await Transaction.start();
  try {
    const assignment = await AssetAssignment.findByPk(req.body.assignmentId, { transaction: t });
    const asset = await Asset.findByPk(assignment.assetId, { transaction: t });

    if (!assignment || assignment.status !== 'active') {
      throw new Error('Assignment not found or already returned.');
    }

    await Asset.update({ status: 'available' }, { transaction: t });
    await assignment.update({
      returnDate: new Date(),
      status: 'returned'
    }, { transaction: t });

    const historyEntry = await AssetHistory.create({
  assetId: asset.id,
  eventType: 'RETURN',
  details: `Returned by employee ${employee.employeeCode}. Reason: ${reason}.`,
});

    await t.commit();
    res.redirect('/assets');
  } catch (err) {
    await t.rollback();
    console.error('Error returning asset:', err);
    res.render('assets/return', { error: err.message });
  }
};

exports.scrap = async (req, res) => {
  const t = await Transaction.start();
  try {
    const asset = await Asset.findByPk(req.body.assetId, { transaction: t });

    if (!asset || asset.status === 'scrapped') {
      throw new Error('Asset not found or already scrapped.');
    }

    await Asset.update({
      status: 'scrapped'
    }, { transaction: t });

    const historyEntry = await AssetHistory.create({
  assetId: asset.id,
  eventType: 'SCRAP',
  details: `Scrapped by ${userId}. Reason: ${reason}.`,
});

    await t.commit();
    res.redirect('/assets');
  } catch (err) {
    await t.rollback();
    console.error('Error scrapping asset:', err);
    res.render('assets/scrap', { error: err.message });
  }
};