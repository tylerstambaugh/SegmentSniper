import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <Container
      className="d-flex flex-column justify-content-center mb-2 bg-light text-dark border rounded mx-auto "
      style={{ width: "50%" }}
    >
      <Row>
        <Col md={12} className="d-flex p-2 mb-2 justify-content-center">
          <Link to="./activities" className="rounded-button">
            Segment Sniper
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="d-flex p-2 mb-2 justify-content-center">
          <Link to="./athlete" className="rounded-button">
            Athlete Details
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="d-flex p-2 mb-2 justify-content-center">
          <Link to="./token-maintenance" className="rounded-button">
            Admin
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
