const mongoose = require('mongoose');

const account = mongoose.Schema({
  cpf: { type: 'string' },
  name: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string', required: true, unique: true },
  password: { type: 'string' },
  active: Boolean,
  initialDate: { type: 'string' },
  finalDate: { type: 'string' },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cities',
    required: true,
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partys',
    required: true,
  },
});
module.exports = mongoose.model('accounts', account);
