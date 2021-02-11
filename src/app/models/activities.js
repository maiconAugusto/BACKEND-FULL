const mongoose = require('mongoose');

const activities = mongoose.Schema({
  title: { type: 'string' },
  description: { type: 'string' },
  day: { type: 'string', required: true },
  startTime: { type: 'string', required: true },
  active: Boolean,
  done: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
    required: true,
  },
});
module.exports = mongoose.model('activities', activities);
