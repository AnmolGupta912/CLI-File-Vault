import figlet from "figlet";
import { help } from "./help.js";
import {initialize_vault} from "../fs.js"


export async function init(){
    const textObj = {
        font: "Mono 9",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 120,
        whitespaceBreak: false,
    }
    
    const text = await figlet.text("Welcome to Vault.", textObj) 
    console.log(text)
    help()
    initialize_vault()
}
