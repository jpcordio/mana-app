import axios from "axios";
import { getCompanyProfile } from "./Profile.service";
import { useEffect } from "react";

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

  console.log(userType);

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", emailAddress);

  // User table data
  localStorage.setItem("name", name);
  localStorage.setItem("nickname", nickname);
  localStorage.setItem("role", userType);
  localStorage.setItem("userId", userId);

  if(userType === true){
    
      async function fetchProfile() {
        try {
          const data = await getCompanyProfile(userId); 

          const address1 = data.address1 ?? '';
          localStorage.setItem("address1", address1);

          const address2 = data.address2 ?? '';
          localStorage.setItem("address2", address2);

          const city = data.city ?? '';
          localStorage.setItem("city", city);

          const county = data.county ?? '';
          localStorage.setItem("county", county);

          const postcode = data.postcode ?? '';
          localStorage.setItem("postcode", postcode);

          const country = data.country ?? '';
          localStorage.setItem("country", country);
          
          const phone = data.phone ?? '';
          localStorage.setItem("phone", phone);
          
          const mobile = data.mobile ?? '';
          localStorage.setItem("mobile", mobile);
          
          const website = data.website ?? '';
          localStorage.setItem("website", website);
          
          const emailProfile = data.email ?? '';
          localStorage.setItem("emailProfile", emailProfile);
          
        } catch (err) {
          console.log('error to retrive profile information')
        } 
      }
      fetchProfile();
    
  }else{
    //window.alert("nao eh uma company - nao fazer query!")    
  }

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

      localStorage.removeItem("address1");
      localStorage.removeItem("address2");
      localStorage.removeItem("city");
      localStorage.removeItem("county");
      localStorage.removeItem("postcode");
      localStorage.removeItem("country");
      localStorage.removeItem("phone");
      localStorage.removeItem("mobile");
      localStorage.removeItem("website");
      localStorage.removeItem("emailProfile");
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