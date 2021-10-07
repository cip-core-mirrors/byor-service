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

async function getRadars(radarId) {
    let data;
    if (radarId) {
        data = await utils.selectFrom('radars', [ 'id', 'author' ], [ `id = '${radarId}'` ]);
    } else {
        data = await utils.selectFrom('radars', [ 'id', 'author' ]);
    }
    return data.rows;
}

async function insertRadar(id, author) {
    await utils.upsert(
        'radars',
        [ 'id', 'author' ],
        [ [ id, author ] ],
    );
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

async function userCanEditRadar(userId, radarId) {
    const radars = await getUserRadarRights(userId);
    for (const row of radars) {
        if (row[0] === radarId) {
            const rights = row[2].split(',');
            return rights.indexOf('edit') !== -1;
        }
    }

    return false;
}

async function getUserAuthorRadars(userId) {
    const data = await utils.selectFrom('radars', [ 'id', 'author' ], [ `author = '${userId}'` ]);
    return data.rows;
}

async function getUserRadarRights(userId) {
    const data = await utils.selectFrom('radar_rights', [ 'radar', 'user', 'rights' ], [ `user = '${userId}'` ]);
    return data.rows;
}

module.exports = {
    init,
    connect: utils.connect,

    getBlips,
    insertBlips,

    getRadars,
    insertRadar,

    getRadarParameters,
    insertRadarParameters,
    deleteRadarParameters,

    selectBlipsWithColumnLinks,
    insertColumnLinks,

    insertBlipLinks,
    deleteBlipLinks,

    getUserAuthorRadars,

    getUserRadarRights,
    userCanEditRadar,
};