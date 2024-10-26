import axios from "axios";

//////////////////////////////////// Handles the Log In ////////////////////////////////////
export async function login(emailAddress, password) {

  try {
    const response = await axios.post('http://localhost:3000/api/auth/sign_in', {
    email: emailAddress,
    password: password
  });

  const name = response.data.data.name ?? '';
  const nickname = response.data.data.nickname ?? '';
  const userType = response.data.data.role;
  const userId = response.data.data.id;
  const accessToken = response.headers['access-token'];
  const client = response.headers['client'];

  //console.log(userType);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", emailAddress);

  // User table data
  localStorage.setItem("name", name);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("role", userType);
  localStorage.setItem("userId", userId);


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
      localStorage.removeItem("name");
      localStorage.removeItem("nickname");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
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

///////////////////////////////////// Check if User is a Company ////////////////////////////////////
export function isCompany(){

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  const userType = localStorage.getItem("role");

  return accessToken && client && uid && userType === "true";

}

///////////////////////////////////// Update Password ////////////////////////////////////
export async function updatePassword(currentPassword, newPassword, confirmPassword) {

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  try {
    // Enviar a requisição de atualização (PUT)
    const response = await axios.put('http://localhost:3000/api/auth', {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword
    }, {
      headers: {
        'access-token': accessToken,
        uid: uid,
        client: client
      }
    });

    // Acessar os headers da resposta, que podem conter novos tokens
    const headers = response.headers;
    console.log("Headers:", headers); 

    const newAccessToken = response.headers['access-token'];
    localStorage.setItem("accessToken", newAccessToken);
    
    const newClient = response.headers['client'];
    localStorage.setItem("client", newClient);

    //return response.data.status;

  } catch (error) {
    if (error.response) {
      // Erro na resposta da API
      //console.error("Erro na requisição:", error.response.data);
      console.error("Erro na requisição detalhes:", error.response.data.errors.full_messages[0]);
      
      return error.response.data.errors.full_messages[0];

    } else {
      // Erro desconhecido
      
      console.error("Erro desconhecido:", error.message);
    }
    
    throw error;
  }
}

///////////////////////////////////// /Reset Password are part of the same process ////////////////////////////////////

///////////////////////////////////// Forget Password ////////////////////////////////////

//this one will send an email, on this email will have a link that clicking will give an URL such as:
// http://localhost:3001/reset-password?access-token=G3ReIzm6tv_qrQSGV05EIw&client=qDTOBpDQs-u-46J5KWXRZA&client_id=qDTOBpDQs-u-46J5KWXRZA&config=default&expiry=1730319371&reset_password=true&token=G3ReIzm6tv_qrQSGV05EIw&uid=nath.customer%40mana.com
// from this url we need the following to handle the password change:
// access-token=G3ReIzm6tv_qrQSGV05EIw
// client=qDTOBpDQs-u-46J5KWXRZA
// token=G3ReIzm6tv_qrQSGV05EIw
// uid = email adddress
export async function forgetPassword(emailAddress) {
  
  const uid = emailAddress;

  try {
      const response = await axios.post('http://localhost:3000/api/auth/password', {
        email: uid
      });
    
    return response.data.message;  

  } catch (error) { 

    if (error.response) {
      console.error("Error on the request:", error.response.data);
    } else {
      console.error("Unknown Erro:", error.message);
    }

    alert(error.response.data.errors[0]);
    //return response.data.message; 
    throw error;
  }
}

///////////////////////////////////// Password reset ////////////////////////////////////

// on this process, we will need: access-token, client, token, uid (email adddress)
// Those are generated by a link sent via email using the handleForgetPassword
export async function resetPassword(password, confirmPassword, accessToken, uid, client, token) {  
  
  try {
    // Enviar a requisição de atualização (PUT)
    const response = await axios.put('http://localhost:3000/api/auth/password', {
        password: password, 
      	password_confirmation: confirmPassword 
    }, {
      headers: {
        'access-token': accessToken,
        uid: uid,
        client: client,
        token: token
      }
    });  

    // Acessar os headers da resposta, que podem conter novos tokens
    const headers = response.headers;
    console.log("Headers:", headers); 

    const newAccessToken = response.headers['access-token'];
    localStorage.setItem("accessToken", newAccessToken);
    
    const newClient = response.headers['client'];
    localStorage.setItem("client", newClient);

    return response.data.message;

  } catch (error) {
    if (error.response) {
      console.error("Erro on the request:", error.response.data);
    } else {
      console.error("Unknown Erro:", error.message);
    }
    throw error;
  }
}  