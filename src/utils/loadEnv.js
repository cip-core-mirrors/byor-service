const axios = require('axios');
const https = require('https');

async function loadEnv() {
    require('dotenv').config(); // load environment variables from .env file

    const baseUrl = process.env.VAULT_URL;
    if (!baseUrl) return;

    console.log("Loading environment variables from Vault...");

    const config = {
        headers: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: process.env.SCOPE,
        },
    };

    if (process.env.CA_CERTS) config.httpsAgent = new https.Agent({ ca: process.env.CA_CERTS });

    const paths = (process.env.VAULT_PATHS || '').split(',');
    for (const path of paths) {
        const url = baseUrl + path;
        console.log(`Loading secret from "${url}"...`);
        const response = await axios.get(url, config);
        const data = response.data.data.data;
        for (const key in data) {
            if (process.env[key]) {
                console.log(`Skipped key "${key}"`);
            } else {
                process.env[key] = data[key];
                console.log(`Set key "${key}"`);
            }
        }
        console.log("Loading secret OK");
    }

    console.log("Loaded environment variables from Vault");
}

module.exports = {
    loadEnv,
};