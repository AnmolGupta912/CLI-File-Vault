import fs from "fs"
import path from "path"


import { formatBytes } from "./helper.js";


const currentDir = process.cwd();
const STORE_DIR = `${currentDir}/Vault`


function is_dir_exist(path_to){
    return fs.existsSync(path_to)
}


function make_dir(){
    console.log("Vault doesn't exist.")
    console.log("Creating Vault...")
    const path = `${currentDir}/Vault`

    fs.mkdirSync(path, { recursive: true }, (err) => {
        if (err) {
            return console.error('Failed to create directory:', err);
        }
        console.log('Directory created or already existed successfully!');
    })
}


// initialize a vault folder
export function initialize_vault(){
    if (!is_dir_exist(STORE_DIR)) {
        make_dir()
    }
}


// store copy of file
export function store_files(src_file){ // cant work with any dir
    initialize_vault()
    const source_file = src_file || "/home/anmol-gupta/Documents/Programs/Personal projects/CLI File Vault/" // giving abs path
    
    const filename = path.basename(source_file)
    const full_dest_path = path.join(STORE_DIR, filename)
    
    try{
        fs.copyFileSync(source_file, full_dest_path)
        return [STORE_DIR, true]
    }catch (error){
        console.error('Error occurred while copying file:', error);
        return false
    }
}


// display all files in Vault
function list_all_file(){
    return fs.readdirSync(STORE_DIR);
}

export function display_files(){
    const files = list_all_file() 

    console.log(`Files inside ${path.basename(STORE_DIR)}\n`)
    
    files.forEach((file, i) => {
        console.log(i + 1, file)
    })
    console.log("\nTotal files: ", files.length)
}


// get file infomation 
export function file_stats(file){
    let stats = fs.statSync(file, (err, stat) => {
        if (err) {
            console.log(err)
            return false;
        }

        return stat
    })

    stats = [
        {
            "size": formatBytes(stats.size)
        },
        {
            "last modified": stats.mtime
        },
        {
            "birthtime": stats.birthtime
        },
        {
            "isFile": stats.isFile()
        },
        {
            "isDirectory": stats.isDirectory()
        }
    ]

    stats.forEach((stat, index) => {
        for (const key in stat) {
            if (!Object.hasOwn(stat, key)) continue;
            
            const element = stat[key];

            console.log(`${index + 1}. ${key} : ${element}`)
        }
    });
}



// rename file
export function rename_file(oldName, newName){
    const oldPath = path.join(process.cwd(), oldName)
    const newPath = path.join(process.cwd(), newName)

    try{
        fs.renameSync(oldPath, newPath)
        console.log("file renamed successfully!!!")
    }catch (error){
        console.log("ERR: ", error.message)
    }
}


// delete file
export function delete_file(fileName){
    const fullPath = path.join(process.cwd(), fileName)

    try{
        fs.unlinkSync(fullPath)
        console.log("File delete sucessfully!!!")
    }catch (error){
        console.log("ERR: ", error.message)
    }
    
}
