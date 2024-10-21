import axios from "axios";

///////////////////////////////////// Load all Article ////////////////////////////////////
export async function fetchArticles() {

    try {
        const response = await axios.get('http://localhost:3000/api/articles');
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
        
        const response = await axios.get(`http://localhost:3000/api/articles/${articleId}`,
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

///////////////////////////////////// Create Article Article ////////////////////////////////////
export async function createArticle(title, body, imageUrl) {

    
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        const response = await axios.post('http://localhost:3000/api/articles', {
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
        const response = await axios.put(`http://localhost:3000/api/articles/${articleId}`, {
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
        
        const response = await axios.delete(`http://localhost:3000/api/articles/${articleId}`, {
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
