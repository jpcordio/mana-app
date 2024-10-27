import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import logo from "../assets/images/mana-bb.png"; // Adjust the path if necessary

function Home() {
  return (
    <Container className="mt-5">
      <div className="text-center mb-5">
        <img src={logo} alt="MANA Logo" className="img-fluid mb-4" />
        <h1>Welcome to MANA</h1>
        <h5>Connecting companies and customers for lasting relationships!</h5>
        <p>
          MANA is an innovative platform that strengthens the connection between customers and their favorite places. 
          We offer an easy way to follow and connect with businesses, receiving updates and discounts firsthand.
        </p>
      </div>

      <section className="mb-5">
        <h2>Why Should Businesses Use MANA?</h2>
        <p>
          With MANA, businesses can connect directly with their customers, offering promotions and news in real time.
          This interaction not only increases brand visibility but also enhances customer loyalty. 
          By using MANA, businesses have the opportunity to grow and expand their customer base efficiently.
        </p>
      </section>

      <section className="mb-5">
        <h2>Why Should Users Use MANA?</h2>
        <p>
          MANA provides users the ability to follow their favorite places, receive exclusive offers, and stay updated 
          on what’s happening in their community. With a user-friendly interface and interactive features, the user experience is prioritized, 
          ensuring that everyone makes the most of their connection with local businesses.
        </p>
      </section>

      <h2 className="text-center mb-4">Explore More</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Businesses (For Customers Only)</Card.Title>
              <Card.Text>
                Discover and follow the businesses you love.
              </Card.Text>
              <Card.Link href="/companies-list">View Businesses</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Posts (For Customers Only)</Card.Title>
              <Card.Text>
                Stay updated on news and promotions.
              </Card.Text>
              <Card.Link href="/posts-feed">View Posts</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Account (All Users)</Card.Title>
              <Card.Text>
                Manage your settings and preferences.
              </Card.Text>
              <Card.Link href="/account">Settings</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
