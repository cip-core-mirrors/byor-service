const utils = require('../database');

async function init() {
    if (process.env.RESET_DATABASE === 'true') {
        await utils.dropTables()
    }
    await utils.createTables()
}

async function getBlips() {
    const data = await utils.selectFrom('blips', [
        'id',
        'hash',
        'name',
        'version',
        'lastUpdate',
    ]);

    return data.rows;
}

async function insertBlips(blips) {
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
        blips.map(function (blip) {
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
}

async function getRadars() {
    const data = await utils.selectFrom('radars', [ 'id' ]);
    return data.rows;
}

async function insertRadar(id, author) {
    await utils.upsert(
        'radars',
        [ 'id' ],
        [ [ id ] ],
    );
    await insertRadarRights(id, author, ['owner', 'edit']);
}

async function deleteRadar(radarId) {
    await deleteRadarParameters(radarId);
    await deleteRadarRights(radarId);
    await utils.deleteFrom('radars', [ `id = '${radarId}'` ]);
}

async function getRadarParameters(radarId) {
    const data = await utils.selectFrom(
        'radar_parameters',
        [ 'name', 'value' ],
        [ `radar = '${radarId}'` ],
    );

    return data.rows;
}

async function insertRadarParameters(radarParameters) {
    await utils.insertInto(
        'radar_parameters',
        [
            'id',
            'radar',
            'name',
            'value',
        ],
        radarParameters,
    )
}

async function deleteRadarParameters(radarId) {
    await utils.deleteFrom('radar_parameters', [
        `radar = '${radarId}'`,
    ]);
}

async function selectBlipsWithColumnLinks(radarId) {
    let data;
    if (radarId) {
        data = await utils.selectFromInnerJoin(
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
                `blip_links.radar = '${radarId}'`,
            ],
        );
    } else {
        data = await utils.selectFromInnerJoin(
            'blips',
            [
                'blips.name AS name',
                'blips.id AS id',
                'blips.id_version as id_version',
                'blips.version AS version',
                'blips.lastUpdate AS lastupdate',
                'column_links.name AS columnname',
                'column_links.value AS columnvalue',
            ],
            [
                `column_links ON blips.id = column_links.blip`,
            ],
        );
    }

    return data.rows;
}

async function insertColumnLinks(columnLinks) {
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
}

async function insertBlipLinks(blipLinks) {
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
        blipLinks,
    )
}

async function deleteBlipLinks(radarId) {
    await utils.deleteFrom('blip_links', [
        `radar = '${radarId}'`,
    ]);
}

async function getRadarRights(userId) {
    let data;
    if (userId) {
        data = await utils.selectFrom('radar_rights', [ 'radar', 'user_id', 'rights' ], [ `user_id = '${userId}'` ]);
    } else {
        data = await utils.selectFrom('radar_rights', [ 'radar', 'user_id', 'rights' ]);
    }
    return data.rows;
}

async function insertRadarRights(radarId, userId, rights) {
    await utils.upsert(
        'radar_rights',
        [
            'id',
            'radar',
            'user_id',
            'rights',
        ],
        [ [ `${radarId}-${userId}` , radarId, userId, rights.join(',') ] ],
    );
}

async function deleteRadarRights(radarId, userId) {
    let data;
    if (userId) {
        data = await utils.deleteFrom('radar_rights', [ `radar = '${radarId}'`, `user_id = '${userId}'` ]);
    } else {
        data = await utils.deleteFrom('radar_rights', [ `radar = '${radarId}'` ]);
    }
    return data.rows;
}

async function radarExists(radarId) {
    const radars = await getRadars();
    for (const entry of radars) {
        if (entry.id === radarId) {
            return true;
        }
    }

    return false;
}

async function userCanEditRadar(userId, radarId) {
    const radars = await getRadarRights(userId);
    for (const entry of radars) {
        if (entry.radar === radarId) {
            const rights = entry.rights.split(',');
            return rights.indexOf('edit') !== -1;
        }
    }

    return false;
}

module.exports = {
    init,
    connect: utils.connect,

    getBlips,
    insertBlips,

    getRadars,
    insertRadar,
    deleteRadar,

    getRadarParameters,
    insertRadarParameters,
    deleteRadarParameters,

    selectBlipsWithColumnLinks,
    insertColumnLinks,

    insertBlipLinks,
    deleteBlipLinks,

    getRadarRights,
    insertRadarRights,
    deleteRadarRights,

    radarExists,
    userCanEditRadar,
};