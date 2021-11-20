let fs = require("fs");
let path = require("path");

function treeFn(dirPath){
    // console.log("The tree command implemented for", dirPath);
    // let destPath;
    if(dirPath == undefined){
        // process.cwd();      //GLOBAL-it will pickup the path, where it is being run
        treeHelper(process.cwd(), "")
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
           treeHelper(dirPath, "");
        }else{
            console.log("kindly enter the correct path");
        return;
        }
    }
}

function treeHelper(dirPath, indent){       //empty string `indent` for indentation
    //here, we have to draw a tree like structure
    /* 1. We will check whether it is a file or a folder 
    if file -> simply, print its name
    if folder -> check its contents, and then again repeat the same cycle(recursion)*/
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else{
        //for folder
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName);

        //now taking care of the contents of this folder
        let children = fs.readdirSync(dirPath);
        //using recursion for the children
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(dirPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}


module.exports = {
    treeKey : treeFn
}