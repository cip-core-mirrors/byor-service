const express = require('express');
const crypto = require('crypto-js');

const utils = require('../utils/database');
const iam = require('../utils/iam');

const parametersJson = process.env.DATABASE_PARAMETERS ? JSON.parse(process.env.DATABASE_PARAMETERS) : [];
const themesParametersJson = process.env.THEMES_PARAMETERS ? JSON.parse(process.env.THEMES_PARAMETERS) : [];
const router = express.Router();

const blipsHashCache = {};

utils.init().then(async function() {
    const blips = await utils.getBlips();

    for (const blip of blips) {
        const cache = blipsHashCache[blip.id];
        if (cache) {
            if (blip.version > cache.version) {
                blipsHashCache[blip.id] = {
                    hash: blip.hash,
                    version: blip.version,
                }
            }
        } else {
            blipsHashCache[blip.id] = {
                hash: blip.hash,
                version: blip.version || 0,
            }
        }
    }
});

router.get('/radar/:radar', async function(req, res, next) {
    if (req.headers && req.headers.authorization) {
        next();
        return;
    }

    const radar = req.params.radar;

    utils.logHeaders(req.headers);

    try {
        const { output, blipsVersion } = await getRadar(radar);
        res.header('blips-version', blipsVersion);
        res.set('access-control-expose-headers', 'blips-version');

        return await res.json(output);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radars', async function(req, res, next) {
    const radars = await getAllRadars();
    await res.json(radars);
});

router.get('/themes/:themeId', async function(req, res, next) {
    const themeId = req.params.themeId;

    try {
        const theme = await utils.getThemeParameters(themeId);
        return await res.json(theme);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.options('/', async function(req, res, next) {
    await res.send(200)
});

router.put('/anonymous', async function(req, res, next) {
    const { blips = [], defaultBlipEditors = [] } = req.body;

    try {
        const response = await insertBlips(blips, defaultBlipEditors);
        await res.json(response)
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/anonymous/radar/:radar', async function(req, res, next) {
    const radar = req.params.radar;
    const { links = [], parameters = [] } = req.body;

    try {
        const radarFound = await utils.radarExists(radar);
        if (radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" already exists`});
        }

        await utils.insertRadar(radar);
        await editRadar(radar, links, parameters, 0);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.use(async function(req, res, next) {
    const headers = req.headers;
    try {
        const user = await iam.getUserInfo(headers.authorization);
        req.user = user.data;
        next();
    } catch (e) {
        const response = e.response;
        if (response) {
            const config = response.config;
            const log = {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                config: {
                    url: config.url,
                    method: config.method,
                    headers: config.headers,
                    data: config.data,
                }
            };
            console.error(JSON.stringify(log));

            res.statusCode = response.status || 500;
            if (response.headers && (response.headers['content-type'] === 'application/json')) {
                return await res.json(response.data || {});
            }
            await res.send(response.data);
        } else {
            console.error(e);
            res.statusCode = 500;
            await res.send('Error');
        }
    }
});

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.post('/blips', async function(req, res, next) {
    const { blips = [] } = req.body;

    try {
        const response = await insertBlips(blips, [req.user.mail], req.user);
        await res.json(response)
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/blips/:blipId', async function(req, res, next) {
    const userId = req.user.mail;
    const blipId = req.params.blipId;
    const { blip = {}, editors } = req.body;

    blip.id = blipId;

    try {
        let userRights = [];
        const rights = await utils.getBlipRights(userId);
        for (const right of rights) {
            if (right.blip === blipId) {
                userRights = right.rights.split(',');
                break;
            }
        }

        if (userRights.indexOf('edit') === -1) {
            res.statusCode = 403;
            return await res.json({message: `You cannot edit blip "${blipId}"`});
        }

        if (editors && userRights.indexOf('owner') === -1) {
            res.statusCode = 403;
            return await res.json({message: `You cannot edit permissions for blip "${blipId}"`});
        }

        const response = await insertBlips([blip], editors, req.user);
        await res.json(response)
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.delete('/blips/:blipId', async function(req, res, next) {
    const userId = req.user.mail;
    const blipId = req.params.blipId;

    try {
        let hasRight = false;
        const rights = await utils.getBlipRights(userId);
        for (const right of rights) {
            if (right.blip === blipId) {
                hasRight = right.rights.split(',').indexOf('owner') !== -1;
                break;
            }
        }

        if (!hasRight) {
            res.statusCode = 403;
            return await res.json({message: `You cannot delete blip "${blipId}"`});
        }

        await utils.deleteBlip(blipId, req.user);

        await res.json({message: 'ok'});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar', async function(req, res, next) {
    const userId = req.user.mail;
    const userRadars = await getUserRadars(userId);
    await res.json(userRadars);
});

router.get('/radar/:radarId', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radarId;

    const radarFound = await utils.radarExists(radar);
    if (!radarFound) {
        res.statusCode = 404;
        return await res.json({message: `Radar "${radar}" does not exist`});
    }

    const userCanEdit = await utils.userCanEditRadar(userId, radar);
    if (!userCanEdit) {
        res.statusCode = 403;
        return await res.json({message: `You cannot edit radar "${radar}"`});
    }

    const radarVersions = await utils.getRadarVersions(radar);
    await res.json(radarVersions);
});

router.get('/permissions', async function(req, res, next) {
    await res.json({
        create_radar: iam.isAuthorizedToCreateRadar(req.user),
        admin_user: utils.isAdminUser(req.user.mail),
    })
});

router.delete('/radar/:radarId', async function(req, res, next) {
    const radarId = req.params.radarId;

    const radarFound = await utils.radarExists(radarId);
    if (!radarFound) {
        res.statusCode = 404;
        return await res.json({message: `Radar "${radarId}" does not exist`});
    }

    const isOwner = await utils.userRadarOwner(req.user.mail, radarId);
    if (!isOwner) {
        res.statusCode = 403;
        return await res.json({message: `You cannot delete radar "${radarId}"`});
    }

    await utils.deleteRadar(radarId, req.user);
    await res.json({message: 'ok'});
});

router.post('/radar', async function(req, res, next) {
    const { id: radarId } = req.body;

    const response = await canCreateRadar(req.user, radarId);
    if (!response.ok) {
        res.statusCode = response.code;
        return await res.json({ message: response.message });
    }

    await utils.insertRadar(radarId, req.user);

    await res.json({ status: 'ok' });
});

const possibleRights = [
    'edit',
    'view',
];
router.post('/radar/:radar/permissions', async function(req, res, next) {
    const authorId = req.user.mail;
    const radar = req.params.radar;
    const { user_id: userId, rights } = req.body;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const userCanEdit = await utils.userCanEditRadar(authorId, radar);
        if (!userCanEdit) {
            res.statusCode = 403;
            return await res.json({message: `You cannot edit radar "${radar}"`});
        }

        await utils.insertRadarRights(radar, userId, rights.filter(right => possibleRights.indexOf(right) !== -1), req.user);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.delete('/radar/:radar/permissions/:userId', async function(req, res, next) {
    const userId = req.params.userId;
    const radar = req.params.radar;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const userCanEdit = await utils.userCanEditRadar(req.user.mail, radar);
        if (!userCanEdit) {
            res.statusCode = 403;
            return await res.json({message: `You cannot edit radar "${radar}"`});
        }

        await utils.deleteRadarRights(radar, userId, req.user);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

const possiblesStates = [
    0, // draft
    1, // published
];
router.put('/radar/:radar', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;
    const { state, links = [], parameters = [] } = req.body;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const userCanEdit = await utils.userCanEditRadar(userId, radar);
        if (!userCanEdit) {
            res.statusCode = 403;
            return await res.json({message: `You cannot edit radar "${radar}"`});
        }

        if (state !== undefined) {
            if (possiblesStates.indexOf(parseInt(state)) === -1) {
                res.statusCode = 404;
                return await res.json({message: `Unknown radar state "${state}"`});
            }
        }

        await editRadar(radar, links, parameters, state, req.user);
        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/themes', async function(req, res, next) {
    try {
        const themes = await utils.getThemes();
        return await res.json(themes);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.post('/themes', async function(req, res, next) {
    const theme = req.body;
    const userId = req.user.mail;

    try {
        const themes = await utils.getThemes();
        if (themeExists(themes, theme.id)) {
            res.status(404);
            return await res.json({message: `Theme "${theme.id}" already exists`});
        }
        delete theme.permissions;
        theme.permissions = [{
           userId: userId,
           rights: ['owner', 'edit'],
        }];
        await utils.insertTheme(theme, req.user, true);

        return await res.json({message: 'ok'});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/themes', async function(req, res, next) {
    const theme = req.body;
    const userId = req.user.mail;

    try {
        const themes = await utils.getThemes();
        if (!themeExists(themes, theme.id)) {
            res.status(404);
            return await res.json({message: `Theme "${theme.id}" does not exist`});
        }

        const rights = getThemeRights(themes, theme.id, userId);
        if (rights.indexOf('edit') === -1) {
            res.status(403);
            return await res.json({message: `You cannot edit this theme`});
        }
        if (rights.indexOf('owner') === -1) {
            delete theme.permissions;
        }

        await utils.insertTheme(theme, req.user, false);

        return await res.json({message: 'ok'});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.delete('/themes/:themeId', async function(req, res, next) {
    const themeId = req.params.themeId;
    const userId = req.user.mail;

    try {
        const themes = await utils.getThemes();
        if (!themeExists(themes, themeId)) {
            res.status(404);
            return await res.json({message: `Theme "${themeId}" does not exist`});
        }

        const rights = getThemeRights(themes, themeId, userId);
        if (rights.indexOf('owner') === -1) {
            res.status(403);
            return await res.json({message: `You cannot delete this theme`});
        }
        await utils.deleteTheme(themeId, req.user);

        return await res.json({message: 'ok'});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/blips', async function(req, res, next) {
    try {
        const blips = await getAllBlips();
        const rights = await utils.getBlipRights();
        for (const entry of Object.entries(blips)) {
            const blipId = entry[0];
            for (const right of rights) {
                if (right.blip === blipId) {
                    const blipVersions = entry[1];
                    for (const blip of blipVersions) {
                        if (!blip.permissions) blip.permissions = [];
                        blip.permissions.push({
                            userId: right.user_id,
                            rights: right.rights.split(','),
                        });
                    }
                }
            }
        }
        return await res.json(blips);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/blip', async function(req, res, next) {
    try {
        const blipRights = await utils.getBlipRights(req.user.mail);
        const blipRightsArray = blipRights.map(right => right.blip);
        const blips = await getAllBlips();
        for (const blipId in blips) {
            if (blipRightsArray.indexOf(blipId) === -1) {
                delete blips[blipId];
            }
        }
        return await res.json(blips);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/parameters', async function(req, res, next) {
    try {
        return await res.json(parametersJson);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/parameters/themes', async function(req, res, next) {
    try {
        return await res.json(themesParametersJson);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar/:radar/:version/parameters', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;
    const version = parseInt(req.params.version);

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.status(404);
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const canEditRadar = await utils.userCanEditRadar(userId, radar);
        if (!canEditRadar) {
            res.status(404);
            return await res.json({message: `You cannot edit radar "${radar}"`});
        }

        const params = await utils.getRadarParameters(radar, version);
        return await res.json(params);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar/:radar/:version/blip-links', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;
    const version = parseInt(req.params.version);

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.status(404);
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const canEditRadar = await utils.userCanEditRadar(userId, radar);
        if (!canEditRadar) {
            res.status(404);
            return await res.json({message: `You cannot edit radar "${radar}"`});
        }

        const blipLinks = await utils.selectBlipsWithColumnLinks(radar, version);
        return await res.json(blipLinks);
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.use('/admin', async function(req, res, next) {
   if (utils.isAdminUser(req.user.mail)) {
       next();
   } else {
       res.status(403);
       await res.json({message: `You are not an admin`});
   }
});

router.delete('/admin/radar/:radarId', async function(req, res, next) {
    const radarId = req.params.radarId;

    await utils.deleteRadar(radarId, req.user);
    await res.json({message: 'ok'});
});

router.post('/admin/radar', async function(req, res, next) {
    const { id: radarId } = req.body;

    const response = await canCreateRadar(req.user, radarId);
    if (!response.ok) {
        res.statusCode = response.code;
        return await res.json({ message: response.message });
    }

    await utils.insertRadar(radarId, req.user);

    await res.json({ status: 'ok' });
});

router.post('/admin/radar/:radar/permissions', async function(req, res, next) {
    const radar = req.params.radar;
    const { user_id: userId, rights } = req.body;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        const rightsToAdd = rights.filter(right => possibleRights.indexOf(right) !== -1);
        const radarRights = await utils.getRadarRights(radar);
        if (radarRights.length === 0) {
            rightsToAdd.push('owner');
        }
        await utils.insertRadarRights(radar, userId, rightsToAdd, req.user);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.delete('/admin/radar/:radar/permissions/:userId', async function(req, res, next) {
    const userId = req.params.userId;
    const radar = req.params.radar;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        await utils.deleteRadarRights(radar, userId, req.user);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/admin/radar/:radar', async function(req, res, next) {
    const radar = req.params.radar;
    const { state, links = [], parameters = [] } = req.body;

    try {
        const radarFound = await utils.radarExists(radar);
        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        if (state !== undefined) {
            if (possiblesStates.indexOf(parseInt(state)) === -1) {
                res.statusCode = 404;
                return await res.json({message: `Unknown radar state "${state}"`});
            }
        }

        await editRadar(radar, links, parameters, state, req.user);
        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/admin/blips/permissions', async function(req, res, next) {
    const blipsRights = req.body;

    try {
        const queries = [];
        for (const blipRight of blipsRights) {
            queries.push(await utils.deleteBlipRights(blipRight.blip, req.user, false));
        }
        queries.push(await utils.insertBlipsRights(blipsRights, req.user, false));
        await utils.transaction(queries, req.user);

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

async function getRadar(radarId, radarVersion) {
    if (radarVersion === undefined) {
        const radar = await utils.getRadars([ `id = ${radarId}`]);
        radarVersion = radar[0]['published_version'];
    }

    const blips = await utils.selectBlipsWithColumnLinks(radarId, radarVersion);
    const blipsVersion = parseInt(Math.max(...blips.map(blip => blip.version))) || 0;

    blips.map(blip => delete blip.version);

    const params = await utils.getRadarParameters(radarId, radarVersion);
    const dict = {};
    for (const row of blips) {
        let blip = dict[row.id];
        if (!blip) {
            blip = Object.assign({}, row);
            dict[row.id] = blip;
            delete blip.columnname;
            delete blip.columnvalue;
        }
        blip[row.columnname] = row.columnvalue;
    }

    const columns = blips.map(blip => blip.columnname).filter(onlyUnique);
    const headers = [
        'name',
        'value',
        'id',
        'hash',
        'lastUpdate',
        'sector',
        'ring',
    ];
    headers.push(...columns);
    const output = [ headers ];
    for (const row of params) {
        output.push(Object.values(row))
    }

    const outputBlips = [];
    for (const id in dict) {
        const blip = dict[id];
        outputBlips.push(Object.values(blip));
    }

    const idIndex = 2;
    outputBlips.sort(function(a, b) {
        if (a[idIndex] < b[idIndex]) return -1;
        else if (a[idIndex] > b[idIndex]) return 1;
        return 0;
    });
    output.push(...outputBlips);

    return {output, blipsVersion};
}

async function getAllRadars() {
    const radars = await utils.getRadars();
    const radarRights = await utils.getRadarRights();
    const out = [];

    for (const radar of radars) {
        radar.permissions = [];
        for (const radarRight of radarRights) {
            if (radarRight.radar === radar.id) {
                radar.permissions.push({
                    user_id: radarRight.user_id,
                    rights: radarRight.rights.split(','),
                });
            }
        }
        out.push(radar);
    }

    return out;
}

async function insertBlips(blips, users, userInfo) {
    const tempCache = {};
    let maxVersion = 0;

    const now = new Date();
    const columnLinks = [];
    const blipsToInsert = [];
    const blipsRights = [];
    const owner = users ? users[0] : undefined;
    let index = 0;
    for (const blip of blips) {
        if (!blip.id) {
            if (userInfo) {
                blip.id = `${userInfo.mail}-${now.getTime()}-${index}`;
            } else if (owner) {
                blip.id = `${owner}-${now.getTime()}-${index}`;
            }
        }
        if (owner) {
            blipsRights.push({
                blip: blip.id,
                userId: owner,
                rights: ['owner', 'edit'],
            });
            users.slice(1).map(user => blipsRights.push({
                blip: blip.id,
                userId: user,
                rights: ['edit'],
            }));
        }
        let {
            id,
            name,
            lastUpdate,
        } = blip;
        delete blip.hash;
        delete blip.id;
        delete blip.name;
        delete blip.lastUpdate;
        delete blip.version;

        if (lastUpdate) {
            lastUpdate = new Date(lastUpdate);
            if (typeof lastUpdate.getMonth !== 'function' || Number.isNaN(lastUpdate.getMonth())) {
                lastUpdate = now;
            }
        } else {
            lastUpdate = now;
        }

        const columns = Object.entries(blip);
        blip.hash = crypto.SHA256(
            `${name}${lastUpdate ? `-${lastUpdate}` : ''}-${columns.map(row => row.join('-')).join('-')}`
        ).toString();
        blip.id = id;
        blip.name = name;
        blip.lastUpdate = lastUpdate;

        const cachedBlip = blipsHashCache[blip.id] || {};
        if (cachedBlip.hash !== blip.hash) {
            blip.version = (cachedBlip.version || 0) + 1;
            if (blip.version > maxVersion) maxVersion = blip.version;

            blipsToInsert.push(blip);

            columns.forEach(function(row) {
                const columnName = row[0];
                const blipId = `${blip.id}-${blip.version}`;
                row.unshift(blipId);
                row.unshift(`${blipId}-${columnName}`)
            })
            columnLinks.push(...columns);

            tempCache[blip.id] = {
                hash: blip.hash,
                version: blip.version,
            }
        }
        index++;
    }

    const queries = [];
    if (blipsToInsert.length > 0) {
        queries.push(await utils.insertBlips(blipsToInsert, userInfo, false));
        queries.push(await utils.insertColumnLinks(columnLinks, userInfo, false));
    }
    if (blipsRights.length > 0) {
        queries.push(await utils.insertBlipsRights(blipsRights, userInfo, false));
    }

    if (queries.length > 0) {
        await utils.transaction(queries);
        if (blipsToInsert.length > 0) {
            Object.assign(blipsHashCache, tempCache);
        }
    }

    const response = {
        status: 'ok',
        data: blipsToInsert,
        rows: blipsToInsert.length,
    };

    if (maxVersion > 0) {
        response.version = maxVersion
    }

    return response;
}

async function getUserRadars(userId) {
    const radarRights = await utils.getRadarRights();

    const userRadars = radarRights.filter(function(entry) {
        return entry.user_id === userId && entry.rights.split(',').indexOf('edit') !== -1;
    });

    for (const userRadar of userRadars) {
        userRadar.permissions = [];
        for (const radarRight of radarRights) {
            if (radarRight.radar === userRadar.radar) {
                if (radarRight.rights.split(',').indexOf('edit') !== -1) {
                    userRadar.permissions.push({
                        user_id: radarRight.user_id,
                        rights: radarRight.rights.split(','),
                    });
                }
            }
        }
    }

    const radars = await utils.getRadars();
    for (const userRadar of userRadars) {
        for (const radar of radars) {
            if (radar.id === userRadar.radar) {
                userRadar.state = radar.state;
                break;
            }
        }
    }

    return userRadars.map(function(entry) {
        return {
            id: entry.radar,
            state: entry.state,
            rights: entry.rights.split(','),
            permissions: entry.permissions,
        }
    });
}

async function canCreateRadar(user, radarId) {
    const response = { ok: false };
    if (!radarId) {
        response.message = 'Radar ID should not be empty';
        response.code = 404;
        return response;
    }

    if (!iam.isAuthorizedToCreateRadar(user)) {
        response.message = 'You are not authorized to create a radar';
        response.code = 403;
        return response;
    }

    const radarFound = await utils.radarExists(radarId);
    if (radarFound) {
        response.message = `Radar "${radarId}" already exists`;
        response.code = 404;
        return response;
    }

    response.ok = true;
    return response;
}

async function editRadar(radarId, links, parameters, state, userInfo) {
    const queries = [];

    const radarVersions = await utils.getRadarVersions(radarId);
    const radarNewVersion = radarVersions.length + 1;
    if (links.length > 0) {
        const linksRows = links.map(function (link) {
            const blipCache = blipsHashCache[link.blip];
            const version = blipCache ? blipCache.version : 0;
            const blipIdVersion = `${link.blip}-${version}`;
            return [
                `${radarId}-${blipIdVersion}`,
                radarId,
                `${radarId}-${radarNewVersion}`,
                link.sector,
                link.ring,
                blipIdVersion,
                link.value || 0,
            ]
        });
        queries.push(await utils.insertBlipLinks(linksRows, userInfo, false));
    }

    if (parameters.length > 0) {
        const parametersRows = parameters.map(function(parameter) {
            return [
                `${radarId}-${parameter.name}`,
                radarId,
                `${radarId}-${radarNewVersion}`,
                parameter.name,
                parameter.value,
            ]
        });
        queries.push(await utils.insertRadarParameters(parametersRows, userInfo, false));
    }

    if (queries.length > 0) await utils.addRadarVersion(radarId, radarNewVersion, userInfo, false);

    if (state !== undefined) queries.push(await utils.updateRadarState(radarId, state, userInfo, false));

    await utils.transaction(queries, userInfo);
}

async function getAllBlips() {
    const blips = await utils.selectBlipsWithColumnLinks();

    const dict = {}
    for (const row of blips) {
        const columnName = row.columnname
        const columnValue = row.columnvalue
        delete row.columnname
        delete row.columnvalue

        let blip = dict[row.id_version]
        if (!blip) {
            blip = row
            dict[row.id_version] = blip
        }
        blip[columnName] = columnValue
    }

    const output = {}
    for (const blip of Object.values(dict)) {
        let blipVersions = output[blip.id]
        if (!blipVersions) {
            blipVersions = []
            output[blip.id] = blipVersions
        }

        while (blipVersions.length < blip.version) {
            blipVersions.push(undefined)
        }

        blipVersions[blip.version - 1] = blip
    }

    return output;
}

function themeExists(themes, themeId) {
    for (const row of themes) {
        if (row.id === themeId) {
            return true;
        }
    }

    return false;
}

function getThemeRights(themes, themeId, userId) {
    for (const row of themes) {
        if (row.id === themeId && row.user_id === userId) {
            return row.rights.split(',');
        }
    }

    return [];
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
}

const shouldLog = process.env.LOG_QUERIES === 'true';
async function errorHandling(e, res) {
    console.error(e);
    const response = e.response;
    if (e.response && e.response.data) {
        const error = e.response.data.error;
        res.status(error.code);
        return await res.json(error.errors);
    }
    res.status(500);
    await res.json(e);
}

module.exports = router;
