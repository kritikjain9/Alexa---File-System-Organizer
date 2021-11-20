#!/usr/bin/env node
let inputArr = process.argv.slice(2);
/* slice(2), as The first element will be node , 
the second element will be the name of the JavaScript file. 
The next elements will be any additional command line arguments.  */

let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
const tree = require("./commands/tree");

//node main.js tree -> "pass the directory path"
//node main.js organize -> "pass the directory path"

let types = {
    media: ["txt", "mkv", "jpeg", "png"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz", "msi"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

//now we'll take the input on the basis of the command passed in the input array
let command = inputArr[0];
switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        // treeFn(inputArr[1]);
        break;
    case "organize":
        organizeObj.orgkey(inputArr[1]);
        // organizeFn(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        // helpFn();
        break;
    default:
        console.log("Please 🙏 Input Right Command");
}






