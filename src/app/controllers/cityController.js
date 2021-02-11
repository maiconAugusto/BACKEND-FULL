const city = require('../models/city');

module.exports = {
  async index(req, res) {
    const response = await city.find();
    return res.status(200).json({ data: response });
  },
  async show(req, res) {
    const { id } = req.params;
    const response = await city.findOne({ _id: id });
    if (!response) {
      return res.status(404).json({ data: 'Cidade não localizada.' });
    }
    return res.status(200).json({ data: response });
  },
  async create(req, res) {
    const response = await city(req.body).save();
    return res.status(201).json({ data: response });
  },
  async update(req, res) {
    const { id } = req.params;
    const response = await city.findOne({ _id: id });
    if (!response) {
      return res.status(404).json({ data: 'Cidade não localizada.' });
    }
    await city.updateOne({ _id: id }, req.body);
    return res.status(200).json({ data: 'Atualizado com sucesso.' });
  },
  async delete(req, res) {
    const { id } = req.params;
    const response = await city.findOne({ _id: id });
    if (!response) {
      return res.status(404).json({ data: 'Cidade não localizada.' });
    }
    await city.updateOne({ _id: id }, { active: false });
    return res.status(200).json({ data: 'Deletado com sucesso.' });
  },
};
