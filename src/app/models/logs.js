const mongoose = require('mongoose');

const logs = mongoose.Schema({
  type: { type: 'string', required: true },
  date: { type: 'string', required: true },
  data: Object,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  done: Boolean,
});
module.exports = mongoose.model('logs', logs);
