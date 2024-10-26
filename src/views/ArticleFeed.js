import { useEffect } from "react";
import { isLogged } from "../services/Authentication.service";
import ArticleFeedAction from "../components/ArticleFeedAction";

function ArticleFeed() {

  ///////////////////////////////////// Check Validation ////////////////////////////////////
  useEffect(()=>{
    if(!isLogged()){
        window.location.href = "/login";
    }
  });

  return (
    <div className="ArticleFeed">
      
        <h1>Posts Feed</h1>  

        <ArticleFeedAction />

    </div>
  );
}

export default ArticleFeed;