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
    };
    if (data) config.data = data;

    return await axios(config);
}

async function getUserInfo(token) {
    return await call('get', '/userinfo', token);
}

const resourceId = process.env.IAM_CREATE_RADAR_RESOURCE_ID;
const permissionName = process.env.IAM_CREATE_RADAR_PERMISSION_NAME;
function isAuthorizedToCreateRadar(userInfo) {
    for (const authorization of (userInfo || {}).user_authorization) {
        if (authorization.resource_id === resourceId) {
            for (const permission of authorization.permissions) {
                if (permission.name === permissionName) {
                    return true;
                }
            }
        }
    }

    return false;
}

module.exports = {
    call,
    getUserInfo,
    isAuthorizedToCreateRadar,
};