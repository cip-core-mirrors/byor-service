const path = require('path')
const fs = require('fs')
const { Client } = require('pg')
const format = require('pg-format')

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

async function insertInto(table, columns = [], rows = [], userInfo) {
    const sql1 = `INSERT INTO ${table} (${columns.join(', ')}) VALUES %L`
    const sql = format(sql1, rows)

    if (table !== 'log_actions' && table !== 'log_headers') {
        if (shouldLog) logQuery(sql)
        if (userInfo) logAction({
            type: 'INSERT',
            table: table,
            query: sql,
        }, userInfo);
    }

    if (client) return await client.query(sql)
}

async function upsert(table, columns = [], rows = [], userInfo) {
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
    if (shouldLog) logQuery(sql)

    if (userInfo) insertToLogTable({ type: 'INSERT/UPDATE',
        table: table,
        query: sql,
    }, userInfo);

    if (client) return await client.query(sql)
}

async function update(table, values = {}, conditions = [], userInfo) {
    const sql = `UPDATE ${table} \n` +
        `SET ${Object.entries(values).map(entry => `${entry[0]} = '${entry[1]}'`).join(',\n')} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)

    if (userInfo) insertToLogTable({ type: 'UPDATE',
        table: table,
        query: sql,
    }, userInfo);

    if (client) return await client.query(sql)
}

async function deleteFrom(table, conditions = [], userInfo) {
    const sql = `DELETE FROM ${table} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)

    if (userInfo) insertToLogTable({ type: 'DELETE',
        table: table,
        query: sql,
    }, userInfo);

    if (client) return await client.query(sql)
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
    const row = [ 'current_timestamp' ];
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

    const vpnContext = headers['ra2-vpn-context'];
    if (vpnContext) {
        row.push(vpnContext['user.identity'] || '');
        row.push(vpnContext['user.uid'] || '');
        row.push(vpnContext['user.roles'] || '');
        row.push(vpnContext['user.vpnip'] || '');
        row.push(vpnContext['user.publicip'] || '');
        row.push(vpnContext['user.country_code'] || '');
        row.push(vpnContext['user.stream'] || '');
        row.push(vpnContext['user.office'] || '');
        row.push(vpnContext['user.authmode'] || '');
    }

    while (row.length < 14) {
        row.push('');
    }
    await insertInto(
        'log_headers',
        [
            'created_time',
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

async function logAction(action, userInfo = {}) {
    const row = [ 'current_timestamp' ];

    row.push(action.type);
    row.push(action.table);
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

    await insertInto(
        'log_actions',
        [
            'created_time',
            'action_type',
            'action_table',
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
    logHeaders,
}
