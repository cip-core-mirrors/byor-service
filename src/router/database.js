const express = require('express');
const crypto = require('crypto-js');

const utils = require('../database');

const router = express.Router();

const blipsHashCache = {};

utils.init().then(async function() {
    const blips = await utils.selectFrom('blips', [
        'id',
        'hash',
        'name',
        'version',
        'lastUpdate',
    ]);

    for (const blip of blips.rows) {
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

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.options('/', async function(req, res, next) {
    await res.send(200)
})

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
            await utils.upsert(
                'blips',
                [
                    'id_version',
                    'id',
                    'hash',
                    'name',
                    'version',
                    'lastUpdate',
                ],
                blipsToInsert.map(function (blip) {
                    return [
                        `${blip.id}-${blip.version}`,
                        blip.id,
                        blip.hash,
                        blip.name,
                        blip.version,
                        blip.lastUpdate,
                    ]
                }),
            );
            await utils.upsert(
                'column_links',
                [
                    'id',
                    'blip',
                    'blip_version',
                    'name',
                    'value',
                ],
                columnLinks,
            );
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

router.put('/radar/:radar', async function(req, res, next) {
    const radar = req.params.radar;
    const { links = [], parameters = []} = req.body;

    try {
        await utils.upsert(
            'radars',
            [ 'id' ],
            [ [ radar ] ],
        );

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
            await utils.deleteFrom('blip_links', [
                `radar = '${radar}'`,
            ]);
            await utils.insertInto(
                'blip_links',
                [
                    'id',
                    'radar',
                    'sector',
                    'ring',
                    'blip',
                    'blip_version',
                    'value',
                ],
                linksRows,
            )
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
            await utils.deleteFrom('radar_parameters', [
                `radar = '${radar}'`,
            ]);
            await utils.insertInto(
                'radar_parameters',
                [
                    'id',
                    'radar',
                    'name',
                    'value',
                ],
                parametersRows,
            )
        }

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.get('/radar/:radar', async function(req, res, next) {
    const radar = req.params.radar;

    try {
        const data = await utils.selectFrom('radars', [ 'id' ], [ `id = '${radar}'` ]);
        if (data.rows.length > 0) {
            const blips = await utils.selectFromInnerJoin(
                'blips',
                [
                    'blips.name AS name',
                    'blip_links.value AS value',
                    'blips.id AS id',
                    'blips.version AS version',
                    'blips.hash AS hash',
                    'blips.lastUpdate AS lastupdate',
                    'blip_links.sector AS sector',
                    'blip_links.ring AS ring',
                    'column_links.name AS columnname',
                    'column_links.value AS columnvalue',
                ],
                [
                    `blip_links ON blips.id = blip_links.blip`,
                    `column_links ON blips.id = column_links.blip`,
                ],
                [
                    `blip_links.radar = '${radar}'`,
                ],
            );

            res.header('blips-version', Math.max(...blips.rows.map(blip => blip.version)));
            blips.rows.map(blip => delete blip.version);

            const params = await utils.selectFrom(
                'radar_parameters',
                [ 'name', 'value' ],
                [ `radar = '${radar}'` ],
            );
            const dict = {};
            for (const row of blips.rows) {
                let blip = dict[row.id];
                if (!blip) {
                    blip = Object.assign({}, row);
                    dict[row.id] = blip;
                    delete blip.columnname;
                    delete blip.columnvalue;
                }
                blip[row.columnname] = row.columnvalue;
            }

            const columns = blips.rows.map(blip => blip.columnname).filter(onlyUnique);
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
            for (const row of params.rows) {
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

            res.set('access-control-expose-headers', 'blips-version');
            return await res.json(output);
        }
        res.status(404);
        await res.json({});
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
