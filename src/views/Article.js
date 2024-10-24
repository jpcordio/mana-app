import { useEffect } from "react";
import ArticlesList from "../components/ArticlesList";
import { isCompany } from "../services/Authentication.service";

function Article() {

  ///////////////////////////////////// Check Validation ////////////////////////////////////
  useEffect(()=>{
    if(!isCompany()){
        window.location.href = "/login";
    }
  });

  return (
    <div className="Article">
      
        <h1>My Posts</h1>  
        <a href="/create-post">New Post</a> <br />

        <ArticlesList />

    </div>
  );
}

export default Article;