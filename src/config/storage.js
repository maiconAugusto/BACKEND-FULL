/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const admin = require('firebase-admin');
const { unlink } = require('fs');
const serviceAccount = require('./key/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE,
});
const bucket = admin.storage().bucket();

module.exports = {
  async uploadFile(req, res, next) {
    if (req.file === undefined || req.file === '') {
      if (req.body.data !== undefined) {
        return req.body = JSON.parse(req.body.data);
      }
      return req.body;
    }
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

    await bucket.upload(req.file.path, {
      gzip: true,
      metadata,
    });
    unlink(req.file.path, () => {});
    const avatar_url_path = req.file.filename;
    const avatar = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.filename)}?alt=media&token=${req.file.filename}`);
    req.body = { ...JSON.parse(req.body.data), avatar_url_path, avatar };
  },
  async updateFile(req, res, next) {
    if (req.file === undefined || req.file === '') {
      if (req.body.data !== undefined) {
        return req.body = JSON.parse(req.body.data);
      }
      return req.body;
    }
    const data = JSON.parse(req.body.data);

    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename,
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };
    if (data.avatar_url_path !== null) {
      bucket.deleteFiles({
        prefix: data.avatar_url_path,
      });
    }
    await bucket.upload(req.file.path, {
      gzip: true,
      metadata,
    });

    const avatar = await Promise.resolve(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(req.file.filename)}?alt=media&token=${req.file.filename}`);
    unlink(req.file.path, () => {});
    req.body = { ...JSON.parse(req.body.data), avatar_url_path: req.file.filename, avatar };
  },
};
