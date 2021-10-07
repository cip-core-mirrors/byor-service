const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    console.log(`${new Date().toISOString()}: [${req.method}] ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next();
});

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    console.log('[Spreadsheet] Connecting service...');
    const spreadsheet = require('../utils/spreadsheet');
    spreadsheet.connect()
        .then(function() {
            console.log('[Spreadsheet] Connected');
            router.use('/spreadsheet', require('./spreadsheet'));
            console.log('[ROUTE] /spreadsheet');
        })
        .catch(function(e) {
            console.error(e);
            console.log('[Spreadsheet] Failed to connect');
        });
}
if (process.env.KEYCLOAK_URL) {
    router.use('/keycloak', require('./keycloak'));
    console.log('[ROUTE] /keycloak');
}
if (process.env.IAM_URL) {
    router.use('/iam', require('./iam'));
    console.log('[ROUTE] /iam');
}
if (process.env.POSTGRESQL_HOST) {
    console.log('[Database] Connecting service...');
    const database = require('../database');
    database.connect()
        .then(async function() {
            console.log('[Database] Connected');
            console.log('[Database] Initializing tables...');
            try {
                await database.init();
                console.log('[Database] Tables initialized');
                router.use('/database', require('./database'));
                console.log('[ROUTE] /database');
            } catch (e) {
                console.error(e);
                console.log('[Database] Failed to initialize tables');
            }
        })
        .catch(function(e) {
            console.error(e);
            console.log('[Database] Failed to connect');
        })
}

module.exports = router;