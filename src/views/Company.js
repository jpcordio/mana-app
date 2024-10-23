import { useEffect } from "react";
import AllCompanyList from "../components/AllCompanyList";
import FollowedCompanyList from "../components/FollowedCompanyList"; // Certifique-se que está exportado corretamente
import { isCompany, isLogged } from "../services/Authentication.service";


function Company() {

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(() => {
      if (!isLogged() || isCompany()) {
        window.location.href = "/login";
      }
    });

  return (
    <div className="App">
      <h1>Followed Companies</h1>
      <FollowedCompanyList />
      
      <h1>All Companies</h1>
      <AllCompanyList />
    </div>
  );
}

export default Company;