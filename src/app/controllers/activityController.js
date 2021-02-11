/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
const moment = require('moment');
const activity = require('../models/activities');
const logs = require('../models/logs');

'moment/locale/pt-br';

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const response = await activity.find({ account: id, active: true });

    return res.status(200).json({ data: response });
  },
  async store(req, res) {
    try {
      const activityExit = await activity.findOne({ day: req.body.day, startTime: req.body.startTime });
      if (activityExit) {
        return res.status(404).json({ error: 'Você já tem uma atividade agendada nesta data e hora!' });
      }

      const log = {
        type: 'agendou uma nova atividade',
        date: `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`,
        account: req.body.account,
        user: req.body.user,
        done: false,
        data: req.body,
      };
      const createdactivity = await activity(req.body).save();
      await logs(log).save();
      return res.status(201).json({ data: createdactivity });
    } catch (error) {
      return res.status(404).json({ error: 'Dados incompletos' });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const verifyActivity = await activity.findOne({ _id: id });

    if (!verifyActivity) {
      return res.status(400).json({ error: 'Atividade não localizada' });
    }

    await activity.updateOne({ _id: id }, req.body);
    return res.status(200).json({ data: 'Atualizado com sucesso' });
  },
  async remove(req, res) {
    const { id } = req.params;
    const response = await activity.findOne({ _id: id });

    if (!response) {
      res.status(400).json({ error: 'Atividade não localizada' });
    }

    await activity.updateOne({ _id: id }, { active: false });
    return res.status(200).json({ data: 'Removido com sucesso' });
  },
};
