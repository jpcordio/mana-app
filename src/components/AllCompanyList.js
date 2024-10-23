import axios from "axios";
import { useState, useEffect } from "react";
import Companies from "./Companies"; // Importação correta
import { isLogged } from "../services/Authentication.service";

function AllCompanyList({ user_Id }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  ///////////////////////////////////// Check Validation ////////////////////////////////////
  useEffect(() => {
    if (!isLogged()) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get(`http://localhost:3000/api/all_companies`, {
          headers: {
            "access-token": accessToken,
            uid: uid,
            client: client,
          },
        });
        if (response.data.length > 0) {
          setCompanies(response.data);
        } else {
          setError("No companies found.");
        }
      } catch (err) {
        setError("Erro when trying to get companies.");
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, [user_Id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="">
      <ul>
        {companies.map((company, index) => (
          <li key={index}>
            <Companies id={company.id} name={company.name} email={company.email} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllCompanyList;