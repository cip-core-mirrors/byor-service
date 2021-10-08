const express = require('express');
const crypto = require('crypto-js');

const utils = require('../utils/database');
const iam = require('../utils/iam');

const parametersJson = process.env.DATABASE_PARAMETERS ? JSON.parse(process.env.DATABASE_PARAMETERS) : [];
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

router.options('/', async function(req, res, next) {
    await res.send(200)
});

router.put('/', async function(req, res, next) {
    const { blips = [] } = req.body;

    const tempCache = {};
    try {
        let maxVersion = 0;

        const columnLinks = [];
        const blipsToInsert = [];
        for (const blip of blips) {
            const {
                id,
                name,
                lastUpdate,
            } = blip;
            delete blip.hash;
            delete blip.id;
            delete blip.name;
            delete blip.lastUpdate;
            delete blip.version;

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
                    row.unshift(blip.version);
                    row.unshift(blip.id);
                    row.unshift(`${blip.id}-${columnName}`)
                })
                columnLinks.push(...columns);

                tempCache[blip.id] = {
                    hash: blip.hash,
                    version: blip.version,
                }
            }
        }

        if (blipsToInsert.length > 0) {
            await utils.insertBlips(blipsToInsert);
            await utils.insertColumnLinks(columnLinks);
            Object.assign(blipsHashCache, tempCache)
        }

        const response = {
            status: 'ok',
            data: blipsToInsert,
            rows: blipsToInsert.length,
        };

        if (maxVersion > 0) {
            response.version = maxVersion
        }

        await res.json(response)
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar', async function(req, res, next) {
    const userId = req.user.mail;
    const radarRights = await utils.getUserRadarRights(userId);

    await res.json(radarRights.map(function(entry) {
        return {
            id: entry.radar,
            rights: entry.rights.split(','),
        }
    }));
});

router.get('/radar/permissions', async function(req, res, next) {
    await res.json({
        create_radar: iam.isAuthorizedToCreateRadar(req.user),
    })
});

router.post('/radar', async function(req, res, next) {
    const { id: radarId } = req.body;

    if (!radarId) {
        res.statusCode = 404;
        return await res.json({message: 'Radar ID should not be empty'});
    }

    if (!iam.isAuthorizedToCreateRadar(req.user)) {
        res.statusCode = 403;
        return await res.json({message: 'You are not authorized to create a radar'});
    }

    const radars = await utils.getRadars();
    let radarFound = false;
    for (const row of radars) {
        if (row[0] === radarId) {
            radarFound = true;
            break;
        }
    }

    if (radarFound) {
        res.statusCode = 404;
        return await res.json({message: `Radar "${radarId}" already exists`});
    }

    const userId = req.user.mail;
    await utils.insertRadar(radarId, userId);

    await res.json({ status: 'ok' });
});

router.put('/radar/:radar', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;
    const { links = [], parameters = [], permissions = [] } = req.body;

    try {
        const radars = await utils.getRadars();
        let radarFound = false;
        for (const row of radars) {
            if (row[0] === radar) {
                radarFound = row[1] !== userId;
                break;
            }
        }

        if (!radarFound) {
            res.statusCode = 404;
            return await res.json({message: `Radar "${radar}" does not exist`});
        }

        for (const permission of permissions) {
            await utils.insertRadarRights(radar, permission.userId, permission.rights.join(','));
        }

        if (links.length > 0) {
            const linksRows = links.map(function (link) {
                const blipCache = blipsHashCache[link.blip];
                return [
                    `${radar}-${link.blip}`,
                    radar,
                    link.sector,
                    link.ring,
                    link.blip,
                    blipCache ? blipCache.version : 0,
                    link.value,
                ]
            });
            await utils.deleteBlipLinks(radar);
            await utils.insertBlipLinks(linksRows);
        }

        if (parameters.length > 0) {
            const parametersRows = parameters.map(function(parameter) {
                return [
                    `${radar}-${parameter.name}`,
                    radar,
                    parameter.name,
                    parameter.value,
                ]
            });
            await utils.deleteRadarParameters(radar);
            await utils.insertRadarParameters(parametersRows);
        }

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/blips', async function(req, res, next) {
    try {
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

        return await res.json(output);
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

router.get('/radar/:radar/parameters', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;

    try {
        const canEditRadar = await utils.userCanEditRadar(userId, radar);
        if (canEditRadar) {
            const params = await utils.getRadarParameters(radar);
            return await res.json(params);
        }
        res.status(404);
        await res.json({message: `Radar not found`});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar/:radar/blip-links', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;

    try {
        const canEditRadar = await utils.userCanEditRadar(userId, radar);
        if (canEditRadar) {
            const blipLinks = await utils.selectBlipsWithColumnLinks(radar);
            return await res.json(blipLinks);
        }
        res.status(404);
        await res.json({message: `Radar not found`});
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar/:radar', async function(req, res, next) {
    const userId = req.user.mail;
    const radar = req.params.radar;

    try {
        const canEditRadar = await utils.userCanEditRadar(userId, radar);
        if (canEditRadar) {
            const blips = await utils.selectBlipsWithColumnLinks(radar);

            blips.map(blip => delete blip.version);

            const params = await utils.getRadarParameters(radar);
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

            return await res.json(output);
        }
        res.status(403);
        await res.json({message: 'You cannot edit this radar'});
    } catch (e) {
        await errorHandling(e, res)
    }
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
}

const shouldLog = process.env.LOG_QUERIES === 'true';
async function errorHandling(e, res) {
    if (shouldLog) console.error(e);
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
