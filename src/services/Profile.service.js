import axios from "axios";

const API_URL = 'http://localhost:3000/api';

///////////////////////////////////// Show specific company profile ////////////////////////////////////
export async function getCompanyProfile(id){
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        const response = await axios.get(`${API_URL}/profile/company/${id}`, {
          headers: {
            'access-token': accessToken,
            uid: uid,
            client: client
          }
        });

        return  response.data
    
    } catch (err) {
        throw new Error("This company didn't fill out their profile yet.");
    }    
}