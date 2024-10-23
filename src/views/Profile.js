import ProfileAction from "../components/ProfileAction";
import { useEffect } from "react";
import { isLogged } from "../services/Authentication.service";

function Profile() {

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(() => {
      if (!isLogged()) {
        window.location.href = "/login";
      }
    });

  return (
    <div className="App">
      <h1>Profile</h1>
      <ProfileAction />
    </div>
  );
}

export default Profile;