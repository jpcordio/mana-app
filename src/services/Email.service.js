import axios from "axios";
import { getApiUrl } from "./Authentication.service"; 

const API_URL = getApiUrl();

///////////////////////////////////// Handles the re-send email verification ////////////////////////////////////
export async function resendVerificationEmail(emailAddress) {

    try {
        const response = await axios.post(`${API_URL}/auth/confirmation`, {
        email: emailAddress
        });
        
        return { status: true, message: response.data.message }; 

    } catch (error) {
        if (error.response) {
        console.error("Erro on the request:", error.response.data);
        return { status: error.response.data.success, message: error.response.data.errors[0] };
        } else {
        console.error("Unkown error:", error.message);
        }
        throw error; 
    }
}