import axios from "axios";
import { useState, useEffect } from "react";
import Companies from "./Companies"; // Importação correta
import { isLogged, getApiUrl } from "../services/Authentication.service";
import { Spinner, Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = getApiUrl();

function FollowedCompanyList({ user_Id }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  // Check Validation
  useEffect(() => {
    if (!isLogged()) {
      window.location.href = "/login";
    }
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await axios.get(`${API_URL}//api/users/followed_companies`, {
          headers: {
            "access-token": accessToken,
            uid: uid,
            client: client,
          },
        });
        if (response.data.length > 0) {
          setCompanies(response.data);
        } else {
          setError(false);
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
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // if (error) {
  //   return (
  //     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
  //       <Alert variant="danger" className="text-center">
  //         {error}
  //       </Alert>
  //     </Container>
  //   );
  // }

  if(error === false){
    
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mb-4">Followed Companies</h1>
            You are not following any company yet.
            <br />
            <Link to="/companies-list" className="btn btn-warning btn-sm me-2 mt-3">Find Companies</Link>
          </Col>
        </Row>
      </Container>
    );

  }else {

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mb-4">Followed Companies</h1>
            <Link to="/companies-list" className="btn btn-warning btn-sm me-2 mb-3">Find More Companies</Link>
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

  
}

export default FollowedCompanyList;
