import { Container, Row, Col, Button } from "react-bootstrap";

import connectWithStravaImage from "../../assets/stravaImages/btn_strava_connectwith_orange/btn_strava_connectwith_orange@2x.png";

export default function ConnectWithStrava() {
  async function handleConnectWithStrava() {}

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row sm={2} className="text-center ">
        <Col className="mx-auto">
          <p>
            Before you can start sniping segments, we'll need you to authorize
            us to access your Strava data. When you click the below button,
            you'll be redirected to Strava and asked to grant this app
            permission to view our data. After accepting the agreement, you'll
            be redirected here and can begin sniping segments.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => handleConnectWithStrava()}
          >
            <img src={connectWithStravaImage} />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
