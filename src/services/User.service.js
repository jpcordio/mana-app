import axios from "axios";
import { getApiUrl } from "./Authentication.service"; 

const API_URL = getApiUrl();

///////////////////////////////////// Registration of a new user ////////////////////////////////////
export async function createUser(emailAddress, password, confirmPassword, name, typeRegistration) {

    try {
        const response = await axios.post(`${API_URL}/auth`, {
        email: emailAddress,
        password: password,
        password_confirmation: confirmPassword,
        name: name,
        role: typeRegistration
        });

        return { status: true, message: response.data.data.email };

    } catch (error) {
        throw error;
    }
}   

///////////////////////////////////// Delete User ////////////////////////////////////
export async function deleteUser() {

    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        
        const response = await axios.delete(`${API_URL}/auth`, {
        params: {
            'access-token': accessToken,
            uid: uid,
            client: client
        }
        });
               
        const data = response.data.status;

        if(data === "success"){      
            localStorage.removeItem("accessToken");
            localStorage.removeItem("client");
            localStorage.removeItem("uid");
        }

        return response.data.message;       
        

    } catch (error) {
        if (error.response) {
        // Erro (status 4xx ou 5xx)
            console.error("Erro to delete the user:", error.response.data);
        } else if (error.request) {
        // No reply from the server
            console.error("No response:", error.request);
        } else {
        // Something else happened
            console.error("Unknown error:", error.message);
        }
        throw error;
    }
}

///////////////////////////////////// Handles the Update of an User ////////////////////////////////////
export async function updateUser(name, nickname) {

    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        // Enviar a requisição de atualização (PUT)
        const response = await axios.put(`${API_URL}/auth`, {
        name: name,
        nickname: nickname
        },{
        headers: {
            'access-token': accessToken,
            uid: uid,
            client: client
        }
    });

    localStorage.setItem("name", name);
    localStorage.setItem("nickname", nickname);    
    
    return "User updated successfully!";     
      

    } catch (error) {
        if (error.response) {
        // Erro na resposta da API
        console.error("Error on the request:", error.response.data);
        
        } else {
        // Erro desconhecido
        console.error("Uknown ErrorUnknow error! Please contact the support team.", error.message);
        
        }
        return error;
    }
}   