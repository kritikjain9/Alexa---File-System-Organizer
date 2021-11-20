let fs = require("fs");
let path = require("path");

function helpFn(){
    console.log(`
    List of all the help commands:
            alexa tree - to view the tree structure
            alexa organize - to oragnize all files into separate folders
            alexa help
        `);
}

module.exports = {
    helpKey : helpFn
}