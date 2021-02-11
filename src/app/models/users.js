const mongoose = require('mongoose');

const users = mongoose.Schema({
  name: { type: 'string', required: true },
  lastName: { type: 'string' },
  cpf: { type: 'string', required: true },
  email: { type: 'string', unique: true, required: true },
  password: { type: 'string' },
  avatar: { type: 'string' },
  avatar_url_path: { type: 'string' },
  active: Boolean,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
});

module.exports = mongoose.model('users', users);
