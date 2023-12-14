import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";

function ConnectWithStravaError() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
      <Row sm={2} className="text-center ">
        <Col className="mx-auto">
          <p>
            There was a problem getting authorization. Please try again or
            contact support.
          </p>
        </Col>
      </Row>
      <Row>
        <Link to={`/${AppRoutes.Dashboard}`} className="rounded-button">
          Home
        </Link>
      </Row>
    </Container>
  );
}

export default ConnectWithStravaError;
