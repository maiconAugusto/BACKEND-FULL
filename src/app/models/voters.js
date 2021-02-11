const mongoose = require('mongoose');

const voters = mongoose.Schema({
  name: { type: 'string', required: true },
  cpf: { type: 'string' },
  rg: { type: 'string' },
  phone: { type: 'string' },
  whatsApp: { type: 'string' },
  dateOfBirth: { type: 'string' },
  state: { type: 'string' },
  country: { type: 'string' },
  city: { type: 'string' },
  neighborhood: { type: 'string' },
  street: { type: 'string' },
  houseNumber: { type: 'string' },
  avatar: { type: 'string' },
  avatar_url_path: { type: 'string' },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  description: { type: 'string' },
  latitude: { type: 'string' },
  longitude: { type: 'string' },
  active: Boolean,
  socialMidia_facebook: { type: 'string' },
  socialMidia_instagran: { type: 'string' },
});
module.exports = mongoose.model('voters', voters);
