/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
const moment = require('moment');
const voter = require('../models/voters');
const logs = require('../models/logs');
const uploadFirebase = require('../../config/storage');

'moment/locale/pt-br';

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const response = (await voter.find({ account: id, active: true }).sort({ name: -1 }));
    return res.status(200).json({ data: response });
  },
  async store(req, res) {
    try {
      await uploadFirebase.uploadFile(req);

      const log = {
        type: 'adicionou um novo usuário',
        date: `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`,
        account: req.body.account,
        user: req.body.user,
        done: false,
        data: req.body,
      };

      req.body.active = true;
      const createdVoter = await voter(req.body).save();
      await logs(log).save();

      if (req.connectUsers.includes(req.body.account)) {
        const socket = req.io;
        const data = {
          message: `${req.body.userName} acabou de adiconar um novo usuário !`,
          account: req.body.account,
        };
        socket.emit('activity', data);
      }
      return res.status(201).json({ data: createdVoter });
    } catch (error) {
      return res.status(404).json({ error: 'Dados incompletos' });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const verefyVoter = await voter.findOne({ _id: id });

      if (!verefyVoter) {
        return res.status(404).json({ error: 'Colaborador não localizado' });
      }
      await uploadFirebase.updateFile(req);
      await voter.updateOne({ _id: id }, req.body);
      const response = await voter.findOne({ _id: id });
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(404).json({ error: 'Identificador não informado!' });
    }
  },
  async remove(req, res) {
    try {
      const { id } = req.params;

      const voterVerefy = await voter.findOne({ _id: id });
      if (!voterVerefy) {
        return res.status(404).json({ error: 'Colaborador não localizado' });
      }

      await voter.updateOne({ _id: id }, { active: false });
      return res.status(200).json({ data: 'Usuário removido com sucesso!' });
    } catch (error) {
      return res.status(404).json({ error: 'Identificador não informado!' });
    }
  },
};
