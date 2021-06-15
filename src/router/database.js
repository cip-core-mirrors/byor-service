const express = require('express');
const crypto = require('crypto-js');

const utils = require('../database');

const router = express.Router();

utils.init();

router.put('/', async function(req, res, next) {
    const { blips = [] } = req.body;

    res.set('Access-Control-Allow-Origin', '*');
    try {
        const columnLinks = [];
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

            const columns = Object.entries(blip);
            blip.hash = crypto.SHA256(
                `${name}${lastUpdate ? `-${lastUpdate}` : ''}-${columns.map(row => row.join('-')).join('-')}`
            ).toString();
            blip.id = id;
            blip.name = name;
            blip.lastUpdate = lastUpdate;

            columns.forEach(function(row) {
                const columnName = row[0];
                row.unshift(id);
                row.unshift(`${id}-${columnName}`)
            });
            columnLinks.push(...columns);
        }

        await utils.upsert(
            'blips',
            [
                'id',
                'hash',
                'name',
                'lastUpdate',
            ],
            blips.map(function(blip) {
                return [
                    blip.id,
                    blip.hash,
                    blip.name,
                    blip.lastUpdate,
                ]
            }),
        );
        await utils.upsert(
            'column_links',
            [
                'id',
                'blip',
                'name',
                'value',
            ],
            columnLinks,
        )

        await res.json({ status: 'ok' })
    } catch (e) {
        await errorHandling(e, res)
    }
});

router.put('/radar/:radar', async function(req, res, next) {
    const radar = req.params.radar;
    const { links = [], parameters = []} = req.body;

    res.set('Access-Control-Allow-Origin', '*');
    try {
        await utils.upsert(
            'radars',
            [ 'id' ],
            [ radar ],
        );

        if (links.length > 0) {
            const linksRows = links.map(function (link) {
                return [
                    `${radar}-${link.blip}`,
                    radar,
                    link.sector,
                    link.ring,
                    link.blip,
                    link.value,
                ]
            });
            await utils.upsert(
                'blip_links',
                [
                    'id',
                    'radar',
                    'sector',
                    'ring',
                    'blip',
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
            await utils.upsert(
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

    res.set('Access-Control-Allow-Origin', '*');
    try {
        const data = await utils.selectFrom('radars', [ 'id' ], `id = ${radar}`);
        if (data.rows.length > 0) {
            const blips = await utils.selectFromInnerJoin(
                'blips',
                [
                    'blips.name AS name',
                    'blip_links.value AS value',
                    'blips.id AS id',
                    'blips.hash AS hash',
                    'blips.lastUpdate AS lastUpdate',
                    'blip_links.sector AS sector',
                    'blip_links.ring AS ring',
                    'column_links.name AS columnName',
                    'column_links.value AS columnValue',
                ],
                [
                    `blip_links ON blips.id = blip_links.blip`,
                    `column_links ON blips.id = column_links.blip`,
                ],
                [
                    `blip_links.radar = '${radar}'`
                ],
            );
            const params = await utils.selectFrom(
                'radar_parameters',
                [ 'name', 'value' ],
                `radar = ${radar}`,
            );
            const dict = {};
            for (const row of blips.rows) {
                let blip = dict[row.id];
                if (!blip) {
                    blip = row;
                    dict[row.id] = blip;
                    delete blip.columnName;
                    delete blip.columnValue;
                }
                blip[row.columnName] = row.columnValue;
            }

            const columns = blips.rows.map(blip => blip.columnName).filter(onlyUnique);
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
            for (const id in dict) {
                const blip = dict[id];
                output.push(Object.values(blip))
            }
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
