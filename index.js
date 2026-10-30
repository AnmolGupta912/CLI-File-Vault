// const fs = require('node:fs/promises');
import fs from "fs"
import path from "path"

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

// Initialize_vault()

const source_file = "/home/anmol-gupta/Documents/Programs/Personal projects/Vault/package-lock.json" // giving abs path
// console.log(is_dir_exist(source_file))
// 
// fs.copyFile(source_file, STORE_DIR, (err) => {
        // if (err) {
            // return console.error('Failed to copy file', err);
        // }
        // console.log('File copied successfully!');
    // })




