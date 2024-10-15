import axios from "axios";
import Articles from "./Articles";
import { useState } from "react";

function ArticlesList(props) {
    
    // This one will hold the backend data 
    const[articles, setArticles] = useState([]);
    //this is the query from the app to the backend
    const [query, setQuery] = useState("");

    function handleSearchQuery(e){
        e.preventDefault();
        setQuery(e.target.value);
    }
    
    async function searchArticles(e){
        e.preventDefault();
        //console.log(query);
        var response = await axios.get('http://localhost:3000/api/articles');
        setArticles(response.data);

        // in case the project wants to use it as "search"
        // var response = await axios.get('http://localhost:3000/api/articles/search', { params: { id: query} });
        console.log(response);

    }     

    return (
      <div className="home">
        
        {/* in case the project wants to use it as "search" */}
        <input value={query} onChange={handleSearchQuery} />
        <button onClick={searchArticles}>Search</button> 
        
        <ul>
            {
                articles.map(function(i, index) {
                    return (
                        <li key={index}> 
                            <Articles title={i.title} body={i.body}/>
                            
                            <hr />
                        </li>                       
                    )
                })
            }
        </ul>
      </div>
    );
  }
  
  export default ArticlesList;