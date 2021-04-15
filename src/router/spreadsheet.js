const express = require('express');

const spreadsheet = require('../utils/spreadsheet');

const router = express.Router();

router.get('/:sheetId/:range', async function(req, res, next) {
    const sheetId = req.params.sheetId;
    const range = req.params.range;

    const sheet = await spreadsheet.getSheet(sheetId, range);
    await res.json(sheet);
});

module.exports = router;