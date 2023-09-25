import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function ConnectWithStravaError() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row sm={2} className="text-center ">
        <Col className="mx-auto">
          <p>There was a problem getting authorization.</p>
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

export default ConnectWithStravaError;
