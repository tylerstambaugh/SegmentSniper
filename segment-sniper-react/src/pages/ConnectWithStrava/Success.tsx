import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";

function ConnectWithStravaSuccess() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
      <Row className="text-center ">
        <Col className="mx-auto">
          <p>Authorization was successful.</p>
        </Col>
      </Row>
      <Row>
        <Link to={`/${AppRoutes.Dashboard}`} className="rounded-button">
          Take me to the app
        </Link>
      </Row>
    </Container>
  );
}

export default ConnectWithStravaSuccess;
