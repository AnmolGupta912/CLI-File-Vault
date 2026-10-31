// const fs = require('node:fs/promises');
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

    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            return console.error('Failed to create directory:', err);
        }
        console.log('Directory created or already existed successfully!');
    })
}


function Initialize_vault(){
    if (!is_dir_exist(STORE_DIR)) {
        make_dir()
    }
}

// store copy of file
function store_files(src_file){ // cant work with any dir
    const source_file = src_file || "/home/anmol-gupta/Documents/Programs/Personal projects/CLI File Vault/package-lock.json" // giving abs path
    
    const filename = path.basename(source_file)
    const full_dest_path = path.join(STORE_DIR, filename)
    
    try{
        fs.copyFileSync(source_file, full_dest_path)
    }catch (error){
        console.error('Error occurred while copying file:', error);
    }
}

// display all files in Vault
function list_all_file(){
    return fs.readdirSync(STORE_DIR);
}

function display_files(){
    const files = list_all_file() // ["", ""]

    console.log(`Files inside ${path.basename(STORE_DIR)}\n`)
    
    files.forEach((file, i) => {
        console.log(i + 1, file)
    })
    console.log("\nTotal files: ", files.length)
}


// get file infomation 
function file_stats(file){
    let stats = fs.statSync(file, (err, stat) => {
        if (err) {
            console.error(err)
            return;
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



file_stats("/home/anmol-gupta/Documents/Programs/Personal projects/CLI File Vault/example.txt")