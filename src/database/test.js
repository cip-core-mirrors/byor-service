const utils = require('./utils')

async function test() {
    try {
        await utils.connect()
        utils.setLogging(true)

        console.log(await utils.selectFrom('blips', [
            'id',
            'hash',
            'name',
            'lastUpdate',
            'value',
        ]))
        console.log(await utils.selectFrom('column_links', [
            'blip',
            'name',
            'value',
        ]))
        console.log(await utils.selectFrom('blip_links', [
            'blip',
            'radar',
            'value',
        ]))
        console.log(await utils.selectFrom('radars', [
            'id',
        ]))
        console.log(await utils.selectFrom('radar_links', [
            'radar',
            'sector',
            'ring',
        ]))
        console.log(await utils.selectFrom('radar_parameters', [
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