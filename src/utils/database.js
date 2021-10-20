const utils = require('../database');

const adminUsers = (process.env.ADMIN_USERS || '').split(',');

async function init() {
    const tablesToDrop = (process.env.RESET_TABLES || '').trim().split(',').filter(table => table.length > 0);
    console.log(`[Database] Dropping ${tablesToDrop.length} table${tablesToDrop.length > 1 ? 's' : ''}...`);
    for (const tableName of tablesToDrop) {
        await utils.dropTable(tableName);
    }
    console.log(`[Database] Dropped ${tablesToDrop.length} table${tablesToDrop.length > 1 ? 's' : ''}`);
    await utils.createTables()
}

function isAdminUser(userId) {
    return adminUsers.indexOf(userId) !== -1;
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

async function deleteBlip(blipId) {
    await deleteBlipRights(blipId);
    return await utils.deleteFrom('blips', [
        `id = '${blipId}'`,
    ]);
}

async function getBlipRights(userId) {
    let data;
    if (userId) {
        data = await utils.selectFrom(
            'blip_rights',
            [ 'blip', 'rights' ],
            [ `user_id = '${userId}'` ],
        );
    } else {
        data = await utils.selectFrom(
            'blip_rights',
            [ 'blip', 'user_id', 'rights' ],
        );
    }

    return data.rows;
}

async function insertBlipsRights(blipsPermissions) {
    const rows = [];
    for (const blipPermissions of blipsPermissions) {
        rows.push([
            `${blipPermissions.blip}-${blipPermissions.userId}`,
            blipPermissions.blip,
            blipPermissions.userId,
            blipPermissions.rights.join(','),
        ]);
    }

    if (rows.length === 0) return;

    await utils.upsert(
        'blip_rights',
        [ 'id', 'blip', 'user_id', 'rights' ],
        rows,
    );
}

async function deleteBlipRights(blipId) {
    await utils.deleteFrom('blip_rights', [
        `blip = '${blipId}'`,
    ]);
}

async function getThemes() {
    const data = await utils.selectFromInnerJoin(
        'themes',
        [
            'themes.id AS id',
            'theme_rights.user_id AS user_id',
            'theme_rights.rights AS rights',
        ],
        [
            `theme_rights ON themes.id = theme_rights.theme`,
        ],
    );
    return data.rows;
}

async function insertTheme(theme) {
    await utils.upsert(
        'themes',
        [ 'id' ],
        [[ theme.id ]],
    );

    theme.parameters = theme.parameters || [];
    const parameters = theme.parameters.map(function(parameter) {
        return [
            `${theme.id}-${parameter.name}`,
            theme.id,
            parameter.name,
            parameter.value || parameter.defaultValue,
        ];
    });

    if (parameters.length > 0) {
        await utils.upsert(
            'theme_parameters',
            [
                'id',
                'theme',
                'name',
                'value',
            ],
            parameters,
        );
    }

    theme.permissions = theme.permissions || [];
    const rights = theme.permissions.map(function(permission) {
        return [
            `${theme.id}-${permission.userId}`,
            theme.id,
            permission.userId,
            permission.rights.join(','),
        ];
    });

    if (rights.length > 0) {
        await utils.upsert(
            'theme_rights',
            [
                'id',
                'theme',
                'user_id',
                'rights',
            ],
            rights,
        );
    }
}

async function deleteTheme(themeId) {
    await utils.deleteFrom('themes', [ `id = '${themeId}'` ]);
    await utils.deleteFrom('theme_parameters', [ `theme = '${themeId}'` ]);
    await utils.deleteFrom('theme_rights', [ `theme = '${themeId}'` ]);
}

async function getThemeParameters(themeId) {
    const data = await utils.selectFromInnerJoin(
        'themes',
        [
            'themes.id AS id',
            'theme_parameters.name AS name',
            'theme_parameters.value AS value',
        ],
        [
            `theme_parameters ON themes.id = theme_parameters.theme`,
        ],
        [
            `themes.id = '${themeId}'`,
        ],
    );
    return data.rows;
}

async function getRadars() {
    const data = await utils.selectFrom('radars', [ 'id', 'state' ]);
    return data.rows;
}

async function insertRadar(id, author) {
    await utils.upsert(
        'radars',
        [ 'id', 'state' ],
        [[ id, 0 ]], // default state
    );
    if (author) await insertRadarRights(id, author, ['owner', 'edit']);
}

async function deleteRadar(radarId) {
    await deleteRadarParameters(radarId);
    await deleteRadarRights(radarId);
    return await utils.deleteFrom('radars', [ `id = '${radarId}'` ]);
}

async function updateRadarState(id, state = 0) {
    await utils.update(
        'radars',
        {
            id: id,
            state: state,
        },
        [ `id = '${id}'` ],
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
                'blips.lastupdate AS lastupdate',
                'blip_links.sector AS sector',
                'blip_links.ring AS ring',
                'column_links.name AS columnname',
                'column_links.value AS columnvalue',
            ],
            [
                `blip_links ON blips.id_version = blip_links.blip`,
                `column_links ON blips.id_version = column_links.blip`,
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
                'blips.lastupdate AS lastupdate',
                'column_links.name AS columnname',
                'column_links.value AS columnvalue',
            ],
            [
                `column_links ON blips.id_version = column_links.blip`,
            ],
        );
    }

    return data.rows;
}

async function insertColumnLinks(columnLinks) {
    await utils.insertInto(
        'column_links',
        [
            'id',
            'blip',
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

async function getUserRadarRights(userId) {
    const data = await utils.selectFrom('radar_rights', [ 'radar', 'user_id', 'rights' ], [ `user_id = '${userId}'` ]);
    return data.rows;
}

async function getRadarRights(radarId) {
    let data;
    if (radarId) {
        data = await utils.selectFrom('radar_rights', [ 'radar', 'user_id', 'rights' ], [ `radar = '${radarId}'` ]);
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
    if (isAdminUser(userId)) return true;

    const radars = await getUserRadarRights(userId);
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
    isAdminUser,

    getBlips,
    insertBlips,
    deleteBlip,

    getBlipRights,
    insertBlipsRights,
    deleteBlipRights,

    getThemes,
    insertTheme,
    deleteTheme,
    getThemeParameters,

    getRadars,
    insertRadar,
    deleteRadar,
    updateRadarState,

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