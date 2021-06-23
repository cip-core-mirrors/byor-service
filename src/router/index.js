const express = require('express');

const router = express.Router();

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    router.use('/spreadsheet', require('./spreadsheet'));
}
router.use('/database', require('./database'));

module.exports = router;