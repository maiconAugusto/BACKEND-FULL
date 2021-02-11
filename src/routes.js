const { Router } = require('express');

const router = new Router();
const multer = require('multer');
// const middleware = require('./middleware/authentication');
const account = require('./app/controllers/accountController');
const users = require('./app/controllers/usersController');
const allvoters = require('./app/controllers/AllVetors');
const recoveryPassword = require('./app/controllers/recoveryPasswordController');
const solicitation = require('./app/controllers/solicitationsController');
const solicitationToVetors = require('./app/controllers/solicitationToVoters');
const city = require('./app/controllers/cityController');
const authentication = require('./app/controllers/usersAuthentication');
const voters = require('./app/controllers/votersController');
const activity = require('./app/controllers/activityController');
const storage = require('./config/multer');
const employeeHistory = require('./app/controllers/employeeHistory');
const party = require('./app/controllers/partysController');
const logs = require('./app/controllers/logsController');

const upload = multer(storage);

router.post('/authentication', authentication.index);
router.post('/city', city.create);
router.post('/create-account', upload.single('file'), account.store);
router.post('/create-users/:id', upload.single('file'), users.store);
router.post('/create-collaborator', upload.single('file'), voters.store);
router.post('/create-activity', activity.store);
router.post('/create-employee-history', employeeHistory.store);
router.post('/create-sigla', party.store);
router.post('/create-log', logs.create);

router.put('/update-password-user/:id', authentication.update);
router.put('/update-account/:id', account.update);
router.put('/update-collaborator/:id', upload.single('file'), voters.update);
router.put('/update-activity/:id', activity.update);
router.put('/update-password-recovey', recoveryPassword.update);
router.put('/city/:id', city.update);
router.put('/update-user/:id', upload.single('file'), users.update);
router.put('/update-employee-history/:id', employeeHistory.update);
router.put('/update-sigla/:id', party.update);
router.put('/update-log/:id', logs.update);

router.get('/query-collaborator/:id', voters.index);
router.get('/query-employee-history-solicitation/:id', solicitation.index);
router.get('/query-employee-history-solicitation-collaborator/:id', solicitationToVetors.index);
router.get('/query-cities', city.index);
router.get('/query-city/:id', city.show);
router.get('/query-activity/:id', activity.index);
router.get('/query-all-users', users.index);
router.get('/query-all-accounts', account.index);
router.get('/query-all-collaborator/:id', allvoters.index);
router.get('/query-all-employee-history/:id', employeeHistory.index);
router.get('/query-all-siglas', party.index);
router.get('/query-logs/:id', logs.index);

router.delete('/remove-account/:id', account.remove);
router.delete('/remove-collaborator/:id', voters.remove);
router.delete('/remove-user/:id', users.remove);
router.delete('/remove-activity/:id', activity.remove);
router.delete('/remove-employee-history/:id', employeeHistory.delete);
router.delete('/remove-city/:id', city.delete);
router.delete('/remove/:id', party.remove);

module.exports = router;
