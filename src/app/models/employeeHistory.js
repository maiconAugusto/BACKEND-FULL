const mongoose = require('mongoose');

const employeeHistory = mongoose.Schema({
  description: { type: 'string' },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'voters',
    required: true,
  },
  day: { type: 'string', required: true },
  hour: { type: 'string', required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  active: Boolean,
  done: Boolean,
  isSolicitation: Boolean,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'accounts',
  },
  situation: { type: 'string', required: true },
});
module.exports = mongoose.model('employeeHistory', employeeHistory);
