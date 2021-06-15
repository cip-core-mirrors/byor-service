const express = require('express');

const router = express.Router();

router.use('/spreadsheet', require('./spreadsheet'));
router.use('/database', require('./database'));

module.exports = router;