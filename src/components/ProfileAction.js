import { useEffect } from "react";
import { isLogged } from "../services/Authentication.service";

function ProfileAction() { 

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(()=>{
        if(!isLogged()){
        window.location.href = "/login";
        }
    });

    return (
        <div className="">
          
        </div>
      );
}

export default ProfileAction;