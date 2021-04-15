const express = require('express');

const router = express.Router();

router.use('/spreadsheet', require('./spreadsheet'));

module.exports = router;