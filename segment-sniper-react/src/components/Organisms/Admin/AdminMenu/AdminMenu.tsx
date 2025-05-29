import { Col, Container, Row } from "react-bootstrap";

export default function AdminWidget() {
  return (
    <Container>
      <Row>
        <Col>
          <h2>admin menu widget</h2>

          need to put button here to subscribe to strava webhooks.  It should:

          POST https://www.strava.com/api/v3/push_subscriptions \
          -F client_id=5 \
          -F client_secret=7b2946535949ae70f015d696d8ac602830ece412 \
          -F callback_url=https://as-segmentsniper-api-eastus-dev.azurewebsites.net/api/webhook
          -F verify_token=STRAVA
        </Col>
      </Row>
    </Container>
  );
}
