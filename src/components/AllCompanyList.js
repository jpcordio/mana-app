import axios from "axios";
import { useState, useEffect } from "react";
import Companies from "./Companies"; // Importação correta
import { isLogged } from "../services/Authentication.service";
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getApiUrl } from "../services/Authentication.service"; 

const API_URL = getApiUrl();


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
        const response = await axios.get(`${API_URL}/all_companies`, {
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>

          <h1 className="text-center mb-4">All Companies</h1>          
          <Link to="/company" className="btn btn-warning btn-sm me-2 mb-3">Back</Link>
          
          <ListGroup>
            {companies.map((company, index) => (
              <ListGroup.Item key={index} className="mb-3 p-3 border rounded shadow-sm">
                <Companies id={company.id} name={company.name} email={company.email} />
              </ListGroup.Item>
            ))}
          </ListGroup>

        </Col>
      </Row>
    </Container>
  );
}

export default AllCompanyList;