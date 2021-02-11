/* eslint-disable no-unused-expressions */
const bcrypt = require('bcrypt');
const account = require('../models/account');
const uploadFirebase = require('../../config/storage');

'moment/locale/pt-br';

module.exports = {
  async index(req, res) {
    const response = await account.find().populate(['city', 'party']);
    return res.status(200).json({ data: response });
  },
  async store(req, res) {
    const { email, password } = req.body;
    const userExits = await account.findOne({ email });

    if (userExits) {
      return res.status(404).json({ error: 'Conta já cadastrada para este e-mail' });
    }

    req.body.password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
    req.body.active = true;
    req.body.isAdmin = true;
    await uploadFirebase.uploadFile(req);

    const user = await account(req.body).save();
    return res.status(201).json({ data: user });
  },
  async update(req, res) {
    const { id } = req.params;

    await account.updateOne({ _id: id }, req.body);
    return res.status(200).json({ data: 'Atualizado com sucesso' });
  },
  async remove(req, res) {
    const { id } = req.params;
    await account.updateOne({ _id: id }, { active: false });
    return res.status(200).json({ data: 'Conta desativada com sucesso' });
  },
};
