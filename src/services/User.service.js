import axios from "axios";

///////////////////////////////////// Registration of a new user ////////////////////////////////////
export async function createUser(emailAddress, password, confirmPassword, name, typeRegistration) {

    try {
        const response = await axios.post('http://localhost:3000/api/auth', {
        email: emailAddress,
        password: password,
        password_confirmation: confirmPassword,
        name: name,
        role: typeRegistration
        });

    } catch (error) {
        if (error.response) {
            console.error("Erro with the request:", error.response.data);
        } else {
            console.error("Unknown error:", error.message);
        }
        throw error;
    }
}

///////////////////////////////////// Delete User ////////////////////////////////////
export async function deleteUser() {

    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        
        const response = await axios.delete('http://localhost:3000/api/auth', {
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
        const response = await axios.put('http://localhost:3000/api/auth', {
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

    alert('Usuário atualizado com sucesso!');

    } catch (error) {
        if (error.response) {
        // Erro na resposta da API
        console.error("Erro na requisição:", error.response.data);
        } else {
        // Erro desconhecido
        console.error("Erro desconhecido:", error.message);
        }
        alert('Erro ao atualizar o usuário.');
    }
}