const path = require('path')
const fs = require('fs')
const { Client } = require('pg')
const format = require('pg-format')
const urlParse = require('url')

let client
let shouldLog = process.env.LOG_QUERIES === 'true';

function logQuery(sqlBegin, values = [], sqlEnd = '') {
    let subValues = []
    const displayedItems = 4
    if (values.length > displayedItems) {
        subValues.push(values[0], values[1])
        subValues.push(`... ${values.length - displayedItems} item(s) ...`)
        subValues.push(values[values.length - 2], values[values.length - 1])
    } else {
        subValues = values
    }
    const sqlValues = subValues.length > 0 ? `${subValues.join(',\n')} \n` : ''
    const sql = sqlBegin + sqlValues + sqlEnd
    console.log(`[${new Date().toISOString()}] === SQL Query (cache) ===\n${sql}`)
}

async function createTables() {
    const filePath = 'init.sql'
    const sql = fs.readFileSync(path.join(__dirname, filePath), { encoding: 'utf8' })
    console.log('[Database] Creating tables...')
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql);
}

async function dropTable(table) {
    const sql = `DROP TABLE IF EXISTS ${table};`;
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql)
}

async function selectFrom(table, columns, where = []) {
    const sql = `SELECT ${columns.join(', ')} \n` +
        `FROM ${table} \n` +
        (where.length > 0 ? `WHERE ${where.join(' AND \n')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql)
}

async function selectFromInnerJoin(table, columns, innerJoins = [], where = []) {
    const sql = `SELECT ${columns.join(', ')} \n` +
        `FROM ${table} \n` +
        innerJoins.map(join => `INNER JOIN ${join}`).join('\n') + ' \n' +
        (where.length > 0 ? `WHERE ${where.join(' AND \n')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql)
}

async function insertInto(table, columns = [], rows = [], userInfo, shouldQuery = true) {
    const sql1 = `INSERT INTO ${table} (${columns.join(', ')}) VALUES %L;`
    const sql = format(sql1, rows)

    const log = {
        type: 'INSERT',
        table: table,
        id: new Date().getTime(),
        query: sql,
    };
    if (shouldQuery) {
        if (table !== 'log_actions' && table !== 'log_headers') {
            if (shouldLog) logQuery(sql)
            if (userInfo) logAction(log, userInfo);
        }

        if (client) return await client.query(sql)
    } else {
        return log;
    }
}

async function upsert(table, columns = [], rows = [], userInfo, shouldQuery = true) {
    const idColumn = columns[0]
    const sql1 = `INSERT INTO ${table} (${columns.join(', ')}) VALUES %L \n`
    let sql3 = `ON CONFLICT (${idColumn}) \n`
    if (columns.length > 1) {
        sql3 += 'DO UPDATE SET \n' +
            columns.slice(1).map(column => `${column} = ${table}.${column}`).join(', ')
    } else {
        sql3 += 'DO NOTHING'
    }
    sql3 += ';'

    const sql = `${format(sql1, rows)} \n${sql3}`

    const log = {
        type: 'INSERT/UPDATE',
        table: table,
        id: new Date().getTime(),
        query: sql,
    };
    if (shouldQuery) {
        if (shouldLog) logQuery(sql)

        if (userInfo) logAction(log, userInfo);

        if (client) return await client.query(sql)
    } else {
        return log;
    }
}

async function update(table, values = {}, conditions = [], userInfo, shouldQuery = true) {
    const sql = `UPDATE ${table} \n` +
        `SET ${Object.entries(values).map(entry => `${entry[0]} = '${entry[1]}'`).join(',\n')} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'

    const log = {
        type: 'UPDATE',
        table: table,
        id: new Date().getTime(),
        query: sql,
    };
    if (shouldQuery) {
        if (shouldLog) logQuery(sql)

        if (userInfo) logAction(log, userInfo);

        if (client) return await client.query(sql)
    } else {
        return log;
    }
}

async function deleteFrom(table, conditions = [], userInfo, shouldQuery = true) {
    const sql = `DELETE FROM ${table} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'

    const log = {
        type: 'DELETE',
        table: table,
        id: new Date().getTime(),
        query: sql,
    };

    if (shouldQuery) {
        if (shouldLog) logQuery(sql)

        if (userInfo) logAction(log, userInfo);

        if (client) return await client.query(sql)
    } else {
        return log;
    }
}

async function transaction(logs, userInfo) {
    const id = new Date().getTime();
    const sql = 'BEGIN TRANSACTION;\n' +
        logs.map(log => log.query).join('\n') +
        '\nEND TRANSACTION;';

    if (shouldLog) logQuery(sql);
    if (client) {
        try {
            await client.query(sql);
        } catch (e) {
            await client.query('END TRANSACTION;');
            throw e;
        }
    }

    if (userInfo) {
        logActions(logs, userInfo, id);
    }
}

async function connect() {
    const config = {
        user: process.env.POSTGRESQL_USER,
        host: process.env.POSTGRESQL_HOST,
        database: process.env.POSTGRESQL_DATABASE,
        password: process.env.POSTGRESQL_PASSWORD,
        port: parseInt(process.env.POSTGRESQL_PORT),
    }

    if (process.env.CA_CERTS) {
        config.ssl = {
            rejectUnauthorized: false,
            ca: process.env.CA_CERTS,
        }
    } else {
        config.ssl = false
    }

    try {
        client = new Client(config)
        await client.connect()
    } catch (e) {
        client = undefined
        throw e
    }
}

async function disconnect() {
    await client.end()
}

async function logHeaders(headers) {
    const row = [];
    row.push(headers['sec-ch-ua'] || '');
    row.push(headers['user-agent'] || '');
    const referer = headers['referer'];
    if (referer) {
        row.push(referer);
        const query = urlParse.parse(referer, true).query;
        row.push(query.sheetId || '');
    } else {
        row.push('');
        row.push('');
    }

    let vpnContext = headers['ra2-vpn-context'];
    if (vpnContext) {
        vpnContext = JSON.parse(vpnContext);
        row.push(vpnContext['user.identity'] || '');
        row.push(vpnContext['user.uid'] || '');
        row.push(vpnContext['user.roles'] || '');
        row.push(vpnContext['user.vpnip'] || '');
        row.push(vpnContext['user.publicip'] || '');
        row.push(vpnContext['user.country_code'] || '');
        row.push(vpnContext['stream'] || '');
        row.push(vpnContext['office'] || '');
        row.push(vpnContext['authmode'] || '');
    }

    while (row.length < 13) {
        row.push('');
    }
    await insertInto(
        'log_headers',
        [
            'sec_ch_ua',
            'user_agent',
            'referer',
            'radar', // parsed in referer query string
            'user_identity',
            'user_uid',
            'user_roles',
            'user_vpn_ip',
            'user_public_ip',
            'user_country_code',
            'user_stream',
            'user_office',
            'user_authmode',
        ],
        [ row ],
    )
}

async function logActions(actions, userInfo, id) {
    const queries = [];
    queries.push(await logAction({
        type: 'TRANSACTION',
        table: 'log_actions',
        id: id,
        query: 'BEGIN TRANSACTION;',
    }, userInfo, false));

    for (const action of actions) {
        action.id = id;
        queries.push(await logAction(action, userInfo, false));
    }

    queries.push(await logAction({
        type: 'TRANSACTION',
        table: 'log_actions',
        id: id,
        query: 'END TRANSACTION;',
    }, userInfo, false));

    await transaction(queries, undefined);
}

async function logAction(action, userInfo = {}, shouldQuery = true) {
    const row = [];

    row.push(action.type);
    row.push(action.table);
    row.push(action.id.toString());
    row.push(action.query);

    row.push(userInfo.mail || '');
    row.push(userInfo.igg || '');
    row.push(userInfo.first_name || '');
    row.push(userInfo.last_name || '');
    row.push(userInfo.login_ad || '');
    row.push(userInfo.sesame_id || '');
    const authorizations = userInfo.user_authorization ? userInfo.user_authorization.map(function(authorization) {
        return authorization.permissions.map(function(permission) {
            return `${authorization.resource}|${authorization.resource_id}|${permission.name}`;
        }).join(',');
    }) : '';
    row.push(authorizations);
    row.push(userInfo.rc_local_sigle || '');
    row.push(userInfo.auth_level || '');

    return await insertInto(
        'log_actions',
        [
            'action_type',
            'action_table',
            'action_id',
            'action_query',
            'mail',
            'igg',
            'first_name',
            'last_name',
            'login_ad',
            'sesame_id',
            'authorizations',
            'rc_local_sigle',
            'auth_level',
        ],
        [ row ],
        undefined,
        shouldQuery,
    );
}

module.exports = {
    connect,
    disconnect,
    createTables,
    dropTable,
    selectFrom,
    selectFromInnerJoin,
    insertInto,
    upsert,
    update,
    deleteFrom,
    transaction,
    logHeaders,
}
