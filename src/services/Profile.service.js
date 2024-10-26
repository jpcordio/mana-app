import axios from "axios";

const API_URL = 'http://localhost:3000/api';

///////////////////////////////////// Create Company Profile ////////////////////////////////////
export async function createProfile(id, address1, address2, city, county, postcode, country, phone, mobile, website, email) {

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  try {
    // Enviar a requisição de atualização (PUT)
    const response = await axios.post(`${API_URL}/profile/company`, {
      user_id: id,
      address1: address1,
      address2: address2,
      city: city,
      county: county,
      postcode: postcode,
      country: country,
      phone: phone,
      mobile: mobile,
      website: website,
      email: email,
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

    return true;

  } catch (error) {
    if (error.response) {

      console.error("Erro on the request:", error.response.data.errors.full_messages[0]);
      
      return error.response.data.errors.full_messages[0];

    } else {
      // Erro desconhecido
      
      console.error("Unkown Error:", error.message);
    }
    
    throw error;
  }
}

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
    
    } catch (error) {
      if (error.response) {
  
        console.error("Erro on the request:", error.response.data.errors.full_messages[0]);
        
        return error.response.data.errors.full_messages[0];
  
      } else {
        // Erro desconhecido
        
        console.error("Unkown Error:", error.message);
      }
      
      throw error;
    }   
}

///////////////////////////////////// Update Company Profile ////////////////////////////////////
export async function updateProfile(id, address1, address2, city, county, postcode, country, phone, mobile, website, email) {

  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  try {
    // Enviar a requisição de atualização (PUT)
    const response = await axios.put(`${API_URL}/profile/company/${id}`, {
      address1: address1,
      address2: address2,
      city: city,
      county: county,
      postcode: postcode,
      country: country,
      phone: phone,
      mobile: mobile,
      website: website,
      email: email,
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


  } catch (error) {
    if (error.response) {

      console.error("Erro on the request:", error.response.data.errors.full_messages[0]);
      
      return error.response.data.errors.full_messages[0];

    } else {
      // Erro desconhecido
      
      console.error("Unkown Error:", error.message);
    }
    
    throw error;
  }
}

///////////////////////////////////// Create Company Profile ////////////////////////////////////
export async function createCompany() {
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  const userId = localStorage.getItem("userId"); // Obtendo o userId do localStorage

  console.log(`Link: ${API_URL}/profile/company`);

  try {
      const response = await axios.post(`${API_URL}/profile/company`, {
          user_id: userId
      }, {
          headers: {
              'access-token': accessToken,
              uid: uid,
              client: client
          }
      });

      return response.data.message;
  } catch (error) {
      console.error("Erro with the request:", error.response ? error.response.data : error.message);
      return false;
  }
}