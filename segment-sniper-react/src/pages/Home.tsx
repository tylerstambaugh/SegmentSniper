import { Col, Container, Row } from "react-bootstrap";
import LoginWidget from "../components/LoginWidget";

function Home() {
  return (
    <>
      <Container
        className="justify-content-center mb-2 bg-light text-dark border rounded mx-auto "
        style={{ width: "75%", height: "500px" }}
      >
        <Row>
          <Col>
            <h4>
              Weclome to the Segment Sniper. Please login or create an account
              to get started
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <LoginWidget />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
