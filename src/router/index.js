const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    console.log(`${new Date().toISOString()}: [${req.method}] ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    router.use('/spreadsheet', require('./spreadsheet'));
}
if (process.env.KEYCLOAK_URL) router.use('/keycloak', require('./keycloak'));
if (process.env.IAM_URL) router.use('/iam', require('./iam'));
router.use('/database', require('./database'));

module.exports = router;