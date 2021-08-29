const utils = require('./index')

async function test() {
    try {
        await utils.connect()

        console.log(await utils.selectFrom('blips', [
            'id_version',
            'id',
            'hash',
            'name',
            'version',
            'lastUpdate',
        ]))
        console.log(await utils.selectFrom('column_links', [
            'id',
            'blip',
            'blip_version',
            'name',
            'value',
        ]))
        console.log(await utils.selectFrom('blip_links', [
            'id',
            'radar',
            'sector',
            'ring',
            'blip',
            'blip_version',
            'value',
        ]))
        console.log(await utils.selectFrom('radars', [
            'id',
        ]))
        console.log(await utils.selectFrom('radar_parameters', [
            'id',
            'radar',
            'name',
            'value',
        ]))
    } catch (e) {
        console.error(e)
    } finally {
        await utils.disconnect()
    }
}

test()