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

async function insertBlips(blips, userInfo, shouldQuery = true) {
    return await utils.upsert(
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
        userInfo,
        shouldQuery,
    );
}

async function deleteBlip(blipId, userInfo) {
    const queries = [];

    queries.push(await utils.upsert(
        'themes',
        [ 'id' ],
        [[ blipId ]],
        userInfo,
        false,
    ));
    queries.push(await deleteBlipRights(
        blipId,
        userInfo,
        false,
    ));
    queries.push(await utils.deleteFrom(
        'column_links',
        [ `blip = '${blipId}'` ],
        userInfo,
        false,
    ));
    queries.push(await utils.deleteFrom(
        'blips',
        [ `id = '${blipId}'` ],
        userInfo,
        false,
    ));

    await utils.transaction(queries, userInfo);
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

async function insertBlipsRights(blipsPermissions, userInfo, shouldQuery = true) {
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

    return await utils.upsert(
        'blip_rights',
        [ 'id', 'blip', 'user_id', 'rights' ],
        rows,
        userInfo,
        shouldQuery,
    );
}

async function deleteBlipRights(blipId, userInfo, shouldQuery = true) {
    return await utils.deleteFrom('blip_rights', [
        `blip = '${blipId}'`,
    ], userInfo, shouldQuery);
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

async function insertTheme(theme, userInfo, isCreate) {
    const queries = [];

    if (isCreate) {
        queries.push(await utils.upsert(
            'themes',
            [ 'id' ],
            [[ theme.id ]],
            userInfo,
            false,
        ));
    }

    theme.parameters = theme.parameters || [];
    const parameters = theme.parameters.map(function(parameter) {
        return [
            `${theme.id}-${parameter.name}`,
            theme.id,
            parameter.name,
            parameter.value || parameter.default,
        ];
    });

    if (parameters.length > 0) {
        queries.push(await utils.deleteFrom(
            'theme_parameters',
            [ `theme = '${theme.id}'` ],
            userInfo,
            false,
        ));
        queries.push(await utils.upsert(
            'theme_parameters',
            [
                'id',
                'theme',
                'name',
                'value',
            ],
            parameters,
            userInfo,
            false,
        ));
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
        queries.push(await utils.deleteFrom(
            'theme_rights',
            [ `theme = '${theme.id}'` ],
            userInfo,
            false,
        ));
        queries.push(await utils.upsert(
            'theme_rights',
            [
                'id',
                'theme',
                'user_id',
                'rights',
            ],
            rights,
            userInfo,
            false,
        ));
    }

    await utils.transaction(queries, userInfo);
}

async function deleteTheme(themeId, userInfo) {
    const queries = [];
    queries.push(await utils.deleteFrom(
        'themes',
        [ `id = '${themeId}'` ],
        userInfo,
        false,
    ));
    queries.push(await utils.deleteFrom(
        'theme_parameters',
        [ `theme = '${themeId}'` ],
        userInfo,
        false,
    ));
    queries.push(await utils.deleteFrom(
        'theme_rights',
        [ `theme = '${themeId}'` ],
        userInfo,
        false,
    ));

    await utils.transaction(queries, userInfo);
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

async function getRadars(conditions = []) {
    const data = await utils.selectFrom('radars', [ 'id', 'published_version', 'state' ], conditions);
    return data.rows;
}

async function insertRadar(id, userInfo) {
    const queries = [];

    const defaultState = 0;
    queries.push(await utils.upsert(
        'radars',
        [ 'id', 'state' ], // published_version omitted in order to keep it empty
        [[ id, defaultState ]],
        userInfo,
        false,
    ));

    const defaultVersion = 0;
    queries.push(await utils.insertInto(
        'radar_versions',
        [
            [
                `${id}-${defaultVersion}`,
                id,
                defaultVersion,
            ],
        ],
        userInfo,
        false,
    ));

    if (userInfo && userInfo.mail) {
        queries.push(await insertRadarRights(
            id,
            userInfo.mail,
            ['owner', 'edit'],
            userInfo,
            false,
        ));
    }

    await utils.transaction(queries, userInfo);
}

async function deleteRadar(radarId, userInfo) {
    const queries = [];

    queries.push(await deleteRadarParameters(
        radarId,
        userInfo,
        false,
    ));
    queries.push(await deleteBlipLinks(
        radarId,
        userInfo,
        false,
    ));
    queries.push(await deleteRadarRights(
        radarId,
        undefined,
        userInfo,
        false,
    ));
    queries.push(await deleteRadarVersions(
        radarId,
        userInfo,
        false,
    ));
    queries.push(await utils.deleteFrom(
        'radars',
        [ `id = '${radarId}'` ],
        userInfo,
        false,
    ));

    await utils.transaction(queries, userInfo);
}

async function updateRadarState(id, state, userInfo, shouldQuery = true) {
    return await utils.update(
        'radars',
        {
            state: state,
        },
        [ `id = '${id}'` ],
        userInfo,
        shouldQuery,
    );
}

async function addRadarVersion(radarId, version, userInfo, shouldQuery = true) {
    return await utils.insertInto(
        'radar_versions',
        [
            [ `${radarId}-${version}`, radarId, version ],
        ],
        userInfo,
        shouldQuery,
    );
}

async function getRadarVersions(radarId) {
    const data = await utils.selectFrom(
        'radar_versions',
        [ 'id', 'radar', 'version' ],
        [ `radar = '${radarId}'` ],
    );

    return data.rows;
}

async function getRadarParameters(radarId, radarVersion) {
    const data = await utils.selectFrom(
        'radar_parameters',
        [ 'name', 'value' ],
        [
            `radar = '${radarId}'`,
            `radar_version = ${radarVersion}`,
        ],
    );

    return data.rows;
}

async function insertRadarParameters(radarParameters, userInfo, shouldQuery = true) {
    return await utils.insertInto(
        'radar_parameters',
        [
            'id',
            'radar',
            'name',
            'value',
        ],
        radarParameters,
        userInfo,
        shouldQuery,
    )
}

async function deleteRadarParameters(radarId, userInfo, shouldQuery = true) {
    return await utils.deleteFrom('radar_parameters', [
        `radar = '${radarId}'`,
    ], userInfo, shouldQuery);
}

async function selectBlipsWithColumnLinks(radarId, radarVersion) {
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
                `blip_links.radar_version = ${radarVersion}`,
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

async function insertColumnLinks(columnLinks, userInfo, shouldQuery = true) {
    return await utils.insertInto(
        'column_links',
        [
            'id',
            'blip',
            'name',
            'value',
        ],
        columnLinks,
        userInfo,
        shouldQuery,
    );
}

async function insertBlipLinks(blipLinks, userInfo, shouldQuery = true) {
    return await utils.insertInto(
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
        userInfo,
        shouldQuery,
    )
}

async function deleteBlipLinks(radarId, userInfo, shouldQuery = true) {
    return await utils.deleteFrom('blip_links', [
        `radar = '${radarId}'`,
    ], userInfo, shouldQuery);
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

async function insertRadarRights(radarId, userId, rights, userInfo, shouldQuery = true) {
    return await utils.upsert(
        'radar_rights',
        [
            'id',
            'radar',
            'user_id',
            'rights',
        ],
        [ [ `${radarId}-${userId}` , radarId, userId, rights.join(',') ] ],
        userInfo,
        shouldQuery,
    );
}

async function deleteRadarRights(radarId, userId, userInfo, shouldQuery = true) {
    const conditions = [ `radar = '${radarId}'` ];
    if (userId) {
        conditions.push(`user_id = '${userId}'`);
    }
    return await utils.deleteFrom('radar_rights', conditions, userInfo, shouldQuery);
}

async function deleteRadarVersions(radarId, userInfo, shouldQuery = true) {
    const conditions = [ `radar = '${radarId}'` ];
    return await utils.deleteFrom('radar_versions', conditions, userInfo, shouldQuery);
}

async function radarExists(radarId) {
    const radars = await getRadars([
        `id = '${radarId}'`,
    ]);
    for (const entry of radars) {
        if (entry.id === radarId) {
            return true;
        }
    }

    return false;
}

async function userRadarOwner(userId, radarId) {
    if (isAdminUser(userId)) return true;

    const radars = await getUserRadarRights(userId);
    for (const entry of radars) {
        if (entry.radar === radarId) {
            const rights = entry.rights.split(',');
            return rights.indexOf('owner') !== -1;
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

    addRadarVersion,
    getRadarVersions,

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
    userRadarOwner,
    userCanEditRadar,

    transaction: utils.transaction,
    logHeaders: utils.logHeaders,
};