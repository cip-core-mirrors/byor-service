const {google} = require('googleapis');

const email = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const sheets = google.sheets({
    version: 'v4',
});

const auth = new google.auth.JWT(email,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/spreadsheets']);

async function connect() {
    return await auth.authorize();
}

/**
 * Displays information of a SpreadSheet
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {Object} spreadsheetId ID of the SpreadSheet
 * @param {Object} range Range of the sub-part to display
 */
async function getSheet(spreadsheetId, range) {
    return (await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range,
    })).data.values || [];
}

/**
 * Appends a row to SpreadSheet
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {Object} spreadsheetId ID of the SpreadSheet
 * @param {Object} range Range of the sub-part to add a new row
 * @param {Object} values Array of the elements to add. The array represents the row
 */
async function appendSheet(spreadsheetId, range, values) {
    return await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            range,
            majorDimension: "ROWS",
            values,
        }
    });
}

async function updateSheet(spreadsheetId, range, values) {
    return await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            range,
            majorDimension: "ROWS",
            values,
        }
    });
}

async function createSheet(title) {
    const resource = {
        properties: {
            title
        }
    };
    return await sheets.spreadsheets.create({
        auth,
        resource,
        fields: 'spreadsheetId'
    });
}

exports.connect = connect;
exports.getSheet = getSheet;
exports.appendSheet = appendSheet;
exports.updateSheet = updateSheet;
exports.createSheet = createSheet;