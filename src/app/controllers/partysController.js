/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const party = require('../models/party');

module.exports = {
  async index(req, res) {
    const response = await party.find({ active: true });
    return res.status(200).json({ data: response });
  },
  async show(req, res) {
    const response = await party.findOne({ _id: req.body._id });
    if (!response) {
      return res.status(200).json({ data: 'Sigla não localizada!' });
    }
    return res.status(200).json({ data: response });
  },
  async store(req, res) {
    try {
      const activityExit = await party.findOne({ sigla: req.body.sigla, name: req.body.name });
      if (activityExit) {
        return res.status(404).json({ error: 'Sigla ja cadastrada!' });
      }
      const createSigla = await party(req.body).save();
      return res.status(201).json({ data: createSigla });
    } catch (error) {
      return res.status(404).json({ error: 'Dados incompletos' });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const verifySigla = await party.findOne({ _id: id });

    if (!verifySigla) {
      return res.status(400).json({ error: 'Sigla não localizada' });
    }

    await party.updateOne({ _id: id }, req.body);
    return res.status(200).json({ data: 'Atualizado com sucesso' });
  },
  async remove(req, res) {
    const { id } = req.params;
    const response = await party.findOne({ _id: id });

    if (!response) {
      res.status(400).json({ error: 'Sigla não localizada' });
    }

    await party.updateOne({ _id: id }, { active: false });
    return res.status(200).json({ data: 'Removido com sucesso' });
  },
};
