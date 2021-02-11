const activities = require('../models/activities');

module.exports = {
  async index() {
    const response = await activities.find();
    console.log(response);
  },
};
