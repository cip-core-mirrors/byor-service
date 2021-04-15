const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config(); // load environment variables from .env file

const spreadsheet = require('./utils/spreadsheet');

async function init() {
    await spreadsheet.connect();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    const router = require('./router');
    app.use('/', router);

    return app;
}

init().then(app => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}).catch(e => {
    console.error(e);
});