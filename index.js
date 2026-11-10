#!/usr/bin/env node

import {
    store,
    list,
    rename,
    delete_file_cmd,
    stats,
    init,
    help
} from "./fileCommand/index.js"


const operation = process.argv[2];

const total_operation = ["store", "list", "stats", "display", "rename", "delete", "init", "help"]

if (total_operation.includes(operation)){

    switch (operation){
        case "init":
            init()
            break

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

        case "help":
            help()
            break
            
        default:
            // help()
            break
    }
}else {
    help()
}