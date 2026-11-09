import { delete_file } from "../fs.js";

export function delete_file_cmd(){
    delete_file(`${process.argv[3]}`)
}