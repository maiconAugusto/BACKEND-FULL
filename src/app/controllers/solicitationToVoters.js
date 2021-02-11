/* eslint-disable no-underscore-dangle */
const employeeHistory = require('../models/employeeHistory');

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const situation = 'pending';
    const response = await employeeHistory.find({
      voter: id,
      active: true,
      isSolicitation: true,
      situation,
    }).populate('user');
    return res.status(200).json({ data: response });
  },
};
