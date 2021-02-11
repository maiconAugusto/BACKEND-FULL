const mongoose = require('mongoose');

const party = mongoose.Schema({
  sigla: { type: 'string', required: true, unique: true },
  name: { type: 'string', required: true },
  active: Boolean,
});
module.exports = mongoose.model('partys', party);
