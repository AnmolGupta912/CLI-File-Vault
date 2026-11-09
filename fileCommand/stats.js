import { file_stats } from "../fs.js";

export function stats(){
    const passed = file_stats(`$`)

    if (!passed){
        console.log(`Failed showing stats...`)
    }
}