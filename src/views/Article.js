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
       <ArticlesList />
    </div>
  );
}

export default Article;