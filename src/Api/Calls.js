import axios from "axios";



export async function GetPresident(){
    return await axios.get(
        `https://api-colombia.com/api/v1/President`
    );
}