import axios from 'axios';


const API_URL = 'http://localhost:3000/api';


///////////////////////////////////// Check is logged (locally) ////////////////////////////////////
export async function isFollowing(id) {
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
        const response = await axios.get(`${API_URL}/users/following_company/${id}`, {
            headers: {
                'access-token': accessToken,
                uid: uid,
                client: client
            }
        });
        //console.log(response.data.following)
        return response.data.following; 
    } catch (error) {
        console.error("Erro with the request:", error.response ? error.response.data : error.message);
        return false;
    }
}

///////////////////////////////////// Follow a company ////////////////////////////////////
export async function setFollow(id) {
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    console.log(`Link: ${API_URL}/connections/${id}`)

    try {
        const response = await axios.post(`${API_URL}/connections`, {
            company_id: id
        }, {
            headers: {
            'access-token': accessToken,
            uid: uid,
            client: client
        }
        });
        //console.log(response.data)
        return response.data.message;
    } catch (error) {
        console.error("Erro with the request:", error.response ? error.response.data : error.message);
        return false;
    }
}

///////////////////////////////////// Unfollow a company ////////////////////////////////////
export async function setUnfollow(id) {
    const accessToken = localStorage.getItem("accessToken");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    console.log(`Link: ${API_URL}/users/unfollow/${id}`);

    try {
        const response = await axios.delete(`${API_URL}/users/unfollow/${id}`, {
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