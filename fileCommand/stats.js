import { file_stats } from "../fs.js";

export function stats(){
    const passed = file_stats(`${process.argv[3]}`)
    
    if (!passed && passed == false){
        console.log(`Failed showing stats...`)
    }
}