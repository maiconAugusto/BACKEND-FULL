const bcrypt = require('bcrypt');
const users = require('../models/users');
const uploadFirebase = require('../../config/storage');

module.exports = {
  async index(req, res) {
    const response = await users.find().populate('account');
    return res.status(200).json({ data: response });
  },
  async store(req, res) {
    const { email, password } = req.body;
    const { id } = req.params;
    const userExits = await users.findOne({ email });

    if (userExits) {
      return res.status(404).json({ error: 'Usuário já cadastrado!' });
    }
    await uploadFirebase.uploadFile(req);

    req.body.password = await bcrypt.hash(password, bcrypt.genSaltSync(8));
    req.body.active = true;
    req.body.account = id;

    const user = await users(req.body).save();
    return res.status(201).json({ data: user });
  },
  async update(req, res) {
    const { id } = req.params;

    if (!await users.findOne({ _id: id })) {
      return res.status(404).json({ data: 'Usuário não encontrado!' });
    }

    await uploadFirebase.updateFile(req);
    await users.updateOne({ _id: id }, req.body);
    const response = await users.findOne({ _id: id });
    return res.status(200).json({ data: response });
  },
  async remove(req, res) {
    const { id } = req.params;

    const userVerefy = await users.findOne({ _id: id });
    if (!userVerefy) {
      return res.status(400).json({ error: 'Colaborador não localizado' });
    }

    await users.updateOne({ _id: id }, { active: false });
    return res.status(200).json({ data: 'Atualizado com sucesso' });
  },
};
