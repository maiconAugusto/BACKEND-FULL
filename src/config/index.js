const mongoose = require('mongoose');

const database = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

module.exports = database;

/* eslint-disable max-len */
// const Sequelize = require('sequelize');

// const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
//   dialect: process.env.DIALECT,
//   host: process.env.HOST,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// });

// module.exports = db;

// const db = new Sequelize(process.env.DATABASE_URL || 'gestao', process.env.USER || 'postgres', process.env.PASSWORD || 'maicond333', {
//   dialect: process.env.DIALECT || 'postgres',
//   host: process.env.HOST,
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// });
// module.exports = db;
