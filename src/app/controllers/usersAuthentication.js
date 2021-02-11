const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const secret = require('../../config/hash');

module.exports = {
  async index(req, res) {
    try {
      const { email, password } = req.body;

      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      if (user.active === false) {
        return res.status(401).json({ error: 'Está conta foi desativada!' });
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (verifyPassword === false) {
        return res.status(401).json({ data: 'Senha inválida' });
      }
      const { id } = user;
      user.password = undefined;

      return res.status(200).json({
        user,
        token: jwt.sign({ id }, secret.hash, { expiresIn: secret.expiresIn }),
      });
    } catch (error) {
      return res.status(404).json({ error: 'Dados incompletos' });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    const Exist = await users.findOne({ _id: id });

    if (!Exist) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    const verifyPassword = await bcrypt.compare(password, Exist.password);

    if (!verifyPassword) {
      return res.status(404).json({ error: 'Senha atual está errada!' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, bcrypt.genSaltSync(8));

    await users.updateOne({ _id: id }, { password: newPasswordHash });
    return res.status(200).json({ data: 'Senha atualizada com sucesso' });
  },
};
