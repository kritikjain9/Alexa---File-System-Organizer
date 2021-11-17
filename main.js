let inputArr = process.argv.slice(2);
/* slice(2), as The first element will be node , 
the second element will be the name of the JavaScript file. 
The next elements will be any additional command line arguments.  */

let fs = require("fs");
let path = require("path");

//node main.js tree -> "pass the directory path"
//node main.js organize -> "pass the directory path"

//now we'll take the input on the basis of the command passed in the input array
let command = inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🙏 Input Right Command");
}


function treeFn(dirPath){
    console.log("The tree command implemented for", dirPath);
}




function organizeFn(dirPath){
    // console.log("The organize command implemented for", dirPath);
    // ->INPUT -  we'll be given a folder path
    if(dirPath == undefined){
        console.log("kindly enter the path");
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // -> then, we'll create the organzied _files directory
            let dirToMake

        }else{
            console.log("kindly enter the path");
        return;
        }
    }

    // -> then, identify all the files present in that input directory
    // -> then copy/cut the files to that organized category inside of any of the category folder



}







function helpFn(){
    console.log(`
    List of all the help commands:
            node main.js tree "directory path"
            node main.js organize "directory path"
            node main.js help
        `);
}