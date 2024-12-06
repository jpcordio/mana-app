// this window is the "My Post"

import axios from "axios";
import { useState, useEffect } from "react";
import Articles from "./Articles";
import { isLogged, isCompany, getApiUrl } from "../services/Authentication.service";

const API_URL = getApiUrl();

function ArticleList({ user_Id }) {

  // Get all article information
  const [articles, setArticles] = useState([]);
  
  //Get information from Local Storage
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  const userId = localStorage.getItem("userId");

  // Handle return message/visibility/message type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertType, setMessageType] = useState('success') // Set the type return messages (red/green)
  const [returnMessage, setReturnMessage] = useState(''); // Set the return messages
  const [visible, setVisible] = useState(true); // hide the return messages

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(()=>{
        if(!isLogged()){
            window.location.href = "/login";
        }
    });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const getCreateMessage = params.get('response_create');
    const getEditMessage = params.get('response_edit');
    const getDeleteMessage = params.get('response_delete');

    // Handles the create article message
    if (getCreateMessage) { 
      let createMessage; 
      if (getCreateMessage === 'true') {
        createMessage = "The post was created successfully!";
        setMessageType('success');
      } else {
        createMessage = "Failed to create post!";
        setMessageType('danger');
      }      
      setReturnMessage(createMessage);
    }

    // Handles the edit article message
    if (getEditMessage) { 
      let createMessage; 
      if (getEditMessage === 'true') {
        createMessage = "The post was edited successfully!";
        setMessageType('success');
      } else {
        createMessage = "Failed to edit post!";
        setMessageType('danger');
      }      
      setReturnMessage(createMessage);
    }

    // Handles the delete article message
    if (getDeleteMessage) { 
      let createMessage; 
      if (getDeleteMessage === 'true') {
        createMessage = "The post was deleted successfully!";
        setMessageType('success');
      } else {
        createMessage = "Failed to delete post!";
        setMessageType('danger');
      }      
      setReturnMessage(createMessage);
    }

    async function fetchArticles() {

      // Check if there is a value for user_Id (that value is from ProfileAction otherwise will consider the ID from Local Storage)
      const idToFetch = user_Id || userId;

      try {
        const response = await axios.get(`${API_URL}/articles/user/${idToFetch}`,
            {
                headers: {
                'access-token': accessToken,
                uid: uid,
                client: client
                }    
            });
        if (response.data.length > 0) {
          setArticles(response.data);
        } else {
          setError("Nenhum artigo encontrado.");
        }
      } catch (err) {
        setError("Erro ao buscar os artigos.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [accessToken, client, uid, userId, user_Id]);

  if (loading) {    
    return <p>Loading...</p>;
  }

  // Commented as this will block new companies to create posts
  if (error) {
    //return <p>{error}</p>;
    console.log(error)
  }

  return (
    <div className="container mt-5">
      {isCompany() && (
        <div className="home mb-5">
          <h1>My Posts</h1>
          <a href="/create-post" className="btn btn-primary btn-lg btn-sm">
            New Post
          </a>
           
        </div>
                      
      )}
      <ul>
        <li>
          { visible && returnMessage && (
            <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
              {returnMessage}
              <button
                type="button"
                className="close-button"
                aria-label="Close"
                onClick={() => setVisible(false)} // Atualiza o estado para esconder o alerta
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </li>
        {articles.map((article, index) => (
          <li key={index}>
            <Articles id={article.id} title={article.title} body={article.body} userId={article.user.id} />            
          </li>
        ))}
      </ul>
    
    </div>
);
}

export default ArticleList;