


const operation = process.argv[2];

const total_operation = ["store", "list", "stats", "display", "rename", "delete"]

if (total_operation.includes(operation)){
    console.log(operation)

    switch (operation){
        case "store":
            // call the store funstion 
            break;
        
        case "list":
            //
            break
        
        case "stats":
            break
        
        case "display":
            break
        

        case "rename":
            break
        

        case "delete":
            break

        default:
            // this will not run 
            break
    }



}else {
    console.log(operation)
    console.log("Unclear operation...")
}