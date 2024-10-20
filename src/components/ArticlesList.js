import axios from "axios";
import { useState, useEffect } from "react";
import Articles from "./Articles";
import { isLogged } from "../services/Authentication.service";

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
      try {
        const response = await axios.get(`http://localhost:3000/api/articles/user/${userId}`,
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
    
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home">            
        <ul>
            {
                articles.map((article, index) => (
                    //console.log(article),
                    <li key={index}> 
                        <Articles id={article.id} title={article.title} body={article.body} userId ={article.user.id} />
                        <hr />
                    </li>
                ))
            }
        </ul>
    </div>
);
}

export default ArticleList;