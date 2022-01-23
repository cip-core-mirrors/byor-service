const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loadEnv = require('./utils/loadEnv');

async function init() {
    try {
        await loadEnv.loadEnv();
    } catch(e) {
        console.error(e);
    }

    const app = express();
    app.use(cors())

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    const router = require('./router');
    app.use(process.env.BASE_URL || '/', router);

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