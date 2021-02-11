/* eslint-disable no-plusplus */
module.exports = {
  hash() {
    const length = 8;

    const charset = process.env.NEWHASH;
    let newHash = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
      newHash += charset.charAt(Math.floor(Math.random() * n));
    }
    return newHash;
  },
};
