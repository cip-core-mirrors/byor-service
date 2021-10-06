const KcAdminClient = require('@keycloak/keycloak-admin-client');
const https = require('https');

const kcAdminClient = new KcAdminClient.default({
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_REALM,
    requestConfig: {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }
});

async function login() {
    await kcAdminClient.auth({
        clientId: process.env.KEYCLOAK_CLIENT,
        clientSecret: process.env.KEYCLOAK_SECRET,
        grantType: 'client_credentials',
    });
      
    // List all users
    const users = await kcAdminClient.users.find();
    console.log(users);
}

login()

module.exports = {
    client: kcAdminClient,
    login,
};