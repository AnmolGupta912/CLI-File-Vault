import os from "os"
import { execSync } from "child_process"
import { formatBytes } from "./helper.js";


function getPhysicalCores(){
    // TODO: all for all platforms
    if (os.platform() == "linux"){
        try{
            const phyCoresBuffer = execSync("lscpu | awk "+"'/^Core\\(s\\) per socket:/ {cores=$NF}; /^Socket\\(s\\):/ {sockets=$NF}; END{print cores*sockets}'")
            const buf = Buffer.from(phyCoresBuffer).toString()
            return parseInt(buf)
        }catch (error){
            console.log(error)
        }
    }
}

// Operating System Details
function osDetails(){
    console.log("System Information\n------------------\n")
    console.log("OS: ",os.type())
    console.log("Platform: ",os.platform())
    console.log("Architecture: ",os.arch())
    console.log("Release: ", os.release())
}

// CPU Information
function cpuInfo(){
    const userCpus = os.cpus()

    const cpuInfoObj = {
        "model": userCpus[0].model,
        "speed": userCpus[0].speed,
        "logical cores": userCpus.length,
        "physical cores": getPhysicalCores()
    }
    console.log("CPU Information\n---------------\n")

    for (const key in cpuInfoObj) {
        console.log(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${cpuInfoObj[key]}`)
    }
}

function getMemoryInfo(){
    const total = os.totalmem()
    const free = os.freemem()
    const used = os.totalmem() - os.freemem()
    const useage = Math.floor((used/total)*100) // TODO: should show atleast 2 digit after point

    const memoryInfo = {
        "total": total,
        "free": free,
        "used": used,
        "useage": useage
    }

    console.log("Memory Information\n------------------\n")
    for (const key in memoryInfo){
        console.log(
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${ key != "useage" ? formatBytes(memoryInfo[key]) : `${memoryInfo[key]}%` }`
            // console.
        )
    }
}

getMemoryInfo()