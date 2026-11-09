import {
    store,
    list,
    rename,
    delete_file_cmd,
    stats
} from "./fileCommand/index.js"


const operation = process.argv[2];

const total_operation = ["store", "list", "stats", "display", "rename", "delete"]

if (total_operation.includes(operation)){
    console.log(operation)

    switch (operation){
        case "store":
            store()
            break;
        
        case "list":
            list()
            break
        
        case "stats":
            stats()
            break


        case "rename":
            rename()
            break
        

        case "delete":
            delete_file_cmd()
            break

        default:
            // this will not run 
            break
    }



}else {
    console.log(operation)
    console.log("Unclear operation...")
}