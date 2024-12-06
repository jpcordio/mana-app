import axios from "axios";
import { getApiUrl } from "./Authentication.service"; 

const API_URL = getApiUrl();

///////////////////////////////////// Create Article Article ////////////////////////////////////
export async function createArticle(title, body, imageUrl) {

    
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid"); 


    try {
        const response = await axios.post(`${API_URL}/articles`, {
            title: title,
            body: body,
            image: imageUrl
    }, {
        headers: {
          'access-token': accessToken,
          uid: uid,
          client: client
        }
    });

    console.log(response);

    return true;

    } catch (error) {
        if (error.response) {
            console.error("Erro with the request:", error.response.data);
        } else {
            console.error("Unknown error:", error.message);
        }
        throw error;
    }
}

///////////////////////////////////// Update Article Article ////////////////////////////////////
export async function updateArticle(articleId, title, body, imageUrl) {
    
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        const response = await axios.put(`${API_URL}/articles/${articleId}`, {
        title: title,
        body: body,
        image: imageUrl
    }, {
      headers: {
        'access-token': accessToken,
        uid: uid,
        client: client
      }
    });  
    
    return response.data;

    } catch (error) {
        if (error.response) {
            console.error("Erro with the request:", error.response.data);
        } else {
            console.error("Unknown error:", error.message);
        }
        throw error;
    }
}

///////////////////////////////////// Delete Article ////////////////////////////////////
export async function deleteArticle(articleId) {


    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        
        const response = await axios.delete(`${API_URL}/articles/${articleId}`, {
            headers: {
                'access-token': accessToken,
                uid: uid,
                client: client
            }
        });    
       
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

///////////////////////////////////// Load all Article ////////////////////////////////////
export async function fetchArticles() {

    try {
        const response = await axios.get(`${API_URL}/articles`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar artigos:", error);
        throw error;
    }
}

///////////////////////////////////// Load Article per ID ////////////////////////////////////
export async function fetchArticleId(articleId) {

    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        
        const response = await axios.get(`${API_URL}/articles/${articleId}`,
        {
            headers: {
            'access-token': accessToken,
            uid: uid,
            client: client
            }    
        });
    
        return response;
            
    
    } catch (error) {
        console.error("Erro ao buscar artigo:", error);
        throw error;
    }
}

///////////////////////////////////// Load Article from Companies that Users Follow ////////////////////////////////////
export async function fetchArticleFeed() {

    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        
        const response = await axios.get(`${API_URL}/articles/followed`,
        {
            headers: {
            'access-token': accessToken,
            uid: uid,
            client: client
            }    
        });
    
        return response;
            
    
    } catch (error) {
        console.error("Error to load articles:", error);
        throw error;
    }
}