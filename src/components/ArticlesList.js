import axios from "axios";
import { useState, useEffect } from "react";
import Articles from "./Articles";
import { isLogged, isCompany } from "../services/Authentication.service";

function ArticleList({ user_Id }) {
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
      const idToFetch = user_Id || userId;

      try {
        const response = await axios.get(`http://localhost:3000/api/articles/user/${idToFetch}`,
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
  }, [user_Id]);

  if (loading) {
    
    return <p>Loading...</p>;
  }

  // Commented as this will block new companies to create posts
  // if (error) {
  //   return <p>{error}</p>;
  // }

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