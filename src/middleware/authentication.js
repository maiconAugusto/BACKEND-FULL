/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const secret = require('../config/hash');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ data: 'Invalid token' });
  }
  const [bearer, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, secret.hash, { expiresIn: secret.expiresIn });
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
