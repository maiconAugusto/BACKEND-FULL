const { CronJob } = require('cron');
const moment = require('moment');
const activitiesSocket = require('../app/controllers/activitySocket');

const job = new CronJob('*/10 * * * * *', async () => {
//   activitiesSocket.index();
}, null, true, 'America/Sao_Paulo');

module.exports = job;
