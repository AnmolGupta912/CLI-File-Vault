import {store_files} from "../fs.js"

export function store(){
    const passed = store_files(`${process.argv[3]}`)

    if (passed[1]){
        console.log("Successfull coping the file into "+ passed[0] + "\n")
    }else {
        console.log("Failed storing file...")
    }
}