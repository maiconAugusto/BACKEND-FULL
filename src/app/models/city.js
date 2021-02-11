const mongoose = require('mongoose');

const city = mongoose.Schema({
  city_name: { type: 'string', required: true, unique: true },
  state: { type: 'string', required: true },
  country: { type: 'string', required: true },
  active: Boolean,
});
module.exports = mongoose.model('cities', city);
