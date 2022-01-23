const utils = require('./index')
const loadEnv = require('../utils/loadEnv');

async function selectAllTables() {
    let data;
    data = await utils.selectFrom('blips', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('blip_rights', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('column_links', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('blip_links', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('radars', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('radar_rights', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('radar_parameters', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('log_actions', [
        '*',
    ]);
    console.log(data.rows);
    data = await utils.selectFrom('log_headers', [
        '*',
    ]);
    console.log(data.rows);
}

async function alterTables() {
    await utils.addColumn('radars', 'published_version integer');
    await utils.addColumn('blip_links', 'radar_version integer');
    await utils.addColumn('radar_parameters', 'radar_version integer');
}

async function test() {
    try {
        await loadEnv.loadEnv();
        await utils.connect();

        //await selectAllTables();
        //await alterTables();
    } catch (e) {
        console.error(e)
    } finally {
        await utils.disconnect()
    }
}

test()