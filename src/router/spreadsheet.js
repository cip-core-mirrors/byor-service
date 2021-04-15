const express = require('express');

const spreadsheet = require('../utils/spreadsheet');

const router = express.Router();

router.get('/:sheetId/:range', async function(req, res, next) {
    const sheetId = req.params.sheetId;
    const range = req.params.range;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      const sheet = await spreadsheet.getSheet(sheetId, range);
      await res.json(sheet);
    } catch (e) {
      const response = e.response;
      if (e.response && e.response.data) {
        const error = e.response.data.error;
        res.status(error.code);
        return await res.json(error.errors);
      }
      res.status(500);
      await res.json(e);
    }
});

module.exports = router;
