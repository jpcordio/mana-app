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
