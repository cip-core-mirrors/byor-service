// Some useful pointers:
// - https://www.npmjs.com/package/sp-request
// - https://dattabase.com/blog/sharepoint-rest-api-odata
// - https://github.com/SharePoint/sp-dev-docs/
// - https://dattabase.com/blog/sharepoint-field-schema-xml-examples (not used yet in this code)
// - https://dattabase.com/blog/ (multiple articles on Sharepoint REST)
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

async function getListItems(siteName, listName, viewName, viewFilter) {
    // Main logic
    // 1. get requested list's fields and map EntityPropertyName with Title and Title with EntityPropertyName
    // 2. get requested view's fields and build an array containing field's "Title"
    // 3. get requested list and push items in array
    console.log('[DEBUG] calling spr');
    var url = '';

    const spListUrl = spBaseUrl + '/sites/' + siteName + '/_api/web/lists/getbytitle(\'' + listName + '\')/';
    const spFieldsFilter = '?$filter=(substringof(\'http://schemas.microsoft.com/sharepoint/v3\',SchemaXml) eq false) or (EntityPropertyName eq \'Modified\') or (EntityPropertyName eq \'Title\') or (EntityPropertyName eq \'ID\')&$select=EntityPropertyName,Title';
    const spViewsFilter = '?$filter=Title%20eq%20\'' + viewName + '\'&$select=HtmlSchemaXml,ViewQuery';
    const spNbItems = '$top=300';
    const spFilter = typeof(viewFilter) === 'undefined' ? '' : '&$filter=' + viewFilter;

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
    const HtmlSchemaJson = JSON.parse(xmlToJson.xml2json(views.body.d.results[0].HtmlSchemaXml, {compact: true, spaces: 4}));
    // Todo: handle ViewQuery parameter, using CAML
    // check https://github.com/SharePoint/sp-dev-docs/blob/main/docs/schema/introduction-to-collaborative-application-markup-language-caml.md
    //const viewQuery = JSON.parse(xmlToJson.xml2json(views.body.d.results[0].ViewQuery, {compact: true, spaces: 4}));
    //console.log(HtmlSchemaJson.View.ViewFields.FieldRef);
    //console.log(viewQuery)

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
    url = spListUrl + 'items?viewid=' + HtmlSchemaJson.View._attributes.Name + spFilter + "&" + spNbItems;
    items  = await spr.get(url);

    //Use the mapping to appropriately rearrange the value array before returning
    radarData = items.body.d.results.map(x => {
        arr =[];
        for (let i = 0; i < arrViewFields.length; i++) {
            // add value to array
            arr.push(x[namesMapping[arrViewFields[i]]])
            //console.log(arr);
        }
    
        return arr;
    })
    
    // Check if we got special backend directives
    var index = 0;
    while (radarData[index]) {
        var arr = radarData[index];
        
        // remove entry, as explicitely requested!
        if (arr.includes('byorBackendExcludeEntry') ) {
            radarData.splice(index,1);
            continue;
        }

        // check if column should be renamed
        if (arr.includes('byorBackendRenameColumn') ) {
            //console.log('found!');
            for (let j = 0; j < arr.length; j++) {
                let fieldValue = arr[j];
                let fieldName = namesMapping[arrViewFields[j]];
                // Modified SharePoint entries will always have a value, including our special 
                // metadata entry, so excluding it
                if ( (fieldValue !== 'byorBackendRenameColumn') && (fieldValue !== null) && (fieldName !== 'Modified')) {
                    let index = -1;
                    index = arrViewFields.indexOf(arrViewFields[j]);
                    if (index !== -1) {
                        arrViewFields[index] = fieldValue;
                    }
                }
            }
            // Remove it, no need to send it to frontend
            radarData.splice(index,1);
            continue;
        }
        index++;
    }
    // Renaming some additional fields
    index = -1;
    index = arrViewFields.indexOf('Modified');
    if (index !== -1) {
        arrViewFields[index] = 'lastupdate';
    }
    radarData.unshift(arrViewFields);
    return radarData || [];
}

exports.getListItems = getListItems;