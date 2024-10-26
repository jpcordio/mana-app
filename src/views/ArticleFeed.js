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
      <ArticleFeedAction />
    </div>
  );
}

export default ArticleFeed;