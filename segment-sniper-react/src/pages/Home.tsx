import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Container
        className="d-grid justify-content-center bg-light text-dark border rounded mx-auto my-2 "
        style={{ width: "100%" }}
      >
        <Row>
          <Col sm={12} className="text-center my-2">
            <h4>
              Welcome to the <br /> Segment Sniper!
            </h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="mb-3">
            <Card>
              <Card.Body className="text-center home-text">
                Are you a Strava athlete that spends too much time looking for
                segments to KOM? If so, this app is designed and built for you.
                With proprietary analytics and data aggregations, the Strava
                Segment Sniper is the premier tool that will assist you into the
                top spot on the leader boards. Whether it is harnessing the
                power of the wind, or uncovering the segments that you are close
                to #1, we're leveraging new technology in your quest to dominate
                your routes.
                <Row className="text-center">
                  <Col sm={12} className="m-0">
                    <p>Are you ready to get started?</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <Button onClick={() => navigate(`/${AppRoutes.Login}`)}>
                      Start Sniping!
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
