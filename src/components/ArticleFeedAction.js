import axios from "axios";
import { useState, useEffect } from "react";
import Articles from "./Articles";
import { isLogged } from "../services/Authentication.service";
import { fetchArticleFeed } from "../services/Articles.service";
import { Link } from "react-router-dom";
import { getApiUrl, getAppUrl } from "../services/Authentication.service"; 

const API_URL = getApiUrl();
const APP_URL = getAppUrl();

function ArticleFeedAction({ user_Id }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  const userId = localStorage.getItem("userId");;

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(()=>{
        if(!isLogged()){
            window.location.href = "/login";
        }
    });

  useEffect(() => {
    async function fetchArticles() {

      // Check if there is a value for user_Id (that value is from ProfileAction otherwise will consider the ID from Local Storage)
      
      try {
        const response = await fetchArticleFeed();
            
        if (response.data.length > 0) {
          setArticles(response.data);         
        } else {
          setError(false);
        }
      } catch (err) {
        setError("Erro when trying to find posts.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [user_Id]);

  if (loading) {    
    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  if(error === false){

    return (
      <div className="container mt-5">
        <div className="home">
          <h1 className="text-center mb-4">Posts Feed</h1>
          <div className="row">
            <div className="col-md-12 text-center">
            You should follow some companies to see Posts.
            </div>
            <div className="text-center mt-3">
              <Link to="/companies-list" className="btn btn-warning">
              Find Companies
              </Link>   
            </div>
          </div>
        </div>
      </div>
    );

  }else {   

    return (
      <div className="container mt-5">
        <div className="home">
          <h1 className="text-center mb-4">Posts Feed</h1>
          <ul className="list-unstyled">
            {articles.map((article, index) => (
              <li key={index} className="mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.body}</p>
                    {/* <small className="text-muted">Author ID: {article.user.id}</small> */}
                    <small className="text-muted">Author: <a href={`${APP_URL}/profile?id=${article.user.id}&name=${article.user.name}`}>{article.user.name}</a></small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

  }

  
}

export default ArticleFeedAction;