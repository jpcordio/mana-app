import { useEffect } from "react";
import CreateArticleAction from "../components/CreateArticleAction";
import { isCompany } from "../services/Authentication.service";

function CreateArticle() {

  ///////////////////////////////////// Check Validation ////////////////////////////////////
  useEffect(()=>{
    if(!isCompany()){
        window.location.href = "/login";
    }
  });

  return (
    <div className="createaccount">
      
      <h1>Create New Post</h1>

        <CreateArticleAction />

    </div>
  );
}

export default CreateArticle;
