import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";

function About() {
  const navigate = useNavigate();
  return (
    <Col className="px-2">
      <Row>
        <Col className="text-center pt-1">
          <h4>What is a Segment Sniper?</h4>
        </Col>
      </Row>
      <Row className="pt-2 justify-content-around">
        <Col xs={6}>
          <Card>
            <Card.Title
              className="text-center pt-1 activity-card-heading"
              style={{ background: "azure" }}
            >
              <p>For those determined to be the leader</p>
            </Card.Title>
            <Card.Body>
              <p>
                The Segment Sniper was designed to be used after an activity, to
                provide quick analysis and additional insights into the
                performance on the segments of the route.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}
export default About;
