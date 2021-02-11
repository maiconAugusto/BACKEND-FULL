/* eslint-disable no-underscore-dangle */
const employeeHistory = require('../models/employeeHistory');

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const situation = 'pending';
    const response = await employeeHistory.find({
      account: id,
      active: true,
      isSolicitation: true,
      situation,
    }).populate('voter');

    const uniqueCollaborator = response.reduce((unique, o) => {
      if (!unique.some((obj) => obj.voter._id === o.voter._id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    return res.status(200)
      .json({ data: uniqueCollaborator.filter((item) => item.voter.active === true) });
  },
};
