let inputArr = process.argv.slice(2);
/* slice(2), as The first element will be node , 
the second element will be the name of the JavaScript file. 
The next elements will be any additional command line arguments.  */

let fs = require("fs");
let path = require("path");

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
    // console.log("The tree command implemented for", dirPath);
    let destPath;
    if(dirPath == undefined){
        console.log("kindly enter the path");
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
    let obj = fs.lstatSync(dirPath);
    
    if(obj.isFile()){
        let fileName = path.basename(dirPath);
        console.log(indent + "|————————" + fileName);
    }else{
        //for folder
        let dirName = path.basename(dirPath);
        console.log(indent + "‖‖ ‖‖——" + dirName);

        //now taking care of the contents of this folder
        let children = fs.readdirSync(dirName);
        //using recursion for the children
        for(let i = 0; i < children.length; i++){
            let childPath = path.join(dirName, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}




function organizeFn(dirPath){
    // console.log("The organize command implemented for", dirPath);
    // 1 ->INPUT -  we'll be given a folder path
    let destPath;
    if(dirPath == undefined){
        console.log("kindly enter the path");
        return;
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist){
            // 2 -> then, we'll create the organzied _files directory
            destPath = path.join(dirPath, "Organized_Files");

            //agar folder pehle se hi bana hua ho, then return, else make the folder
            // if(fs.existsSync(destPath))return;
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            };
            

        }else{
            console.log("kindly enter the correct path");
        return;
        }
    }

    // 3 -> then, identify all the files present in that input directory
    // 4 -> then copy/cut the files to that organized category inside of any of the category folder

    /* Will do this steps 3 and 4 in another function*/
    organizeFnHelper(dirPath, destPath);

}

function organizeFnHelper(src, dest){
    // 3 -> then, identify(get) all the files present in that input directory
    let childNames = fs.readdirSync(src);
    /* console.log(childNames); -->this will only give us the name of the files,
    but we want the complete path of the files, so as to organize them*/

    for(let i = 0; i < childNames.length; i++){
        let childAdress = path.join(src, childNames[i]);
        
        let obj = fs.lstatSync(childAdress);
        if(obj.isFile()){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            // console.log(`${childNames[i]} belongs to --> ${category}`);

            // 4 -> then copy/cut the files to that organized category inside of any of the category folder
            sendFiles(childAdress, dest, category);
        }
    }

}

function sendFiles(srcFilePath, destFolder, category){
    let categoryPath = path.join(destFolder, category);
    if(fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);

    //first we make the directory, then we copy the items there
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    console.log(`${fileName}, copied to ${category}`);
    fs.unlinkSync(srcFilePath);

}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1); 

    for(let type in types){
        let currentTypeArr = types[type];
        for(let i = 0; i < currentTypeArr.length; i++){
            if(ext == currentTypeArr[i]){
                return type;
            }
        }
    }
    return "others"
}

function helpFn(){
    console.log(`
    List of all the help commands:
            node main.js tree "directory path"
            node main.js organize "directory path"
            node main.js help
        `);
}