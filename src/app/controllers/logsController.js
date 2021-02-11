const logs = require('../models/logs');

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const responde = await logs.find({ account: id }).populate('user');
    return res.status(200).json({ data: responde });
  },
  async create(req, res) {
    const responde = await logs(req.body).save();
    return res.status(201).json({ data: responde });
  },
  async update(req, res) {
    const { id } = req.params;
    const responde = await logs.updateOne({ account: id }, req.body);
    return res.status(200).json({ data: responde });
  },
};
