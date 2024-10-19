import axios from "axios";

//////////////////////////////////// Handles the Log In ////////////////////////////////////
export async function login(emailAddress, password) {

  try {
    const response = await axios.post('http://localhost:3000/api/auth/sign_in', {
    email: emailAddress,
    password: password
  });

  // // Access to the headers
  const headers = response.headers;
  // console.log("Headers: ", headers); 
  const accessToken = response.headers['access-token'];
  // console.log("Access Token:", accessToken);
  const client = response.headers['client'];
  // console.log("Client:", client);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", emailAddress);

} catch (error) {  
    if (error.response) {
      console.error("Erro on the request:", error.response.data);
    } else {
        console.error("Unknown Erro:", error.message);
    }
    throw error;
  }
}


///////////////////////////////////// Handles the Sign Out ////////////////////////////////////
export async function logout() {

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  try {
    const response = await axios.delete('http://localhost:3000/api/auth/sign_out', {
      headers: {
        'access-token': accessToken,
        uid: uid,
        client: client
      }
    });

    const data = response.data;

    if(data.success){      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("client");
      localStorage.removeItem("uid");
    }

    return data.success;

  } catch (error) {

    if (error.response) {
      console.error("Erro na requisição:", error.response.data);
    } else {
      console.error("Erro desconhecido:", error.message);
    }
    throw error;
  }  
}

///////////////////////////////////// Check Validation (on the backend) ////////////////////////////////////
export async function checkValidate() {
  
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  try {
    const response = await axios.get('http://localhost:3000/api/auth/validate_token', {
      params: {
        'access-token': accessToken,
        uid: uid,
        client: client
      }
    });

    console.log(response.data); 
    return true;

  } catch (error) {
    
    console.log(error);
    return false;

  }
}

///////////////////////////////////// Check is logged (locally) ////////////////////////////////////
export function isLogged(){

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  return accessToken && client && uid;

}