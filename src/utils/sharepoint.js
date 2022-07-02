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
    const spSiteUrl = spBaseUrl + '/sites/' + siteName;
    const spListUrl = spSiteUrl + '/_api/web/lists/getByTitle(\'' + listName + '\')';
    const spNbItems = '$top=300';
    const spViewsFilter = '?$filter=Title%20eq%20\'' + viewName + '\'&$select=HtmlSchemaXml,ViewQuery';
    const spFilter = typeof(viewFilter) === 'undefined' ? '' : '&$filter=' + viewFilter;
    const viewQueryUrl = spListUrl + "/Views/getbytitle('" + viewName + "')";
    let response = '';
  
    // Field filter to construct EntityPropertyName <=> Title mappings
    const spFieldsFilter = '?$filter=(substringof(\'http://schemas.microsoft.com/sharepoint/v3\',SchemaXml) eq false) or (EntityPropertyName eq \'Modified\') or (EntityPropertyName eq \'Title\') or (EntityPropertyName eq \'ID\')&$select=EntityPropertyName,Title';

    // Get list fields
    url = spListUrl + '/fields' + spFieldsFilter;
    response = await spr.get(url);
    if (response.statusCode !== 200) {
      console.log("ERROR: couldn't retrieve from '", url, "'!");
    }

    // Generating a dictionary using the column name visible in Sharepoint List WebUI as key
    // needed to find out the corresponding 'field_x' attribute.
    let fieldsMapping = {};
    let namesMapping = {};
    response.body.d.results.map((x) => {
        namesMapping[x["Title"]] = x["EntityPropertyName"];
        fieldsMapping[x["EntityPropertyName"]] = x["Title"];
    });

    // Retrieve view query definition
    response = await spr.get(viewQueryUrl);
    if (response.statusCode !== 200) {
        console.log("ERROR: couldn't retrieve from '", viewQueryUrl, "'!");
    }
    let viewDefinition = response.body.d;

    // Extract HTML schema definition
    const HtmlSchemaJson = JSON.parse(xmlToJson.xml2json(viewDefinition.HtmlSchemaXml, {compact: true, spaces: 4}));

    let arrViewFieldIds = [];
    let arrViewFieldNames = [];
    HtmlSchemaJson.View.ViewFields.FieldRef.map((x) => {
        if (x._attributes.Name === "LinkTitle") {
            arrViewFieldNames.push('Title');
        }
        else {
            arrViewFieldNames.push(fieldsMapping[x._attributes.Name]);
        }
        arrViewFieldIds.push(x._attributes.Name);
    })
    
    const viewXml = '<View><Query>' + viewDefinition.ViewQuery + '</Query></View>';
    const itemsUrl = spSiteUrl + "/_api/web/lists/getbytitle('" + listName + "')/getitems?$select=" + arrViewFieldIds.join(','); 
    //var itemsUrl = spSiteUrl + "/_api/web/lists/getbytitle('" + listName + "')/getitems?$select=field_3"; 
    const queryPayload = {  
               'query' : {
                      '__metadata': { 'type': 'SP.CamlQuery' }, 
                      'ViewXml' : viewXml  
               }
    };

    // Get a request digest
    let spRequestDigest = await spr.requestDigest(spSiteUrl);
    
    // Pull items
    response = await spr.post(itemsUrl, {
        body: queryPayload,
        headers: {
          'X-RequestDigest': spRequestDigest,
          'Accept': 'application/json; odata=verbose',
          'content-type': 'application/json; odata=verbose'
        }
    });
    if (response.statusCode !== 200) {
        console.log("ERROR: couldn't retrieve from '", itemsUrl, "'!");
    }

    let viewItems = response.body.d.results;

    //Use the mapping to appropriately rearrange the value array before returning
    radarData = viewItems.map(x => {
        arr =[];
        for (let i = 0; i < arrViewFieldNames.length; i++) {
            // add value to array
            arr.push(x[namesMapping[arrViewFieldNames[i]]])
            //console.log(arr);
        }
    
        return arr;
    })
    
    // Check if we got special backend directives
    let index = 0;
    while (radarData[index]) {
        let arr = radarData[index];
        
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
                let fieldName = namesMapping[arrViewFieldNames[j]];
                // Modified SharePoint entries will always have a value, including our special 
                // metadata entry, so excluding it
                if ( (fieldValue !== 'byorBackendRenameColumn') && (fieldValue !== null) && (fieldName !== 'Modified')) {
                    let index = -1;
                    index = arrViewFieldNames.indexOf(arrViewFieldNames[j]);
                    if (index !== -1) {
                        arrViewFieldNames[index] = fieldValue;
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
    index = arrViewFieldNames.indexOf('Modified');
    if (index !== -1) {
        arrViewFieldNames[index] = 'lastupdate';
    }
    radarData.unshift(arrViewFieldNames);
    return radarData || [];
}

exports.getListItems = getListItems;