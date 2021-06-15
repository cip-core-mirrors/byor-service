const express = require('express');

const utils = require('../database');

const router = express.Router();

utils.init();

router.get('/:radar', async function(req, res, next) {
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
            await res.json(output);
        }
        res.status(404);
        await res.json({});
    } catch (e) {
        const response = e.response;
        if (e.response && e.response.data) {
            const error = e.response.data.error;
            res.status(error.code);
            return await res.json(error.errors);
        }
        res.status(500);
        await res.json(e);
    }
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = router;
