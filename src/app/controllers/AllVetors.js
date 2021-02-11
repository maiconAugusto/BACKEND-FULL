const voters = require('../models/voters');

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;
      const total = await voters.count({ accountId: id, active: true });
      return res.status(200).json({ data: total });
    } catch (error) {
      return res.status(404).json({ error: 'Id não enviado na requisição!' });
    }
  },
  async filter(req, res) {
    const { id, page } = req.params;

    const limit = 20;
    const offset = (0 + page) * limit;

    const response = await voters.findAndCountAll({
      offset,
      limit,
      where: {
        accountId: id,
        active: true,
      },
    });
    return res.status(200).json({ data: response });
  },
};
