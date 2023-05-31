const express = require('express');
const appDefaults = require('../utils/appdefaults');
const router = express.Router();

router.get('/themes/:themeId', async function(req, res, next) {
    const themeId = req.params.themeId;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      const sheet = await appDefaults.getTheme(themeId);
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
