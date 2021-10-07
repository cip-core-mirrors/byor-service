const path = require('path')
const fs = require('fs')
const { Client } = require('pg')
const format = require('pg-format')

let client
let shouldLog = process.env.LOG_QUERIES === 'true';

async function init() {
    if (process.env.RESET_DATABASE === 'true') {
        await dropTables()
    }
    await createTables()
}

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

async function dropTables() {
    const filePath = 'reset.sql'
    const sql = fs.readFileSync(path.join(__dirname, filePath), { encoding: 'utf8' })
    console.log('[Database] Dropping tables...')
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql);
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

async function insertInto(table, columns = [], rows = []) {
    const sql1 = `INSERT INTO ${table} (${columns.join(', ')}) VALUES %L`
    const sql = format(sql1, rows)
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql)
}

async function upsert(table, columns = [], rows = []) {
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

    if (client) return await client.query(sql)
}

async function update(table, values = {}, conditions = []) {
    const sql = `UPDATE ${table} \n` +
        `SET ${Object.entries(values).map(entry => `${entry[0]} = ${entry[1]}`).join(',\n')} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)
    if (client) return await client.query(sql)
}

async function deleteFrom(table, conditions = []) {
    const sql = `DELETE FROM ${table} \n` +
        (conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '') +
        ';'
    if (shouldLog) logQuery(sql)
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

module.exports = {
    init,
    connect,
    disconnect,
    createTables,
    dropTables,
    selectFrom,
    selectFromInnerJoin,
    insertInto,
    upsert,
    update,
    deleteFrom,
}
