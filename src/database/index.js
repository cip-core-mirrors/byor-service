const utils = require('./utils')

async function init() {
    await utils.connect()
    if (process.env.RESET_DATABASE === 'true') {
        await utils.dropTables()
    }
    await utils.createTables()
}

module.exports = {
    init,
}