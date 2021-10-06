const express = require('express');

const utils = require('../utils/iam');

const router = express.Router();

router.all('*', async function(req, res, next) {
    return await utils.call(req.method, req.url, req.headers.authorization, req.data)
});

router.post('/roles', async function(req, res, next) {
    const { name } = req.body;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      const role = await keycloak.roles.create({
        name: name,
      });
  
      await res.json(role);
    } catch (e) {
      const response = e.response;
      if (response && response.data) {
        const error = response.data.error;
        res.status(error.code);
        return await res.json(error.errors);
      }
      res.status(500);
      await res.json(e);
    }
});

router.put('/roles/:roleId', async function(req, res, next) {
    const roleId = req.params.roleId;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      req.body.name = roleId;
      const role = await keycloak.roles.updateByName(
        { name: roleId },
        req.body,
      );
  
      await res.json(role);
    } catch (e) {
      const response = e.response;
      if (response && response.data) {
        const error = response.data.error;
        res.status(error.code);
        return await res.json(error.errors);
      }
      res.status(500);
      await res.json(e);
    }
});

router.put('/users/:userId/roles', async function(req, res, next) {
    const userId = req.params.userId;
    const role = req.body;

    res.set('Access-Control-Allow-Origin', '*');
    try {
      const roleObject = await keycloak.roles.findOneByName({
        name: role.name,
      });
      const response = await keycloak.users.addClientRoleMappings({
        id: userId,
        clientUniqueId: process.env.KEYCLOAK_CLIENT,
        // at least id and name should appear
        roles: [
          {
            id: roleObject.id,
            name: roleObject.name,
          },
        ],
      });
  
      await res.json(response);
    } catch (e) {
      const response = e.response;
      if (response && response.data) {
        const error = response.data.error;
        res.status(error.code);
        return await res.json(error.errors);
      }
      res.status(500);
      await res.json(e);
    }
});

module.exports = router;
