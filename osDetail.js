import os from "os"



function OSDetails(){
    console.log("System Information\n------------------\n")
    console.log("OS: ",os.type())
    console.log("Platform: ",os.platform())
    console.log("Architecture: ",os.arch())
    console.log("Release: ", os.release())
}

