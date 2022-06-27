const express = require('express');

const sharepoint = require('../utils/sharepoint');

const router = express.Router();

router.get('/:siteName/:listName/:viewName?/:viewFilter?', async function(req, res, next) {
    const siteName = req.params.siteName;
    const listName = req.params.listName;
    const viewName = req.params.viewName;
    const viewFilter = req.params.viewFilter;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      const sheet = await sharepoint.getListItems(siteName, listName, viewName, viewFilter);
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
