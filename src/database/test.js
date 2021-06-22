const utils = require('./index')

async function test() {
    try {
        await utils.connect()

        console.log(await utils.selectFrom('blips', [
            'id',
            'hash',
            'name',
            'lastUpdate',
        ]))
        console.log(await utils.selectFrom('column_links', [
            'id',
            'blip',
            'name',
            'value',
        ]))
        console.log(await utils.selectFrom('blip_links', [
            'id',
            'radar',
            'sector',
            'ring',
            'blip',
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