import { rename_file } from "../fs.js";

export function rename(){
    rename_file(`${process.argv[3]}`, `${process.argv[4]}`)
}