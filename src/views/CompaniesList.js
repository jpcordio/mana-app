import { useEffect } from "react";
import AllCompanyList from "../components/AllCompanyList";
import { isCompany, isLogged } from "../services/Authentication.service";


function CompaniesList() {

    ///////////////////////////////////// Check Validation ////////////////////////////////////
    useEffect(() => {
      if (!isLogged() || isCompany()) {
        window.location.href = "/login";
      }
    });

  return (
    <div className="App">
      <h1>All Companies</h1>
      <AllCompanyList />
      <a href="/company">Back</a> <br />
    </div>
  );
}

export default CompaniesList;