const sprequest = require('sp-request');
const xmlToJson = require('xml-js');

const spClientId     = process.env.SHAREPOINT_CLIENT_ID;
const spClientSecret = process.env.SHAREPOINT_CLIENT_SECRET;
const spRealmId      = process.env.SHAREPOINT_REALM_ID;
const spBaseUrl      = process.env.SHAREPOINT_BASE_URL;

spr = new sprequest.create({
    clientId: spClientId,
    clientSecret: spClientSecret,
    realm: spRealmId
});

async function getListItems(siteName, listName, viewName) {
    // Main logic
    // 1. get requested list's fields and map EntityPropertyName with Title and Title with EntityPropertyName
    // 2. get requested view's fields and build an array containing field's "Title"
    // 3. get requested list and push items in array
    console.log('[DEBUG] calling spr');
    var url = '';

    const spListUrl = spBaseUrl + '/sites/' + siteName + '/_api/web/lists/getbytitle(\'' + listName + '\')/';
    const spFieldsFilter = '?$filter=(substringof(\'http://schemas.microsoft.com/sharepoint/v3\',SchemaXml) eq false) or (EntityPropertyName eq \'Modified\') or (EntityPropertyName eq \'Title\') or (EntityPropertyName eq \'ID\')&$select=EntityPropertyName,Title';
    const spViewsFilter = '?$filter=Title%20eq%20\'' + viewName + '\'&$select=HtmlSchemaXml';
    const spNbItems = '$top=300';

    // Get list fields
    url = spListUrl + 'fields' + spFieldsFilter;
    fields = await spr.get(url);

    // Generating a dictionary using the column name visible in Sharepoint List WebUI as key
    // needed to find out the corresponding 'field_x' attribute.
    var fieldsMapping = {};
    var namesMapping = {};
    fields.body.d.results.map((x) => {
        namesMapping[x["Title"]] = x["EntityPropertyName"];
        fieldsMapping[x["EntityPropertyName"]] = x["Title"];
    });

    //console.log(fieldsMapping);

    // Get view fields
    url = spListUrl + 'views' + spViewsFilter;
    views = await spr.get(url);
    var HtmlSchemaJson = JSON.parse(xmlToJson.xml2json(views.body.d.results[0].HtmlSchemaXml, {compact: true, spaces: 4}));
    //console.log(HtmlSchemaJson.View.ViewFields.FieldRef);

    var ViewFieldsMapping = {};
    var arrViewFields = [];
    HtmlSchemaJson.View.ViewFields.FieldRef.map((x) => {
        if (x._attributes.Name === "LinkTitle") {
            arrViewFields.push('Title');
        }
        else {
            arrViewFields.push(fieldsMapping[x._attributes.Name]);
        }
    })
    //console.log(arrViewFields);


    // generate list of columns from the view
    url = spListUrl + 'items?viewid=' + HtmlSchemaJson.View._attributes.Name + "&" + spNbItems;
    items  = await spr.get(url);

    //Use the mapping to appropriately rearrange the value array before returning(Assuming that we have field_1,2,3,4 available)
    radarData = items.body.d.results.map(x => {
        arr =[];
        for (let i = 0; i < arrViewFields.length; i++) {
            arr.push(x[namesMapping[arrViewFields[i]]])
            //console.log(arr);
        }
    
        return arr;
    })
    
    var index = -1
    index = arrViewFields.indexOf('Title');
    if (index !== -1) {
        arrViewFields[index] = 'name';
    }
    index = arrViewFields.indexOf('Modified');
    if (index !== -1) {
        arrViewFields[index] = 'lastupdate';
    }
    radarData.unshift(arrViewFields);
    return radarData || [];
}

exports.getListItems = getListItems;