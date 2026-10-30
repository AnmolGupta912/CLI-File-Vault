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

function store_files(src_file){
    const source_file = src_file || "/home/anmol-gupta/Documents/Programs/Personal projects/CLI File Vault/package-lock.json" // giving abs path
    
    const filename = path.basename(source_file)
    const full_dest_path = path.join(STORE_DIR, filename)
    
    try{
        fs.copyFileSync(source_file, full_dest_path)
    }catch (error){
        console.error('Error occurred while copying file:', error);
    }
}

