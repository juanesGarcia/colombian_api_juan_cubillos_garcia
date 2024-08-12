import axios from "axios";

const api= 'https://api-colombia.com/api/v1'

export async function getPresident(){
    return await axios.get(
        `${api}/President`
    );
}

export async function getTourist(){
    return await axios.get(
        `${api}//TouristicAttraction`
    );
}

export async function getDepartments(id){
    return await axios.get(
        `${api}/Department/${id}`
    );                                            
}  

export async function getAirport(){
    return await axios.get(
        `${api}/Airport`
    );
}