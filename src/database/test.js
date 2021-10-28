const utils = require('./index')

async function test() {
    try {
        await utils.connect()

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
    } catch (e) {
        console.error(e)
    } finally {
        await utils.disconnect()
    }
}

test()