/* eslint-disable no-unused-expressions */
const moment = require('moment');
const employeeHistory = require('../models/employeeHistory');
const logs = require('../models/logs');

'moment/locale/pt-br';

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;
      const response = await employeeHistory.find({ voter: id, active: true }).populate('user');
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(400).json({ error: 'Identificadores não informado!' });
    }
  },
  async store(req, res) {
    try {
      const response = await employeeHistory(req.body).save();
      if (req.connectUsers.includes(req.body.account)) {
        const socket = req.io;
        const data = {
          message: `${req.body.name} acabou de adiconar um histórico a um usuário!`,
          account: req.body.account,
        };
        socket.emit('activity', data);
      }

      const log = {
        type: 'adicionou um histórico/solicitação',
        date: `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`,
        account: req.body.account,
        user: req.body.user,
        done: false,
        data: req.body,
      };
      await logs(log).save();

      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(400).json({ error: 'Dados não informados!' });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!await employeeHistory.findOne({ _id: id })) {
        return res.status(404).json({ error: 'Histórico não encontrado!' });
      }
      //   const log = {
      //     type: 'Atualizou um histórico/solicitação',
      //     date: `${moment().format('DD/MM/YYYY')} ${moment().format('LTS')}`,
      //     account: req.body.account,
      //     user: req.body.user,
      //     done: false,
      //     data: req.body,
      //   };
      //   await logs(log).save();
      await employeeHistory.updateOne({ _id: id }, { situation: req.body.situation });
      return res.status(200).json({ data: 'Histórico editado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ error: 'Identificadores não informado!' });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!await employeeHistory.findOne({ _id: id })) {
        return res.status(404).json({ error: 'Histórico não encontrado!' });
      }
      await employeeHistory.updateOne({ _id: id }, { active: false });
      return res.status(200).json({ data: 'Histórico deletado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ error: 'Identificadores não informado!' });
    }
  },
};
