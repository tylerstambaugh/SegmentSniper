import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ConnectWithStravaSuccess() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center pt-5">
      <Row className="text-center ">
        <Col className="mx-auto">
          <p>Authorization was successful.</p>
        </Col>
      </Row>
      <Row>
        <Link to="../" className="rounded-button">
          Take me to the app
        </Link>
      </Row>
    </Container>
  );
}

export default ConnectWithStravaSuccess;
