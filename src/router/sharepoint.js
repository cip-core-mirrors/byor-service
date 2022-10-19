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
      if (e.response) {
        var error = new Object();
        error.message = e.message;
        error.statusCode = e.response.statusCode;
        error.url = e.response.url;
        res.status(e.response.statusCode);
        return await res.json(error);
      } else if (e.message) {
        var error = new Object();
        error.code = e.code; 
        error.message = e.message;
        res.status(e.response.statusCode);
        return await res.json(error);
      }
      res.status(500);
      await res.json(e);
    }
});

module.exports = router;
