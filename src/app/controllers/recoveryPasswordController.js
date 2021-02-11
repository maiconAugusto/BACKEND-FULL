/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const _hash = require('../../config/newHash');
const user = require('../models/users');
const nodeMailer = require('../../config/mail');

module.exports = {
  async update(req, res) {
    const { email } = req.body;
    const userExist = await user.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ error: 'E-mail não encontrado' });
    }
    const hash = _hash.hash();
    const newPassword = await bcrypt.hash(hash, bcrypt.genSaltSync(8));
    await user.updateOne({ _id: userExist._id }, { password: newPassword });

    (await nodeMailer).sendMail({
      from: '"Equipe GESTÂO" <noreplay@gestao.com>',
      to: 'maicon.augusto.carvalho@hotmail.com',
      subject: 'Redefinação de senha ✔',
      template: 'recoveryPassword',
      text: 'Sua segurança é o nosso compromisso',
      context: {
        hash,
      },
    });
    return res.status(200).json({ data: 'Recuperação de senha solicitada com sucesso!' });
  },
};
