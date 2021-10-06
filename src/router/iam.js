const express = require('express');

const utils = require('../utils/iam');

const router = express.Router();

router.all('*', async function(req, res, next) {
    try {
        const response = await utils.call(req.method, req.url, req.headers.authorization, req.data);
        return await res.json(response.data);
    } catch (e) {
        console.error(e)
        const response = e.response;
        if (response) {
            res.statusCode = response.status || 500;
            if (res.headers['content-type'] === 'application/json') {
                return await res.json(res.data);
            }
            await res.send(res.data);
        } else {
            res.statusCode = 500;
            await res.send('Error');
        }
    }
});

module.exports = router;
