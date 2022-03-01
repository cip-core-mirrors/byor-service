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
        false,
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
        false,
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
        false,
        userInfo,
        shouldQuery,
    );
}

async function deleteBlipRights(blipId, userInfo, shouldQuery = true) {
    return await utils.deleteFrom('blip_rights', [
        `blip = '${blipId}'`,
    ], userInfo, shouldQuery);
}

async function duplicateTheme(oldThemeId, newThemeId, userInfo) {
    const theme = {};

    theme.id = newThemeId;
    theme.permissions = [{
        userId: userInfo.mail,
        rights: [ 'owner', 'edit' ],
    }];

    theme.parameters = await getThemeParameters(oldThemeId);

    return await insertTheme(theme, userInfo, true);
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
            false,
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
            true,
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
            true,
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
    const data = await utils.selectFrom('radars', [ 'id', 'state' ], conditions);
    return data.rows;
}

async function insertRadar(id, newRadarVersion, userInfo) {
    const queries = [];

    const defaultState = 0;
    queries.push(await utils.upsert(
        'radars',
        [ 'id', 'state' ],
        [[ id, defaultState ]],
        false,
        userInfo,
        false,
    ));

    if (newRadarVersion) {
        const defaultVersion = 0;
        queries.push(await utils.insertInto(
            'radar_versions',
            [
                'id',
                'radar',
                'version',
                'fork',
                'fork_version',
                'user_id',
            ],
            [
                [
                    `${id}-${defaultVersion}`,
                    id,
                    defaultVersion,
                    null,
                    null,
                    userInfo.mail,
                ],
            ],
            userInfo,
            false,
        ));
    }

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

async function deleteRadar(radarId, radarVersionId, userInfo) {
    const queries = [];

    queries.push(await deleteRadarParameters(
        radarId,
        radarVersionId,
        userInfo,
        false,
    ));
    queries.push(await deleteBlipLinks(
        radarId,
        radarVersionId,
        userInfo,
        false,
    ));
    queries.push(await deleteRadarTags(
        radarId,
        radarVersionId,
        userInfo,
        false,
    ));

    if (radarVersionId) {
        queries.push(await deleteRadarVersion(radarVersionId, userInfo, false));
    } else {
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
    }

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

async function addRadarVersion(radarId, radarVersion, fork, forkVersion, userInfo = {}, shouldQuery = true) {
    let radarVersionId = `${radarId}-${radarVersion}`;
    if (fork !== undefined) radarVersionId += `-${fork}-${forkVersion}`;

    return await utils.insertInto(
        'radar_versions',
        [ 'id', 'radar', 'version', 'fork', 'fork_version', 'user_id' ],
        [
            [
                radarVersionId,
                radarId,
                radarVersion,
                fork,
                forkVersion,
                userInfo.mail,
            ],
        ],
        userInfo,
        shouldQuery,
    );
}

async function getRadarVersions(radarId, version, fork, user) {
    const conditions = [];
    conditions.push(`radar = '${radarId}'`);
    if (version) conditions.push(`version = ${version}`);
    if (fork) conditions.push(`fork = ${fork}`);
    if (user) conditions.push(`user_id = '${user}'`);

    const data = await utils.selectFrom(
        'radar_versions',
        [ 'id', 'radar', 'version', 'fork', 'fork_version', 'user_id' ],
        conditions,
    );

    return data.rows;
}

async function getRadarVersionsFromId(radarId, radarVersionId) {
    const conditions = [];
    conditions.push(`radar = '${radarId}'`);
    if (radarVersionId) conditions.push(`id = '${radarVersionId}'`);

    const data = await utils.selectFrom(
        'radar_versions',
        [ 'id', 'radar', 'version', 'fork', 'fork_version', 'user_id' ],
        conditions,
    );

    return data.rows;
}

async function deleteRadarVersion(radarVersionId, userInfo, shouldQuery = true) {
    return await utils.deleteFrom(
        'radar_versions',
        [`id = '${radarVersionId}'`],
        userInfo,
        shouldQuery,
    );
}

async function getRadarParameters(radarId, radarVersionId, lookForNull = false) {
    const conditions = [];
    conditions.push(`radar = '${radarId}'`);
    conditions.push(`(radar_version = '${radarVersionId}'${lookForNull ? ` OR radar_version IS NULL` : ''})`);

    const data = await utils.selectFrom(
        'radar_parameters',
        [ 'name', 'value' ],
        conditions,
    );

    return data.rows;
}

async function insertRadarParameters(radarParameters, userInfo, shouldQuery = true) {
    return await utils.insertInto(
        'radar_parameters',
        [
            'id',
            'radar',
            'radar_version',
            'name',
            'value',
        ],
        radarParameters,
        userInfo,
        shouldQuery,
    )
}

async function deleteRadarParameters(radarId, radarVersionId, userInfo, shouldQuery = true) {
    const conditions = [];
    if (radarId !== undefined) conditions.push(`radar = '${radarId}'`);
    if (radarVersionId !== undefined) conditions.push(`radar_version = '${radarVersionId}'`);

    return await utils.deleteFrom('radar_parameters', conditions, userInfo, shouldQuery);
}

async function selectBlipsWithColumnLinks(radarId, radarVersion, lookForNull = false) {
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
                'blip_links.oldring AS oldring',
                'column_links.name AS columnname',
                'column_links.value AS columnvalue',
            ],
            [
                `blip_links ON blips.id_version = blip_links.blip`,
                `column_links ON blips.id_version = column_links.blip`,
            ],
            [
                `blip_links.radar = '${radarId}'`,
                `(blip_links.radar_version = '${radarVersion}'${lookForNull ? ` OR blip_links.radar_version IS NULL` : ''})`,
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

async function getBlipLinks(radarVersionId) {
    const conditions = [];
    if (radarVersionId) {
        conditions.push(`radar_version = '${radarVersionId}'`);
    }

    const data = await utils.selectFrom(
        'blip_links',
        [
            'id',
            'radar',
            'radar_version',
            'sector',
            'ring',
            'oldring',
            'blip',
            'value',
        ],
        conditions,
    );
    return data.rows;
}

async function insertBlipLinks(blipLinks, userInfo, shouldQuery = true) {
    return await utils.insertInto(
        'blip_links',
        [
            'id',
            'radar',
            'radar_version',
            'sector',
            'ring',
            'oldring',
            'blip',
            'value',
        ],
        blipLinks,
        userInfo,
        shouldQuery,
    )
}

async function deleteBlipLinks(radarId, radarVersionId, userInfo, shouldQuery = true) {
    const conditions = [];
    if (radarId !== undefined) conditions.push(`radar = '${radarId}'`);
    if (radarVersionId !== undefined) conditions.push(`radar_version = '${radarVersionId}'`);

    return await utils.deleteFrom('blip_links', conditions, userInfo, shouldQuery);
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
        false,
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

async function addRadarTag(radarId, radarVersion, tagName, userInfo, shouldQuery = true) {
    return await utils.upsert(
        'radar_tags',
        [
            'id',
            'name',
            'radar',
            'radar_version',
        ],
        [
            [ `${radarId}-${tagName}`, tagName, radarId, radarVersion ],
        ],
        true,
        userInfo,
        shouldQuery,
    );
}

async function deleteRadarTags(radarId, radarVersionId, userInfo, shouldQuery = true) {
    const conditions = [ `radar = '${radarId}'` ];
    if (radarVersionId) conditions.push(`radar_version = '${radarId}'`);

    return await utils.deleteFrom('radar_tags', conditions, userInfo, shouldQuery);
}

async function deleteRadarTag(radarId, tagName, userInfo, shouldQuery = true) {
    const conditions = [ `radar = '${radarId}'` ];
    conditions.push(`name = '${tagName}'`);

    return await utils.deleteFrom('radar_tags', conditions, userInfo, shouldQuery);
}

async function getRadarTag(radarId, tagName) {
    const conditions = [];
    conditions.push(`radar = '${radarId}'`);
    if (tagName) {
        conditions.push(`name = '${tagName}'`);
    }

    const data = await utils.selectFrom(
        'radar_tags',
        [ 'id', 'name', 'radar', 'radar_version', ],
        conditions,
    );
    return data.rows;
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

    duplicateTheme,
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
    getRadarVersionsFromId,
    deleteRadarVersion,

    getRadarParameters,
    insertRadarParameters,
    deleteRadarParameters,

    selectBlipsWithColumnLinks,
    insertColumnLinks,

    getBlipLinks,
    insertBlipLinks,
    deleteBlipLinks,

    getRadarRights,
    insertRadarRights,
    deleteRadarRights,

    addRadarTag,
    deleteRadarTag,
    getRadarTag,

    radarExists,
    userRadarOwner,
    userCanEditRadar,

    transaction: utils.transaction,
    logHeaders: utils.logHeaders,
};