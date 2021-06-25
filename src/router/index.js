const express = require('express');

const router = express.Router();

router.use(function(req, res, next) {
    console.log(`${new Date().toISOString()}: [${req.method}] ${req.originalUrl} ${JSON.stringify(req.body)}`);
    next()
});

router.use(function(req, res, next) {
    console.log(req.url);
    next()
});

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    router.use('/spreadsheet', require('./spreadsheet'));
}
router.use('/database', require('./database'));

module.exports = router;