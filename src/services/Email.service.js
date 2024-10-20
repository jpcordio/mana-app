import axios from "axios";

///////////////////////////////////// Handles the re-send email verification ////////////////////////////////////
export async function resendVerificationEmail(emailAddress) {

    try {
        const response = await axios.post('http://localhost:3000/api/auth/confirmation', {
        email: emailAddress
        });
        
        alert('Email enviado com sucesso!');
        return response.data.message;  

    } catch (error) {
        if (error.response) {
        console.error("Erro na requisição:", error.response.data);
        } else {
        console.error("Erro desconhecido:", error.message);
        }
        alert('Erro ao enviar email.');
    }
}