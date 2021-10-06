const axios = require('axios');
const https = require('https');

const baseUrl = process.env.IAM_URL;
const httpsOptions = {};
if (process.env.CA_CERTS) {
    httpsOptions.ca = process.env.CA_CERTS;
} else {
    httpsOptions.rejectUnauthorized = false;
}
const httpsAgent = new https.Agent(httpsOptions);

async function call(method, endpoint, token, data) {
    const config = {
        method: method,
        url: `${baseUrl}${endpoint}`,
        headers: {
            authorization: token,
            accept: 'application/json',
        },
        httpsAgent: httpsAgent,
    }
    if (data) config.data = data;

    console.log(config) // TODO : debug
    const response = await axios(config);

    return response;
}

async function getUserInfo(token) {
    return await call('get', '/userinfo', token);
}

module.exports = {
    call,
    getUserInfo,
};