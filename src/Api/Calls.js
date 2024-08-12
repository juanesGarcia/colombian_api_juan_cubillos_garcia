import axios from "axios";



export async function getPresident(){
    return await axios.get(
        `https://api-colombia.com/api/v1/President`
    );
}

export async function getTourist(){
    return await axios.get(
        `https://api-colombia.com/api/v1/TouristicAttraction`
    );
}

export async function getDepartments(id){
    return await axios.get(
        `https://api-colombia.com/api/v1/Department/${id}`
    );                                            
}  