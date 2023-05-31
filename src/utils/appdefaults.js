//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = './src/utils/themes/';

var themes = {}

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log('Loading file ' + file)
        themes[path.parse(file).name] = JSON.parse(fs.readFileSync(directoryPath + file));
    });
});

async function getTheme(themeId) {
    return themes[themeId] || [];
}

exports.getTheme = getTheme;
