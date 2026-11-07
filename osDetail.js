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

// Memory Information 
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
        )
    }
}

// Mechine Infomation
function getMechineInfo(){
    console.log("Machine Information\n-------------------\n")

    const username = os.userInfo().username
    const home =   os.homedir()
    const hostname = os.hostname()
    const tmp = os.tmpdir()

    const obj = {
        username,
        home,
        hostname,
        "Temp Directory": tmp
    }
    for (const key in obj){
        console.log(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${obj[key]}`)
    }
}

// getMechineInfo()
// todo: what is uptime 
// function getSystemUptime(){
//     console.log(os.uptime())
// }



// Network infomation 
function getNetworkInfo(){
    console.log("Network Interfaces\n------------------\n")

    const networks = os.networkInterfaces()

    for (const key in networks){
        const networkName = key;
        const networkArray = networks[key]
        
        console.log(`Interfaces: ${networkName}`)
        networkArray.forEach((obj, i) => {
            console.log(`${obj["family"]}: ${obj["address"]}`)
        })
        console.log("\n")
    }
}

getNetworkInfo()