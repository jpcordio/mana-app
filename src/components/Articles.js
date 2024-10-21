import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle } from "../services/Articles.service";
import { isCompany, isLogged } from "../services/Authentication.service";

function Articles(props) {

  const [moreInfo, setMoreInfo] = useState(true);

  function handleShowLess(e) {
    e.preventDefault();
    setMoreInfo(false);
  }

  function handleShowMore(e) {
    e.preventDefault();
    setMoreInfo(true);
  }

  ///////////////////////////////////// Handles the Delete Article ////////////////////////////////////
  async function handleDeleteArticle(e) { 
         
    try {
        await deleteArticle(props.id);    
        alert("Post excluido com sucesso.");    
        window.location.href = "/posts";
    } catch (error) {
        if (error.response) {
            console.error("Erro na requisição:", error.response.data);
        } else {
            console.error("Erro desconhecido:", error.message);
        }
        alert('Erro to delete post.');
    }
  }

  if(moreInfo){

    return (
      <div>
        
        <h4>
          {props.title} 
          <button onClick={handleShowLess}>Show less</button> 
          
          { isCompany() && (
            <div>
              <Link to={`/edit-post?articleId=${props.id}&userId=${props.userId}`}>
                <button>Edit</button>              
              </Link>    
              <button onClick={handleDeleteArticle}>Delete</button>   
            </div>
          )}          
        </h4>
        
        <ul>
          <li>            
            {props.body}            
          </li>
        </ul>     
      </div>
    );

  }else{

    return (
      <div>        
        <h4>
          {props.title} 
          <button onClick={handleShowMore}>Show More</button> 
          
          { isCompany() && (
            <div>
              <Link to={`/edit-post?articleId=${props.id}&userId=${props.userId}`}>
                <button>Edit</button>              
              </Link>    
              <button onClick={handleDeleteArticle}>Delete</button>   
            </div>
          )}          
        </h4>
      </div>
    );
  }

  
  
}
  
export default Articles;