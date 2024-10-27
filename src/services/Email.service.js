import axios from "axios";

///////////////////////////////////// Handles the re-send email verification ////////////////////////////////////
export async function resendVerificationEmail(emailAddress) {

    try {
        const response = await axios.post('http://localhost:3000/api/auth/confirmation', {
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